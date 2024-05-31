import Stripe from "stripe";
import {NextResponse} from "next/server";
import {connectToDB} from "@/mongodb/database";
import User from "@/models/User";
import {SUBSCRIPTION_CREDITS} from "@/constants";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
    try {
        if (req.method !== "POST") {
            return NextResponse.json({message: "Method not allowed", success: false}, {status: 405});
        }
        if (typeof req.text !== "function") {
            return NextResponse.json({message: "Invalid request", success: false}, {status: 400});
        }

        const buffer = await req.text();
        if (!buffer) {
            return NextResponse.json({message: "Invalid request", success: false}, {status: 400});
        }

        const signature = req.headers.get("stripe-signature");
        if (!signature) {
            return NextResponse.json({message: "Invalid request", success: false}, {status: 400});
        }

        let event;
        try {
            event = stripe.webhooks.constructEvent(buffer, signature, process.env.STRIPE_WEBHOOK_SECRET);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "Unknown error";
            console.warn(`Webhook Error: ${errorMessage}`);
            return NextResponse.json({message: errorMessage, success: false}, {status: 400});
        }

        const object = event.data.object;

        await connectToDB();

        let user;
        switch (event.type) {
            case "customer.subscription.created":
                user = await User.findOne({"stripe.stripeCustomerId": object.customer});
                if (!user) {
                    console.error(`User not found: ${object.customer}`);
                    break;
                }
                user.stripe.status = object.status;
                user.stripe.subscriptionId = object.subscriptionId;
                await user.save();
                break;
            case "customer.subscription.updated":
                user = await User.findOne({"stripe.stripeCustomerId": object.customer});
                if (!user) {
                    console.error(`User not found: ${object.customer}`);
                    break;
                }
                if (object.cancel_at_period_end) {
                    user.stripe.status = "canceling";
                } else {
                    user.stripe.status = object.status;
                }
                await user.save();
                break;
            case "customer.subscription.deleted":
                user = await User.findOne({"stripe.stripeCustomerId": object.customer});
                if (!user) {
                    console.error(`User not found: ${object.customer}`);
                    break;
                }
                user.stripe.status = object.status;
                user.credits.subscriptionCredits = 0;
                user.stripe.subscriptionId = "";
                await user.save();
                break;
            case "invoice.paid":
                if (!object.subscription) {
                    console.error(`Invoice does not have a subscription: ${object.id}`);
                    break;
                }
                const subscription = await stripe.subscriptions.retrieve(object.subscription);
                if (!subscription) {
                    console.error(`Subscription not found: ${object.subscription}`);
                }
                if (subscription.status === "active" && object.status === "paid") {
                    user = await User.findOne({"stripe.stripeCustomerId": object.customer});
                    if (!user) {
                        console.error(`User not found: ${object.customer}`);
                        break;
                    }
                    user.stripe.status = "active";
                    user.stripe.subscriptionId = object.subscription;
                    user.credits.subscriptionCredits = SUBSCRIPTION_CREDITS;
                    await user.save();
                } else {
                    console.error(`Subscription status is not active: ${object.subscription}`);
                }
                break;
            case "checkout.session.completed":
                if (object.subscription) {
                    break;
                }
                const session = await stripe.checkout.sessions.retrieve(object.id, {
                    expand: ["line_items"],
                });

                user = await User.findOne({"stripe.stripeCustomerId": session.customer});
                if (!user) {
                    console.error(`User not found: ${session.customer}`);
                }

                const hasOneTimePurchase = session.line_items.data.some(
                    item => item.price.id === "price_1OTt4uGxJlLpTnz9olvyhArg"
                );

                if (hasOneTimePurchase) {
                    user.credits.rechargeCredits += SUBSCRIPTION_CREDITS;
                    await user.save();
                }
                break;
            case "charge.succeeded":
                break;
            case "payment_method.attached":
                break;
            case "customer.created":
                break;
            case "customer.updated":
                break;
            case "payment_intent.succeeded":
                break;
            case "payment_intent.created":
                break;
            case "invoice.created":
                break;
            case "invoice.finalized":
                break;
            case "invoice.updated":
                break;
            case "invoice.payment_succeeded":
                break;
            case "billing_portal.session.created":
                break;
            case "checkout.session.expired":
                break;
            default:
                console.warn(`Unhandled event type: ${event.type}`);
                break;
        }
        return NextResponse.json({message: "Success", success: true}, {status: 200});
    } catch (error) {
        console.error(error);
        return NextResponse.json({message: "Internal server error", success: false}, {status: 500});
    }
}
