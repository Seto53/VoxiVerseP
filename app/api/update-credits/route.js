import "server-only";
import {NextResponse} from "next/server";
import rechargeCredits from "@/utils/creditRecharge";

export const dynamic = "force-dynamic";

export async function GET(req) {
    try {
        if (req.method !== "GET") {
            return NextResponse.json({message: "Method not allowed", success: false}, {status: 405});
        }

        const authHeader = req.headers.get("authorization");
        if (!authHeader) {
            return NextResponse.json({message: "Unauthorized", success: false}, {status: 401});
        }
        if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
            return NextResponse.json({message: "Unauthorized", success: false}, {status: 401});
        }

        // TODO: Check integrity of database

        await rechargeCredits();

        return NextResponse.json({message: "Success", success: true}, {status: 200});
    } catch (error) {
        console.error(error);
        return NextResponse.json({message: "Internal server error", success: false}, {status: 500});
    }
}
