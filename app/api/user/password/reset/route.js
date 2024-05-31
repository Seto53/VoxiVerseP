import "server-only";
import {sendMail} from "@/utils/mailservice";
import {NextResponse} from "next/server";
import {connectToDB} from "@/mongodb/database";
import User from "@/models/User";
import Token from "@/models/Token";
import {randomBytes} from "crypto";

export async function POST(request) {
    try {
        if (request.method !== "POST") {
            return NextResponse.json({message: "Method not allowed", success: false}, {status: 405});
        }

        const {data} = await request.json();
        if (!data) {
            return NextResponse.json({message: "Invalid request", success: false}, {status: 400});
        }
        const {email} = data;
        if (!email) {
            return NextResponse.json({message: "Invalid request", success: false}, {status: 400});
        }

        await connectToDB();

        const user = await User.findOne({"profile.email": email});
        if (!user) {
            return NextResponse.json({message: "User not found", success: false}, {status: 404});
        }

        const userId = user._id;
        let token = await Token.findOne({userId: userId});

        if (token) {
            return NextResponse.json({message: "Email has already been sent", success: true}, {status: 200});
        }

        const secureToken = randomBytes(32).toString("hex");
        try {
            token = await Token.create({userId: userId, token: secureToken});
        } catch (error) {
            if (error.code === 11000) {
                return NextResponse.json({message: "Email has already been sent", success: true}, {status: 200});
            }
            throw error;
        }

        const resetLink = `${process.env.NEXT_PUBLIC_WEBSITE_URL}/change-password/${token.token}`;
        const emailContent = `Hello,

Please click the link below to reset your password:
${resetLink}

The link will expire in 24 hours.
If you did not request a password reset, please ignore this email.

Best regards,
VoxiVerse

For any questions, please contact us at support@voxiverse.com.
`;

        await sendMail("Reset Password", email, emailContent);

        return NextResponse.json({message: "Email sent", success: true}, {status: 200});
    } catch (error) {
        if (error instanceof SyntaxError) {
            return NextResponse.json({message: "Invalid request", success: false}, {status: 400});
        }
        console.error(error);
        return NextResponse.json({message: "Internal server error", success: false}, {status: 500});
    }
}
