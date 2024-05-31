import {NextResponse} from "next/server";
import {Stripe} from "stripe";
import {getServerSession} from "next-auth";
import {connectToDB} from "@/mongodb/database";
import User from "@/models/User";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
    try {
        if (req.method !== "POST") {
            return NextResponse.json({message: "Method not allowed", success: false}, {status: 405});
        }

        const session = await getServerSession(req);
        if (!session) {
            return NextResponse.json({message: "Unauthorized", success: false}, {status: 401});
        }

        await connectToDB();

        const user = await User.findOne({"profile.email": session.user.email});
        if (!user) {
            console.error(`User not found: ${email}`);
            return NextResponse.json({message: "User not found", success: false}, {status: 404});
        }

        const billingPortalSession = await stripe.billingPortal.sessions.create({
            customer: user.stripe.stripeCustomerId,
            return_url: process.env.NEXT_PUBLIC_WEBSITE_URL + "/profile",
        });

        return NextResponse.json({data: {session: billingPortalSession}, success: true}, {status: 200});
    } catch (error) {
        console.error(error);
        return NextResponse.json({message: "Internal server error", success: false}, {status: 500});
    }
}
