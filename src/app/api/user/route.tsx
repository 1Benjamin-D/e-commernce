import { NextRequest, NextResponse } from "next/server";
import getUserByName from "../getUserByName";

export async function GET(request: NextRequest) {
    const users = await getUserByName(request);
    return NextResponse.json(users);
}