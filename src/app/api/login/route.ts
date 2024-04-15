import { NextRequest, NextResponse } from "next/server";
import * as bcrypt from 'bcryptjs'
import prisma from "@/libs/prismadb";
import jwt from "jsonwebtoken"

export async function POST(req: NextRequest) {
    const res = NextResponse;
    try {
        if (req.method !== "POST") {
            return res.json({ success: false, type: "error", message: "Method Not Allowed" }, {
                status: 405
            });
        }
        const { username, password } = await req.json();

        const apiKey = req.headers.get('api-key')!;
        if (typeof apiKey === "string") {
            const apiKeyCorrect = await bcrypt.compare(process.env.API_KEY!, apiKey);
            if (!apiKeyCorrect) {
                return res.json({ success: false, type: "error", message: "Forbidden." }, {
                    status: 403
                });
            }
        }
        if (!username || !password) {
            return res.json({ success: false, type: "error", message: "Veuillez remplir tout les champs." }, {
                status: 400
            });
        }

        const accountExist = await prisma.utilisateur.findFirst({
            where: {
                name: username
            }
        });

        if (!accountExist) {
            return res.json({ success: false, type: "error", message: "Nom d'utilisateur ou mot de passe invalide." }, {
                status: 401
            });
        }

        bcrypt.compare(password, accountExist.password, async function (err) {
            if (err) {
                return res.json({ success: false, type: "error", message: "Nom d'utilisateur ou mot de passe invalide." }, {
                    status: 401
                });
            }
        });

        const expirationTime = new Date();
        expirationTime.setHours(expirationTime.getHours() + 1);
        const token = jwt.sign({
            userId: accountExist.id,
            exp: expirationTime.getTime() / 1000
        }, process.env.JWT_SECRET!);
        return res.json(
            {
                success: true,
                type: "success",
                message: "Connexion réussie.",
                token: token,
                expiresIn: expirationTime.getTime()
            },
            {
                status: 200
            }
        );
    }
    catch (error) {
        console.log("Erreur lors de l'appel a l'api a loginbis :", error);
        return res.json({ success: false, type: "error", message: 'Internal Server Error' }, {
            status: 500
        })
    }
}