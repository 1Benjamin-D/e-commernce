import { NextRequest, NextResponse } from "next/server";
import * as jwt from 'jsonwebtoken'
import * as bcrpyt from 'bcryptjs'
import prisma from "@/libs/prismadb";
import { cryptPassword } from "@/utils/bcrypt";

export async function POST(req: NextRequest) {
    const res = NextResponse;
    try {
        let apiKey = req.headers.get('api-key');
        bcrpyt.compare(process.env.API_KEY!, apiKey!, function (err) {
            if (err) {
                return res.json({ success: false, type: "error", message: 'Forbidden' }, {
                    status: 401
                })
            }
        })
        const { user_token, password } = await req.json();
        let hashedPassword = await cryptPassword(password);
        const { userId, exp, iat } = jwt.decode(user_token)
        const changed = await prisma.utilisateur.update({
            where: {
                id: userId
            },
            data: {
                password: hashedPassword
            }
        })
        if (!changed) {
            return res.json({ success: false, type: 'error', message: 'Erreur lors du changement du mot de passe veuillez reéssayer.' }, {
                status: 500
            })
        }
        return res.json({ success: true, type: "success", message: "Mot de passe réinitialiser avec succes. Redirection dans 3 secondes." }, {
            status: 200
        })
    }
    catch (error) {
        return res.json({ success: false, type: 'error', message: 'Internal Server Error' }, {
            status: 500
        })
    }
}