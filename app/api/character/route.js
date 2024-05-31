import "server-only";
import {connectToDB} from "@/mongodb/database";
import Character from "@/models/Character";
import {NextResponse} from "next/server";

export async function POST(req) {
    try {
        if (req.method !== "POST") {
            return NextResponse.json({message: "Method not allowed", success: false}, {status: 405});
        }
        if (typeof req.json !== "function") {
            return NextResponse.json({message: "Invalid request", success: false}, {status: 400});
        }

        const reqBody = await req.json();
        if (!reqBody) {
            return NextResponse.json({message: "Invalid request", success: false}, {status: 400});
        }

        const {data} = reqBody;
        if (data === undefined) {
            return NextResponse.json({message: "Invalid request", success: false}, {status: 400});
        }

        const {count, offset} = data;
        if (count === undefined || offset === undefined) {
            return NextResponse.json({message: "Invalid request", success: false}, {status: 400});
        }

        if (isNaN(count)) {
            return NextResponse.json({message: "Count must be a number", success: false}, {status: 400});
        }
        if (isNaN(offset)) {
            return NextResponse.json({message: "Offset must be a number", success: false}, {status: 400});
        }

        await connectToDB();

        const characters = await Character.find().skip(offset).limit(count);

        const characterResults = [];

        for (let i = 0; i < characters.length; i++) {
            characters[i] = characters[i].toObject();
            characterResults.push({
                id: characters[i]._id.toString(),
                name: characters[i].name,
                image: characters[i].image,
                shortDescription: characters[i].shortDescription,
                totalInteractions: characters[i].totalInteractions,
                category: characters[i].category,
                tags: characters[i].tags,
                bio: characters[i].bio,
                greeting: characters[i].greeting,
            });
        }

        return NextResponse.json(
            {
                message: "Successfully fetched all characters",
                success: true,
                data: characterResults,
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
