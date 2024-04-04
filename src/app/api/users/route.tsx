import { NextResponse } from "next/server";
import getUserAll from "../getUser";

export async function GET() {
    const users = await getUserAll();
    return NextResponse.json(users);
}