import "server-only";
import {model, models, Schema} from "mongoose";

const MessageSchema = new Schema(
    {
        chatId: {
            type: Schema.Types.ObjectId,
            ref: "Chat",
            required: true,
        },
        sender: {
            type: String,
            enum: ["User", "Character"],
            required: true,
        },
        textContent: {
            type: String,
            required: true,
        },
        audioId: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const Message = models.Message || model("Message", MessageSchema);

export default Message;
