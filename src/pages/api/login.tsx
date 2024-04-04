import {NextApiRequest, NextApiResponse} from "next";
import prisma from "@/libs/prismadb";
import bcrypt from 'bcryptjs'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const {username, password} = JSON.parse(req.body);
        if (username && password){
            const accountExist = await prisma.utilisateur.findFirst({
                where: {
                    name: username
                }
            })
            if (accountExist){
                bcrypt.compare(password, accountExist.password, function(err, result) {
                    if(result){
                        res.status(200).json({success: true, message: "Connexion réussite."})
                    }
                    else{
                        res.status(401).json({success: false, message: "Nom d'utilisateur ou mot de passe invalide."})
                    }
                });
            }
            else{
                res.status(401).json({success: false, message: "Nom d'utilisateur ou mot de passe invalide."})
            }
        }
        else{
            res.status(400).json({success: false, message: "Veuillez remplir tout les champs."})
        }
    } else {
        res.setHeader('Method-Allowed', 'POST');
        res.status(405).json({success: false, message: "Method Not Allowed"})
    }
}