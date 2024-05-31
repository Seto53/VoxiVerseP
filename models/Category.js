import "server-only";
import {model, models, Schema} from "mongoose";

const CategorySchema = new Schema(
    {
        main: [
            {
                type: String,
                required: true,
            },
        ],
        sub: [
            {
                type: String,
                required: true,
            },
        ],
    },
    {
        timestamps: true,
    }
);

const Category = models.Category || model("Category", CategorySchema);

export default Category;
