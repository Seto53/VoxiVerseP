import "server-only";
import {connectToDB} from "@/mongodb/database";
import User from "@/models/User";
import {NextResponse} from "next/server";
import bcrypt from "bcrypt";
import {Stripe} from "stripe";
import {EMAIL_REGEX, USERNAME_REGEX} from "@/constants";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

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

        const {data, token} = reqBody;
        if (!data || !token) {
            return NextResponse.json({message: "Invalid request", success: false}, {status: 400});
        }
        const {email, username, password} = data;
        if (!email || !password || !username) {
            return NextResponse.json({message: "Invalid request", success: false}, {status: 400});
        }

        if (!EMAIL_REGEX.test(email)) {
            return NextResponse.json({message: "Email is invalid", success: false}, {status: 400});
        }
        if (!USERNAME_REGEX.test(username)) {
            return NextResponse.json({message: "Username is invalid", success: false}, {status: 400});
        }
        if (typeof password !== "string") {
            return NextResponse.json({message: "Password is invalid", success: false}, {status: 400});
        }
        if (password.length < 8) {
            return NextResponse.json({message: "Password is invalid", success: false}, {status: 400});
        }

        const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `secret=${encodeURIComponent(process.env.RECAPTCHA_SECRET_KEY)}
            &response=${encodeURIComponent(token)}`,
            cache: "no-store",
        });
        const responseData = await response.json();
        if (!responseData.success || responseData.score < 0.5) {
            return NextResponse.json({message: "Token is invalid", success: false}, {status: 403});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await connectToDB();

        const emailUnique = await User.findOne({"profile.email": email});
        if (emailUnique) {
            return NextResponse.json({message: "Email already exists", success: false}, {status: 409});
        }

        const usernameUnique = await User.findOne({"profile.username": username});
        if (usernameUnique) {
            return NextResponse.json({message: "Username already exists", success: false}, {status: 409});
        }

        let customer;
        try {
            customer = await stripe.customers.create({
                email: email,
                name: username,
            });

            await User.create({
                profile: {
                    email: email,
                    username: username,
                    name: username,
                    hashedPassword: hashedPassword,
                },
                stripe: {
                    stripeCustomerId: customer.id,
                },
                lastLogin: new Date(),
            });
        } catch (error) {
            if (error?.code === 11000) {
                try {
                    await stripe.customers.del(customer.id);
                } catch (stripeDeleteError) {
                    console.error(`Failed to delete Stripe customer ${customer.id}:`, stripeDeleteError);
                }
                const field = Object.keys(error.keyValue)[0];
                return NextResponse.json({message: `${field} already exists`, success: false}, {status: 409});
            }
            throw error;
        }
        return NextResponse.json({message: "User registered.", success: true}, {status: 201});
    } catch (error) {
        if (error instanceof SyntaxError) {
            return NextResponse.json({message: "Invalid request", success: false}, {status: 400});
        }
        console.error(error);
        return NextResponse.json({message: "Internal server error", success: false}, {status: 500});
    }
}
