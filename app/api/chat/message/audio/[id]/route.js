import "server-only";
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

        if (id.length !== 20) {
            return NextResponse.json({message: "Invalid request", success: false}, {status: 400});
        }

        const audioResponse = await fetch("https://api.elevenlabs.io/v1/history/" + id + "/audio", {
            method: "GET",
            headers: {
                accept: "audio/*",
                "xi-api-key": process.env.ELEVENLABS_KEY,
                "Content-Type": "application/json",
            },
        });

        if (!audioResponse.ok) {
            console.error(audioResponse);
            throw new Error("Error while fetching audio history");
        }

        const audioData = await audioResponse.blob();
        return new NextResponse(audioData, {
            status: 200,
            headers: {
                "Content-Type": "audio/*",
            },
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({message: "Internal server error", success: false}, {status: 500});
    }
}
