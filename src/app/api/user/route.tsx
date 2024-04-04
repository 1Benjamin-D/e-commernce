import { NextRequest, NextResponse } from "next/server";
import getUserByName from "../getUserByName";

export async function GET(request: NextRequest) {
    const user = await getUserByName(request)!;
    return NextResponse.json(user);
}