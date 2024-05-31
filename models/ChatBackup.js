import "server-only";
import {model, models, Schema} from "mongoose";

const ChatBackupSchema = new Schema(
    {
        backupChatId: {
            type: String,
            required: true,
            unique: true,
        },
    },
    {
        timestamps: true,
    }
);

const ChatBackup = models.ChatBackup || model("ChatBackup", ChatBackupSchema);

export default ChatBackup;
