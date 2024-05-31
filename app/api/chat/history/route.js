import "server-only";
import {NextResponse} from "next/server";
import {getServerSession} from "next-auth";
import {connectToDB} from "@/mongodb/database";
import User from "@/models/User";
import Chat from "@/models/Chat";
import Character from "@/models/Character";
import Message from "@/models/Message";

export async function POST(req) {
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

        await connectToDB();

        const user = await User.findOne({"profile.email": session.user.email});
        if (!user) {
            console.error(`User not found: ${email}`);
            return NextResponse.json({message: "Unauthorized", success: false}, {status: 401});
        }

        let chats = await Chat.find({userId: user._id.toString()});

        let characterIds = chats.map(chat => chat.characterId);

        let characters = await Character.find({_id: {$in: characterIds}});

        const characterResults = [];
        for (let i = 0; i < characters.length; i++) {
            characters[i] = characters[i].toObject();
            characterResults.push({
                id: characters[i]._id.toString(),
                name: characters[i].name,
                image: characters[i].image,
                shortDescription: characters[i].shortDescription,
            });
            const chat = await Chat.findOne({userId: user._id.toString(), characterId: characters[i]._id.toString()});
            if (chat) {
                const latestMessage = await Message.findOne({chatId: chat._id.toString()}).sort({createdAt: -1});
                if (latestMessage) {
                    characterResults[i].latestMessage = latestMessage.textContent;
                }
            }
        }

        return NextResponse.json(
            {
                data: characterResults,
                message: "Success",
                success: true,
            },
            {status: 200}
        );
    } catch (error) {
        if (error instanceof SyntaxError) {
            return NextResponse.json({message: "Invalid request", success: false}, {status: 400});
        }
        console.error(error);
        return NextResponse.json({message: "Internal server error", success: false}, {status: 500});
    }
}
