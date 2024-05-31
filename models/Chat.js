import "server-only";
import {model, models, Schema} from "mongoose";

const ChatSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        characterId: {
            type: Schema.Types.ObjectId,
            ref: "Character",
            required: true,
        },
        processing: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

ChatSchema.index({userId: 1, characterId: 1}, {unique: true});

const Chat = models.Chat || model("Chat", ChatSchema);

export default Chat;
