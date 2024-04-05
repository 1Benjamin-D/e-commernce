import {NextApiRequest, NextApiResponse} from "next";
import {cryptPassword} from "@/utils/bcrypt";
import prisma from "@/libs/prismadb";
import bcrypt from "bcryptjs";

interface Form {
    username: string
    email: string
    password: string
    confirm_password: string
    numero_phone: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        res.setHeader('Method-Allowed', 'POST');
        res.status(405).json({success: false, message: "Method Not Allowed"})
    }
    let {username, email, password, numero_phone} = JSON.parse(req.body);

    const apiKey = await cryptPassword(process.env.API_KEY!);
    const apiKeyCorrect = await bcrypt.compare(process.env.API_KEY!, apiKey);
    if (!apiKeyCorrect) {
        return res.status(403).json({success: false, message: "Forbidden."});
    }

    if (!validateData(JSON.parse(req.body))) {
        res.status(400).json({success: false, message: "Veuillez vérifier les informations entré dans le formulaire."})
    }
    const hashedPassword = await cryptPassword(password);
    const emailExist = await prisma.utilisateur.findFirst({
        where: {
            email: email
        }
    })
    try {
        if (emailExist) {
            res.status(400).json({success: false, message: "Cette adresse email existe déjà."})
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
                res.status(201).json({success: true, message: "Compte créé avec succès."})
            }
        }
    } catch (error) {
        console.error("Une erreur est survenu lors de la creation du compte :", error)
    }
}
const validateData = ({username, email, password, confirm_password, numero_phone}: Form) => {
    // @ts-ignore
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