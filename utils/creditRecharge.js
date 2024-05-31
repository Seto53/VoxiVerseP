import "server-only";
import Stripe from "stripe";
import User from "@/models/User";
import {connectToDB} from "@/mongodb/database";
import {SUBSCRIPTION_CREDITS} from "@/constants";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function checkSubscriptionStatus(customerId, userId) {
    const customer = await stripe.customers.retrieve(customerId, {
        expand: ["subscriptions"],
    });
    if (!customer) {
        console.error(`User ${userId} not found`);
        return false;
    }
    if (!customer.subscriptions) {
        console.error(`User ${userId} has no subscriptions`);
        return false;
    }
    if (customer.subscriptions.data.length > 1) {
        console.error(`User ${userId} has more than one subscription`);
        return false;
    }

    const subscriptionId = customer.subscriptions?.data[0]?.id;
    if (subscriptionId) {
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        return subscription.status === "active";
    } else {
        console.error(`User ${userId} has no subscription`);
        return false;
    }
}

async function rechargeCredits() {
    console.log("Recharging credits");
    console.log("Current UTC time: " + new Date().toUTCString());
    await connectToDB();
    const users = await User.find({
        "stripe.subscriptionId": {$exists: true, $ne: ""},
    });

    for (const user of users) {
        const isActive = await checkSubscriptionStatus(user.stripe.stripeCustomerId, user._id.toString());
        if (isActive) {
            user.credits.subscriptionCredits = SUBSCRIPTION_CREDITS;
            await user.save();
            console.log(`Recharged credits for user ${user._id.toString()}`);
        }
    }
}

export default rechargeCredits;
