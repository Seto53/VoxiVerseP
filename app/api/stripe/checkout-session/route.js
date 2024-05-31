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
        if (typeof req.json !== "function") {
            return NextResponse.json({message: "Invalid request", success: false}, {status: 400});
        }

        const reqBody = await req.json();
        if (!reqBody) {
            return NextResponse.json({message: "Invalid request", success: false}, {status: 400});
        }

        const {type} = reqBody;
        if (!type) {
            return NextResponse.json({message: "Invalid request", success: false}, {status: 400});
        }

        if (type !== "subscription" && type !== "recharge") {
            return NextResponse.json({message: "Invalid request", success: false}, {status: 400});
        }

        const session = await getServerSession(req);
        if (!session) {
            return NextResponse.json({message: "Unauthorized", success: false}, {status: 401});
        }

        await connectToDB();

        const user = await User.findOne({"profile.email": session.user.email});
        if (!user) {
            console.error(`User not found: ${session.user.email}`);
            return NextResponse.json({message: "User not found", success: false}, {status: 404});
        }

        if (reqBody.type === "subscription") {
            return handleSubscription(user, session);
        } else if (reqBody.type === "recharge") {
            return handleRecharge(user, session);
        }

        return NextResponse.json({message: "Invalid request", success: false}, {status: 400});
    } catch (error) {
        if (error instanceof SyntaxError) {
            return NextResponse.json({message: "Invalid request", success: false}, {status: 400});
        }
        console.error(error);
        return NextResponse.json({message: "Internal server error", success: false}, {status: 500});
    }
}

async function handleSubscription(user, session) {
    if (user.stripe.subscriptionId) {
        const subscription = await stripe.subscriptions.retrieve(user.stripe.subscriptionId);
        if (subscription) {
            return NextResponse.json(
                {
                    message: "User already has a subscription",
                    success: false,
                },
                {status: 400}
            );
        }
    }

    const idempotencyKey = `subscribe-${user._id}-${new Date().getTime()}`;

    const checkoutSession = await stripe.checkout.sessions.create(
        {
            mode: "subscription",
            customer: user.stripe.stripeCustomerId,
            line_items: [
                {
                    price: "price_1OTt5GGxJlLpTnz90jN97k86",
                    quantity: 1,
                },
            ],
            success_url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: process.env.NEXT_PUBLIC_WEBSITE_URL,
            subscription_data: {
                metadata: {
                    payingUserId: session.user.id,
                },
            },
        },
        {idempotencyKey}
    );

    if (!checkoutSession.url) {
        return NextResponse.json({message: "Could not create checkout session", success: false}, {status: 500});
    }

    return NextResponse.json({data: {session: checkoutSession}, success: true}, {status: 200});
}

async function handleRecharge(user, session) {
    const idempotencyKey = `recharge-${user._id}-${new Date().getTime()}`;

    const checkoutSession = await stripe.checkout.sessions.create(
        {
            mode: "payment",
            customer: user.stripe.stripeCustomerId,
            payment_method_types: ["card"],
            line_items: [
                {
                    price: "price_1OTt4uGxJlLpTnz9olvyhArg",
                    quantity: 1,
                },
            ],
            success_url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: process.env.NEXT_PUBLIC_WEBSITE_URL,
            payment_intent_data: {
                metadata: {
                    payingUserId: session.user.id,
                },
            },
        },
        {idempotencyKey}
    );

    if (!checkoutSession.url) {
        return NextResponse.json({message: "Could not create checkout session", success: false}, {status: 500});
    }

    return NextResponse.json({data: {session: checkoutSession}, success: true}, {status: 200});
}
