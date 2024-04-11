import { NextResponse } from "next/server";
import getUserAll from "../../../pages/api/getuser";

export async function GET() {
    const users = await getUserAll();
    return NextResponse.json(users);
}