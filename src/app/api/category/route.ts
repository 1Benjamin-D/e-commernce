import getCategories from "@/api/getCategories";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const categories = await getCategories();
        return NextResponse.json(categories);
    } catch (err) {
        console.log(err);
    }
}
