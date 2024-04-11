import getProducts from "@/api/getProducts";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const s_products = await getProducts();
        return NextResponse.json(s_products);
    } catch (err) {
        console.log(err);
    }
}