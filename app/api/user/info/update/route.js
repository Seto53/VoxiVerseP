import "server-only";
import {connectToDB} from "@/mongodb/database";
import {NextResponse} from "next/server";
import {getServerSession} from "next-auth";
import User from "@/models/User";
import {NAME_REGEX, USERNAME_REGEX} from "@/constants";

export async function PUT(request) {
    try {
        if (request.method !== "PUT") {
            return NextResponse.json({message: "Method not allowed", success: false}, {status: 405});
        }

        const {data} = await request.json();
        if (!data) {
            return NextResponse.json({message: "Invalid request", success: false}, {status: 400});
        }

        const {username, name} = data;
        if (!username || !name) {
            return NextResponse.json({message: "Invalid request", success: false}, {status: 400});
        }

        if (!USERNAME_REGEX.test(username)) {
            return NextResponse.json({message: "Invalid username", success: false}, {status: 400});
        }

        if (!NAME_REGEX.test(name)) {
            return NextResponse.json({message: "Invalid name", success: false}, {status: 400});
        }

        const session = await getServerSession(request);
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

        const existingUser = await User.findOne({"profile.username": username});
        if (existingUser && existingUser._id.toString() !== user._id.toString()) {
            return NextResponse.json({message: "Username already exists", success: false}, {status: 409});
        }

        user.profile.username = username;
        user.profile.name = name;
        await user.save();

        return NextResponse.json({message: "Successfully updated user", success: true}, {status: 200});
    } catch (error) {
        if (error instanceof SyntaxError) {
            return NextResponse.json({message: "Invalid request", success: false}, {status: 400});
        }
        console.error(error);
        return NextResponse.json({message: "Internal server error", success: false}, {status: 500});
    }
}
