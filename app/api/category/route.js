import "server-only";
import {connectToDB} from "@/mongodb/database";
import Category from "@/models/Category";
import {NextResponse} from "next/server";

export async function GET(req) {
    try {
        if (req.method !== "GET") {
            return NextResponse.json({message: "Method not allowed", success: false}, {status: 405});
        }
        await connectToDB();

        const categories = await Category.findOne({name: "categories"});
        if (!categories) {
            return NextResponse.json({message: "Categories not found", success: false}, {status: 404});
        }

        return NextResponse.json(
            {
                message: "Categories fetched successfully",
                success: true,
                data: {
                    main: categories.main,
                    sub: categories.sub,
                },
            },
            {status: 200}
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json({message: "Internal server error", success: false}, {status: 500});
    }
}
