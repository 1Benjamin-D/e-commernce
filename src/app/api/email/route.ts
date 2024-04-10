import { NextRequest, NextResponse } from "next/server";
import getUserByEmail from "../getUserByEmail";

export async function GET(request: NextRequest) {
    const email = await getUserByEmail(request)!;
    return NextResponse.json(email);
}