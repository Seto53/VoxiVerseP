import "server-only";
import {model, models, Schema} from "mongoose";
import {TOKEN_EXPIRATION_TIME} from "@/constants";

const TokenSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
        },
        token: {
            type: String,
            required: true,
            unique: true,
        },
        expiresAt: {
            type: Date,
            default: () => new Date(+new Date() + TOKEN_EXPIRATION_TIME * 1000),
        },
    },
    {
        timestamps: true,
    }
);

TokenSchema.index({expiresAt: 1}, {expireAfterSeconds: TOKEN_EXPIRATION_TIME});

const Token = models.Token || model("Token", TokenSchema);

export default Token;
