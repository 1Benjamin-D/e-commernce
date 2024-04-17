import prisma from "@/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";
import * as jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
    const res = NextResponse;
    const { email } = await req.json();
    try {
        if (!email) {
            return res.json({ success: false, type: 'error', message: "Le champs ne peut pas être vide." })
        }
        const accountExist = await prisma.utilisateur.findFirst({
            where: {
                email: email
            }
        })
        if (!accountExist) {
            return res.json({ success: false, type: 'warning', message: 'Aucun compte existe avec cette email.' }, {
                status: 404
            })
        }
        const user_token = jwt.sign({
            userId: accountExist.id
        }, process.env.JWT_SECRET!, { expiresIn: '1h' });
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.NODEMAIL_EMAIL,
                pass: process.env.NODEMAIL_PASS
            }
        })
        const url = `http://localhost:3000/reset/${user_token}`
        let mailOptions = {
            from: 'goupedetravaillbaptiste@gmail.com',
            to: email,
            subjet: 'Password reset',
            text: `${url}`
        }
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.error("Erreur lors de l'envoie du mail :", error);
                return res.json({ success: false, type: 'warning', message: "Erreur lors de l'envoie du mail." }, {
                    status: 500
                })
            }
        })
        return res.json({ success: true, type: 'success', message: "Email de réinitialisation envoyé.", token: user_token }, {
            status: 200
        })
    }
    catch (error) {
        console.log("Erreur lors du fetch de l'api resetpassword :", error)
        res.json({ success: false, type: "error", message: "Internal Server Error" }, {
            status: 500
        })
    }
}