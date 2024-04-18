import { NextRequest, NextResponse } from "next/server";
import * as bcrypt from 'bcryptjs'
import prisma from "@/libs/prismadb";
import { cryptPassword } from "@/utils/bcrypt";

interface Form {
    username: string
    email: string
    password: string
    confirm_password: string
    numero_phone: string
}

export async function POST(req: NextRequest) {
    const res = NextResponse;
    const apiKey = req.headers.get('api-key');
    if (typeof apiKey === "string") {
        const apiKeyCorrect = await bcrypt.compare(process.env.API_KEY!, apiKey);
        if (!apiKeyCorrect) {
            return res.json(JSON.stringify({ success: false, type: "error", message: "Forbidden." }), {
                status: 401
            })
        }
    }
    const body = await req.json();
    const { username, email, password, numero_phone } = body
    if (!validateData(body)) {
        return res.json(JSON.stringify({ success: false, type: "error", message: "Veuillez vérifier les informations entré dans le formulaire." }), {
            status: 400
        })
    }
    const hashedPassword = await cryptPassword(password);
    const emailExist = await prisma.utilisateur.findFirst({
        where: {
            email: email
        }
    })
    try {
        if (emailExist) {
            return res.json({ success: false, type: "error", message: "Cette adresse email existe déjà." }, {
                status: 400
            })
        } else {
            const register = await prisma.utilisateur.create({
                data: {
                    name: username,
                    email: email,
                    password: hashedPassword,
                    numero_phone: parseInt(numero_phone)
                }
            })
            if (register) {
                return res.json({ success: true, type: "success", message: "Compte créé avec succès." }, {
                    status: 200
                })
            }
        }
    } catch (error) {
        console.error("Une erreur est survenu lors de la creation du compte :", error)
    }
}
const validateData = ({ username, email, password, confirm_password, numero_phone }: Form) => {
    let newErrors: Form = {}
    if (username.indexOf(" ") >= 0) {
        newErrors.username = "Le nom d'utilisateur ne peut pas contenir d'espace."
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        newErrors.email = "L'email n'est pas dans un format valide."
    }
    if (password.indexOf(" ") >= 0) {
        newErrors.password = "Le mot de passe ne peut pas contenir d'espace."
    }
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password)) {
        newErrors.password = "Le mot de passe doit contenir au moins un caractere spécial."
    }
    if (!/[A-Z]/.test(password)) {
        newErrors.password = "Le mot de passe doit contenir au moins une majuscule."
    }
    if (!/[a-z]/.test(password)) {
        newErrors.password = "Le mot de passe doit contenir au moins une minuscule."
    }
    if (!/[0-9]/.test(password)) {
        newErrors.password = "Le mot de passe doit contenir au moins un chiffre."
    }
    if (password !== confirm_password) {
        newErrors.confirm_password = "Le mot de passe et le mot de passe de confirmation ne sont pas identique."
    }
    const regex = new RegExp('^0[1-6]{1}(([0-9]{2}){4})|((\\s[0-9]{2}){4})|((-[0-9]{2}){4})$')
    if (!regex.test(numero_phone)) {
        newErrors.numero_phone = "Le numéro de téléphone n'est pas valide."
    }
    return Object.keys(newErrors).length === 0;
}