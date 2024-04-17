import prisma from "@/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";
import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcryptjs'

export async function GET(req: NextRequest) {
    const res = NextResponse;
    const apiKey = req.headers.get('api-key');
    const compare = bcrypt.compare(process.env.API_KEY!, apiKey!)
    if (!compare) {
        return res.json({ success: false, type: 'error', message: 'Forbidden.' }, {
            status: 401
        })
    }
    const user_token = req.nextUrl.searchParams.get("user_token");
    const { userId } = jwt.decode(user_token!)
    const account = await prisma.utilisateur.findFirst({
        where: {
            id: userId
        }
    })
    if (!account) {
        return res.json({ success: false, type: 'error', message: 'Aucun compte trouvé.' }, {
            status: 404
        })
    }
    return res.json({ success: true, type: 'success', data: account }, {
        status: 200
    })
}