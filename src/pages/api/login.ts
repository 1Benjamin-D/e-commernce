import {NextApiRequest, NextApiResponse} from "next";
import prisma from "@/libs/prismadb";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        res.setHeader('Method-Allowed', 'POST');
        return res.status(405).json({success: false, message: "Method Not Allowed"});
    }
    const {username, password} = JSON.parse(req.body);

    // Vérifier si la clé API est correcte
    const apiKey = req.headers['api-key']!;
    if (typeof apiKey === "string") {
        const apiKeyCorrect = await bcrypt.compare(process.env.API_KEY!, apiKey);
        if (!apiKeyCorrect) {
            return res.status(403).json({success: false, message: "Forbidden."});
        }
    }


    // Vérifier si les champs requis sont présents
    if (!username || !password) {
        return res.status(400).json({success: false, message: "Veuillez remplir tout les champs."});
    }

    // Vérifier si le compte utilisateur existe
    const accountExist = await prisma.utilisateur.findFirst({
        where: {
            name: username
        }
    });

    if (!accountExist) {
        return res.status(401).json({success: false, message: "Nom d'utilisateur ou mot de passe invalide."});
    }

    // Vérifier si le mot de passe est correct
    bcrypt.compare(password, accountExist.password, async function (err, result) {
        if (result) {
            const expirationTime = new Date();
            expirationTime.setHours(expirationTime.getHours() + 1);
            const token = jwt.sign({
                userId: accountExist.id,
                exp: expirationTime.getTime() / 1000
            }, process.env.JWT_SECRET!);
            return res.status(200).json(
                {
                    success: true,
                    message: "Connexion réussie.",
                    token: token,
                    expiresIn: expirationTime.getTime()
                }
            );
        } else {
            return res.status(401).json({success: false, message: "Nom d'utilisateur ou mot de passe invalide."});
        }
    });
}