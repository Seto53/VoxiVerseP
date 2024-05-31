import "server-only";
import {connectToDB} from "@/mongodb/database";
import Character from "@/models/Character";
import SearchQuery from "@/models/SearchQuery";
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
        if (!data) {
            return NextResponse.json({message: "Invalid request", success: false}, {status: 400});
        }

        let {query, count} = data;
        if (!query || count === undefined) {
            return NextResponse.json({message: "Invalid request", success: false}, {status: 400});
        }
        if (typeof query !== "string") {
            return NextResponse.json({message: "Query must be a string", success: false}, {status: 400});
        }
        if (query > 30) {
            return NextResponse.json({message: "Query must be less than 30 characters", success: false}, {status: 400});
        }
        if (isNaN(count)) {
            return NextResponse.json({message: "Count must be a number", success: false}, {status: 400});
        }

        query = query.replace(/\\/g, "\\\\");
        if (!query) {
            return NextResponse.json({message: "Invalid query", success: false}, {status: 400});
        }

        await connectToDB();

        let characters = await Character.find({
            $or: [
                {name: {$regex: query, $options: "i"}},
                {category: {$regex: query, $options: "i"}},
                {shortDescription: {$regex: query, $options: "i"}},
            ],
        }).limit(count);

        const characterResults = [];

        for (let i = 0; i < characters.length; i++) {
            characters[i] = characters[i].toObject();
            characterResults.push({
                id: characters[i]._id.toString(),
                name: characters[i].name,
                image: characters[i].image,
                shortDescription: characters[i].shortDescription,
                totalInteractions: characters[i].totalInteractions,
            });
        }

        await SearchQuery.updateOne({query: query}, {$inc: {count: 1}}, {upsert: true});

        return NextResponse.json(
            {
                message: "Success",
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
