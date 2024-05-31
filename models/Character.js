import "server-only";
import {model, models, Schema} from "mongoose";

const CharacterSchema = new Schema(
    {
        name: {
            type: String,
            unique: true,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        shortDescription: {
            type: String,
            required: true,
        },
        totalInteractions: {
            type: Number,
            default: 0,
            required: true,
        },
        prompt: {
            type: String,
            required: true,
        },
        elevenlabs: {
            voiceId: {
                type: String,
                required: true,
            },
            body: {
                model_id: {
                    type: String,
                    required: true,
                },
                voice_settings: {
                    stability: {
                        type: Number,
                        required: true,
                    },
                    similarity_boost: {
                        type: Number,
                        required: true,
                    },
                    style: {
                        type: Number,
                    },
                    use_speaker_boost: {
                        type: Boolean,
                    },
                },
            },
        },
        language: {
            type: String,
            required: true,
        },
        category: [
            {
                type: String,
                required: true,
            },
        ],
        bio: {
            type: String,
        },
        greeting: {
            textContent: {
                type: String,
                required: true,
            },
            audioId: {
                type: String,
                required: true,
            },
        },
    },
    {
        timestamps: true,
    }
);

const Character = models.Character || model("Character", CharacterSchema);

export default Character;
