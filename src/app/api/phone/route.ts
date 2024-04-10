import { NextRequest, NextResponse } from "next/server";
import getUserByPhone from "../getUserByPhone";

export async function GET(request: NextRequest) {
    const phone = await getUserByPhone  (request)!;
    return NextResponse.json(phone);
}