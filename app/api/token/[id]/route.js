import "server-only";
import {connectToDB} from "@/mongodb/database";
import {NextResponse} from "next/server";
import Token from "@/models/Token";

export async function GET(request, {params}) {
    try {
        if (request.method !== "GET") {
            return NextResponse.json({message: "Method not allowed", success: false}, {status: 405});
        }

        const {id} = params;
        if (!id) {
            return NextResponse.json({message: "Token is required", success: false}, {status: 400});
        }

        await connectToDB();

        const token = await Token.findOne({token: id});
        if (!token) {
            return NextResponse.json({message: "Token not found", success: false}, {status: 404});
        }

        return NextResponse.json({message: "Valid token", success: true}, {status: 200});
    } catch (error) {
        console.error(error);
        return NextResponse.json({message: "Internal server error", success: false}, {status: 500});
    }
}
