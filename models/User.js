import "server-only";
import {model, models, Schema} from "mongoose";

const UserSchema = new Schema(
    {
        profile: {
            email: {
                type: String,
                unique: [true, "Email already exists!"],
                required: [true, "Email is required!"],
                match: [/^(?=.{1,100}$)[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, "Invalid email address!"],
            },
            username: {
                type: String,
                match: [/^[a-zA-Z0-9._-]{4,15}$/, "Invalid username!"],
                unique: [true, "Username already exists!"],
                sparse: true,
            },
            name: {
                type: String,
                match: [/^[a-zA-Z0-9._-]{1,15}$/, "Invalid name!"],
            },
            image: {
                type: String,
            },
            hashedPassword: {
                type: String,
            },
        },
        stripe: {
            stripeCustomerId: {
                type: String,
                unique: [true, "Stripe Customer ID already exists!"],
                required: [true, "Stripe Customer ID is required!"],
            },
            status: {
                type: String,
                enum: [
                    "active",
                    "past_due",
                    "unpaid",
                    "incomplete",
                    "incomplete_expired",
                    "canceled",
                    "unpaid",
                    "canceling",
                    "new",
                ],
                default: "new",
            },
            subscriptionId: {
                type: String,
                unique: [true, "Stripe Subscription ID already exists!"],
                sparse: true,
            },
        },
        credits: {
            subscriptionCredits: {
                type: Number,
                default: 0,
            },
            rechargeCredits: {
                type: Number,
                default: 0,
            },
        },
        lastLogin: {
            type: Date,
            default: Date.now,
        },
        emailVerified: {
            type: Date,
        },
        themePreference: {
            type: String,
            enum: ["Light", "Dark"],
            default: "Dark",
        },
        notificationSettings: {
            emailNotifications: {
                type: Boolean,
                default: true,
            },
        },
    },
    {
        timestamps: true,
    }
);

const User = models.User || model("User", UserSchema);

export default User;
