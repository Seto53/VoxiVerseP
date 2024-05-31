import "server-only";
import {NextResponse} from "next/server";
import {getServerSession} from "next-auth";
import {connectToDB} from "@/mongodb/database";
import User from "@/models/User";
import Chat from "@/models/Chat";
import Character from "@/models/Character";
import Message from "@/models/Message";
import ChatBackup from "@/models/ChatBackup";
import mongoose from "mongoose";

export async function POST(req) {
    try {
        if (req.method !== "POST") {
            return NextResponse.json({message: "Method not allowed", success: false}, {status: 405});
        }

        const reqBody = await req.json();
        if (!reqBody) {
            return NextResponse.json({message: "Invalid request", success: false}, {status: 400});
        }

        const {characterId} = reqBody;
        if (!characterId) {
            return NextResponse.json({message: "Invalid request", success: false}, {status: 400});
        }
        if (characterId.length !== 24) {
            return NextResponse.json({message: "Invalid request", success: false}, {status: 400});
        }

        const session = await getServerSession(req);
        if (!session) {
            return NextResponse.json({message: "Unauthorized", success: false}, {status: 401});
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

        let chat;
        try {
            chat = new Chat({
                userId: user._id.toString(),
                characterId: characterId,
            });
            await chat.save();

            let newMessage = new Message({
                chatId: chat._id.toString(),
                sender: "Character",
                textContent: character.greeting.textContent,
                audioId: character.greeting.audioId,
            });
            await newMessage.save();

            newMessage = newMessage.toObject();

            return NextResponse.json(
                {
                    message: "Successfully created chat",
                    success: true,
                    data: {
                        chatId: chat._id.toString(),
                        createdAt: chat.createdAt,
                        messages: [
                            {
                                sender: newMessage.sender,
                                textContent: newMessage.textContent,
                                audioId: newMessage.audioId,
                                createdAt: newMessage.createdAt,
                            },
                        ],
                    },
                },
                {status: 201}
            );
        } catch (error) {
            if (error.code === 11000) {
                chat = await Chat.findOne({userId: user._id.toString(), characterId: characterId});
                chat = chat.toObject();

                const messages = await Message.find({chatId: chat._id.toString()});
                messages.sort((a, b) => {
                    if (a.createdAt < b.createdAt) {
                        return -1;
                    }
                    if (a.createdAt > b.createdAt) {
                        return 1;
                    }
                    return 0;
                });

                const messagesResult = [];
                for (let i = 0; i < messages.length; i++) {
                    messagesResult.push({
                        sender: messages[i].sender,
                        textContent: messages[i].textContent,
                        audioId: messages[i].audioId,
                        createdAt: messages[i].createdAt,
                    });
                }

                return NextResponse.json(
                    {
                        message: "Successfully fetched chat",
                        success: true,
                        data: {
                            chatId: chat._id.toString(),
                            createdAt: chat.createdAt,
                            messages: messagesResult,
                        },
                    },
                    {status: 200}
                );
            } else {
                throw error;
            }
        }
    } catch (error) {
        if (error instanceof SyntaxError) {
            return NextResponse.json({message: "Invalid request", success: false}, {status: 400});
        }
        console.error(error);
        return NextResponse.json({message: "Internal server error", success: false}, {status: 500});
    }
}

export async function DELETE(req) {
    try {
        if (req.method !== "DELETE") {
            return NextResponse.json({message: "Method not allowed", success: false}, {status: 405});
        }

        const reqBody = await req.json();
        if (!reqBody) {
            return NextResponse.json({message: "Invalid request", success: false}, {status: 400});
        }

        const {chatId} = reqBody;
        if (!chatId) {
            return NextResponse.json({message: "Invalid request", success: false}, {status: 400});
        }
        if (!mongoose.Types.ObjectId.isValid(chatId)) {
            return NextResponse.json({message: "Invalid chatId", success: false}, {status: 400});
        }

        const session = await getServerSession(req);
        if (!session) {
            return NextResponse.json({message: "Unauthorized", success: false}, {status: 401});
        }

        await connectToDB();

        const email = session.user.email;
        const user = await User.findOne({"profile.email": email});
        if (!user) {
            console.error(`User not found: ${email}`);
            return NextResponse.json({message: "Unauthorized", success: false}, {status: 401});
        }

        const chat = await Chat.findById(chatId);
        if (!chat) {
            return NextResponse.json({message: "Chat not found", success: false}, {status: 404});
        }

        await Chat.findByIdAndDelete(chatId);

        const chatBackup = new ChatBackup({
            backupChatId: chatId,
        });
        await chatBackup.save();

        return NextResponse.json(
            {
                message: "Successfully deleted chat",
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
