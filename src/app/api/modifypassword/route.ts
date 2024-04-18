import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import prisma from "@/libs/prismadb";
import { cryptPassword } from "@/utils/bcrypt";

export async function POST(req: NextRequest) {
    const res = NextResponse;
    try {
        const apiKey = req.headers.get('api-key')
        let compare = bcrypt.compare(process.env.API_KEY!, apiKey!);
        if (!compare) {
            return res.json({ success: false, type: 'error', message: 'Forbidden.' }, {
                status: 401
            })
        }
        const { old_pass, pass, user_token } = await req.json();

        let hashedPassword = await cryptPassword(pass);
        let userId;
        if (user_token) {
            userId = jwt.decode(user_token)!.userId
            if (!userId) {
                return res.json({ success: false, type: 'error', message: "Vous n'êtes actuellement pas connecter." }, {
                    status: 401
                })
            }
        }
        else {
            return res.json({ success: false, type: 'error', message: "Vous n'êtes actuellement pas connecter." }, {
                status: 401
            })
        }
        const account = await prisma.utilisateur.findFirst({
            where: {
                id: userId
            }
        })
        let samepass = await bcrypt.compare(old_pass, account?.password!)
        if (!samepass) {
            return res.json({ success: false, type: 'error', message: "L'ancien mot de passe est incorrect." }, {
                status: 401
            })
        }
        const change = await prisma.utilisateur.update({
            where: {
                id: userId
            },
            data: {
                password: hashedPassword
            }
        })
        if (!change) {
            return res.json({ success: false, type: 'error', message: "Un probleme est survenue lors du changement du mot de passe." }, {
                status: 500
            })
        }
        return res.json({ success: true, type: 'success', message: 'Changement du mot de passe réussi. Vous allez être rediriger vers la page de connexion.' }, {
            status: 200
        })
    }
    catch (error) {
        console.error("Un probleme est survenue lors du changmeent du mot de passe :", error);
        return res.json({ success: false, type: 'error', message: "Internal server error." }, {
            status: 500
        })
    }
}