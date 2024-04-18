import { NextRequest, NextResponse } from "next/server";
import * as bcrpyt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import prisma from "@/libs/prismadb";

export async function POST(req: NextRequest) {
    const res = NextResponse;
    try {
        let apiKey = req.headers.get('api-key');
        const compare = bcrpyt.compare(process.env.API_KEY!, apiKey!);
        if (!compare) {
            return res.json({ success: false, type: "error", message: "Forbidden." }, {
                status: 401
            })
        }
        const { tel, user_token } = await req.json();

        if (!user_token) {
            return res.json({ success: false, type: "error", message: "Pas de token utilisateur trouvé.", error_type: 'no_token' }, {
                status: 401
            })
        }
        const { userId } = jwt.decode(user_token)
        const change = await prisma.utilisateur.update({
            where: {
                id: userId
            },
            data: {
                numero_phone: parseInt(tel)
            }
        })
        if (!change) {
            return res.json({ success: false, type: "error", message: "Impossible de changer le numéro de téléhpone pour le moment." })
        }
        return res.json({ success: true, type: "success", message: "Numéro de téléhpone correctement modifié. Vous allez être redirigez vers la connexion." }, {
            status: 200
        })
    }
    catch (error) {
        console.log("Erreur lors du fetch de l'api modifyphone :", error)
        res.json({ success: false, type: "error", message: "Internal server error." }, {
            status: 500
        })
    }
}