import "server-only";
import {connectToDB} from "@/mongodb/database";
import Character from "@/models/Character";
import {NextResponse} from "next/server";

export async function GET(req, {params}) {
    try {
        if (req.method !== "GET") {
            return NextResponse.json({message: "Method not allowed", success: false}, {status: 405});
        }

        const {id} = params;
        if (!id) {
            return NextResponse.json({message: "Invalid request", success: false}, {status: 400});
        }
        if (id.length !== 24) {
            return NextResponse.json({message: "Invalid request", success: false}, {status: 400});
        }

        await connectToDB();

        let character = await Character.findById(id).exec();
        if (!character) {
            return NextResponse.json({message: "Character not found", success: false}, {status: 404});
        }
        character = character.toObject();

        return NextResponse.json(
            {
                message: "Character found",
                success: true,
                data: {
                    greeting: character.greeting,
                },
            },
            {status: 200}
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json({message: "Internal server error", success: false}, {status: 500});
    }
}
