import "server-only";
import {connectToDB} from "@/mongodb/database";
import User from "@/models/User";
import {NextResponse} from "next/server";
import Token from "@/models/Token";
import bcrypt from "bcrypt";

export async function PUT(request) {
    try {
        if (request.method !== "PUT") {
            return NextResponse.json({message: "Method not allowed", success: false}, {status: 405});
        }

        const {data} = await request.json();
        if (!data) {
            return NextResponse.json({message: "Invalid request", success: false}, {status: 400});
        }
        const {tokenString, newPassword} = data;
        if (!tokenString || !newPassword) {
            return NextResponse.json({message: "Invalid request", success: false}, {status: 400});
        }
        if (typeof newPassword !== "string") {
            return NextResponse.json({message: "Invalid request", success: false}, {status: 400});
        }
        if (newPassword.length < 8) {
            return NextResponse.json({message: "Password is too short", success: false}, {status: 400});
        }
        const newHashedPassword = await bcrypt.hash(newPassword, 10);

        await connectToDB();

        const token = await Token.findOne({token: tokenString});
        if (!token) {
            return NextResponse.json({message: "Token not found or already used", success: false}, {status: 404});
        }
        const userId = token.userId;

        await User.findByIdAndUpdate(userId, {"profile.hashedPassword": newHashedPassword});
        await Token.findByIdAndDelete(token._id);
        return NextResponse.json({message: "Password updated successfully!", success: true}, {status: 200});
    } catch (error) {
        if (error instanceof SyntaxError) {
            return NextResponse.json({message: "Invalid request", success: false}, {status: 400});
        }
        console.error(error);
        return NextResponse.json({message: "Internal server error", success: false}, {status: 500});
    }
}
