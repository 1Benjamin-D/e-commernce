import prisma from "@/libs/prismadb";
import bcrypt from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    try {
      const { id, name, email, numero_phone, password } = req.body;

      // Validation des données reçues
      if (!id || !name?.trim() || !email?.trim() || !password ||
          typeof name !== 'string' || typeof email !== 'string' ||
          typeof password !== 'string' || (numero_phone && typeof numero_phone !== 'string')) {
        return res.status(400).json({ success: false, message: "Les données fournies sont incomplètes ou incorrectes." });
      }

      // Recherche de l'utilisateur
      const existingUser = await prisma.utilisateur.findUnique({ where: { id: Number(id) } });
      if (!existingUser) {
        return res.status(404).json({ success: false, message: "Utilisateur non trouvé." });
      }

      // Hashage du mot de passe
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

      // Mise à jour de l'utilisateur
      const updatedUser = await prisma.utilisateur.update({
        where: { id: Number(id) },
        data: {
          name: name?.trim(),
          email: email?.trim().toLowerCase(),
          password: hashedPassword,
          ...(numero_phone && { numero_phone: numero_phone?.trim() })
        },
      });

      console.log('Utilisateur mis à jour:', updatedUser);
      return res.status(200).json({ success: true, utilisateur: updatedUser });
    } catch (error: unknown) {
      console.error('Erreur capturée dans le handler:', error);

      // Vérification du type de l'erreur
      if (typeof error === "object" && error !== null && 'code' in error) {
        const specificError = error as { code: string };
        if (specificError.code === 'P2002') {
          return res.status(409).json({ success: false, message: "Email ou numéro de téléphone déjà utilisé." });
        }
      }

      return res.status(500).json({
        success: false,
        message: "Erreur lors de la mise à jour de l'utilisateur."
      });
    }
  } else {
    console.log(`Méthode ${req.method} non autorisée pour la route`);
    res.setHeader("Allow", ["PUT"]);
    return res.status(405).end(`Méthode ${req.method} non autorisée`);
  }
}
