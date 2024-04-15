import getCategory from "@/api/getCategory";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const categories = await getCategory();
        return NextResponse.json(categories);
    } catch (err) {
        console.log(err);
    }
}
