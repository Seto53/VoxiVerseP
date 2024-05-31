import "server-only";
import {NextResponse} from "next/server";
import {getServerSession} from "next-auth";
import {connectToDB} from "@/mongodb/database";
import User from "@/models/User";
import Chat from "@/models/Chat";
import Character from "@/models/Character";
import Message from "@/models/Message";
import translate from "@/utils/translate";
import generateText from "@/utils/openai";

export async function POST(req) {
    let chat;
    try {
        if (req.method !== "POST") {
            return NextResponse.json({message: "Method not allowed", success: false}, {status: 405});
        }
        if (typeof req.json !== "function") {
            return NextResponse.json({message: "Invalid request", success: false}, {status: 400});
        }

        const session = await getServerSession(req);
        if (!session) {
            return NextResponse.json({message: "Unauthorized", success: false}, {status: 401});
        }

        const reqBody = await req.json();
        if (!reqBody) {
            return NextResponse.json({message: "Invalid request", success: false}, {status: 400});
        }

        const {data} = reqBody;
        if (!data) {
            return NextResponse.json({message: "Invalid request", success: false}, {status: 400});
        }

        const {characterId, message} = data;
        if (!characterId || !message) {
            return NextResponse.json({message: "Invalid request", success: false}, {status: 400});
        }
        if (characterId.length !== 24) {
            return NextResponse.json({message: "Invalid request", success: false}, {status: 400});
        }
        if (typeof message !== "string") {
            return NextResponse.json({message: "Invalid request", success: false}, {status: 400});
        }
        if (message.length > 1000) {
            return NextResponse.json({message: "Invalid request", success: false}, {status: 400});
        }

        await connectToDB();

        const email = session.user.email;
        const user = await User.findOne({"profile.email": email});
        if (!user) {
            console.error(`User not found: ${email}`);
            return NextResponse.json({message: "Unauthorized", success: false}, {status: 401});
        }

        const character = await Character.findById(characterId);
        if (!character) {
            return NextResponse.json({message: "Character not found", success: false}, {status: 404});
        }

        chat = await Chat.findOne({userId: user._id.toString(), characterId: characterId});

        if (!chat) {
            return NextResponse.json({message: "Forbidden", success: false}, {status: 403});
        }

        chat = await Chat.findOneAndUpdate({_id: chat._id, processing: false}, {processing: true}, {new: true});

        if (!chat) {
            return NextResponse.json({message: "Too many requests", success: false}, {status: 429});
        }

        let result;
        if (user.stripe.status.toString() === "active" || user.stripe.status.toString() === "canceling") {
            result = await User.findOneAndUpdate(
                {
                    "profile.email": email,
                    "credits.subscriptionCredits": {$gt: 0},
                },
                {
                    $inc: {"credits.subscriptionCredits": -1},
                },
                {new: true}
            );
        }

        if (!result) {
            result = await User.findOneAndUpdate(
                {
                    "profile.email": email,
                    "credits.rechargeCredits": {$gt: 0},
                },
                {
                    $inc: {"credits.rechargeCredits": -1},
                },
                {new: true}
            );
        }

        if (!result) {
            return NextResponse.json({message: "Insufficient credits", success: false}, {status: 403});
        }

        const messages = await Message.find({chatId: chat._id.toString()}).sort({createdAt: 1});

        const messagesArray = messages.map(message => {
            return {
                role: message.sender === "Character" ? "assistant" : "user",
                content: message.textContent,
            };
        });

        const textResponse = await generateText(message, character.prompt, messagesArray);

        let translatedText = textResponse;
        if (character.language !== "en") {
            translatedText = await translate(textResponse, character.language);
        }

        const audioResponse = await fetch(
            "https://api.elevenlabs.io/v1/text-to-speech/" + character.elevenlabs.voiceId,
            {
                method: "POST",
                headers: {
                    accept: "audio/mpeg",
                    "xi-api-key": process.env.ELEVENLABS_KEY,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    text: translatedText,
                    model_id: character.elevenlabs.body.model_id,
                    voice_settings: character.elevenlabs.body.voice_settings,
                }),
                cache: "no-store",
            }
        );

        if (!audioResponse.ok) {
            console.error(audioResponse);
            throw new Error("Error while generating audio");
        }
        const audioId = audioResponse.headers.get("history-item-id");

        const userMessage = new Message({
            chatId: chat._id.toString(),
            sender: "User",
            textContent: message,
        });
        await userMessage.save();

        const characterMessage = new Message({
            chatId: chat._id.toString(),
            sender: "Character",
            textContent: textResponse,
            audioId: audioId,
        });
        await characterMessage.save();

        return NextResponse.json(
            {
                message: "Message sent and received successfully",
                success: true,
                data: {
                    textResponse: textResponse,
                    audioId: audioId,
                },
            },
            {status: 200}
        );
    } catch (error) {
        if (error instanceof SyntaxError) {
            return NextResponse.json({message: "Invalid request", success: false}, {status: 400});
        }
        console.error(error);
        return NextResponse.json({message: "Internal server error", success: false}, {status: 500});
    } finally {
        await connectToDB();
        if (chat) {
            chat.processing = false;
            await chat.save();
        }
    }
}
