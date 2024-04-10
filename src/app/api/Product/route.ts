import { NextRequest, NextResponse } from "next/server";
import getProductByName from "../getProductByName";

export async function GET(request: NextRequest) {
    const product = await getProductByName (request)!;
    return NextResponse.json(product);
}