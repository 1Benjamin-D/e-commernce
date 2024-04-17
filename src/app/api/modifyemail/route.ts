import { NextRequest, NextResponse } from "next/server";
import * as jwt from 'jsonwebtoken'
import * as bcrypt from 'bcryptjs'
import prisma from "@/libs/prismadb";

export async function POST(req: NextRequest) {
    const res = NextResponse;
    try {

    }
    catch (error) {
        console.error("Une erreur est survenu lors du changement du mail :", error)
        return res.json({ success: false, type: 'error', message: 'Internal server error.' }, {
            status: 500
        })
    }
    const apiKey = req.headers.get('api-key');
    const compare = bcrypt.compare(process.env.API_KEY!, apiKey!);
    if (!compare) {
        return res.json({ success: false, type: 'error', message: 'Forbidden.' }, {
            status: 401
        })
    }
    const { email, user_token } = await req.json()
    if (!user_token) {
        return res.json({ success: false, type: 'error', message: 'Vous devez être connecter pour effectuer cela.' }, {
            status: 401
        })
    }
    let { userId } = jwt.decode(user_token);

    const changed = await prisma.utilisateur.update({
        where: {
            id: userId
        },
        data: {
            email: email
        }
    })

    if (!changed) {
        return res.json({ success: false, type: 'error', message: 'Impossible de changer le mail de votre compte pour le moment.' }, {
            status: 500
        })
    }

    return res.json({ success: true, type: 'success', message: 'Votre mail a bien été changer. Vous allez être rediriger vers la connexion.' }, {
        status: 200
    })
}