import "server-only";
import {model, models, Schema} from "mongoose";

const SearchQuerySchema = new Schema(
    {
        query: {
            type: String,
            required: true,
            unique: true,
        },
        count: {
            type: Number,
            default: 1,
        },
    },
    {
        timestamps: true,
    }
);

const SearchQuery = models.SearchQuery || model("SearchQuery", SearchQuerySchema);

export default SearchQuery;
