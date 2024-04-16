import prisma from "@/libs/prismadb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // ...

  if (req.method === "PUT") {
    try {
      const { id, email } = req.body; // Retirez les autres champs pour ne pas les mettre à jour
     

      // Validez l'existence de l'id et de l'email
      if (typeof id !== 'number' || !email?.trim()) {
        return res.status(400).json({ success: false, message: "ID ou nom non valide." });
      }

      // Vérifiez l'existence de l'utilisateur
      const existingEmail = await prisma.utilisateur.findUnique({ where: { id } });
      if (!existingEmail) {
        return res.status(404).json({ success: false, message: "Email non trouvé." });
      }

      // Mettez à jour le nom de l'utilisateur
      const updatedEmail = await prisma.utilisateur.update({
        where: { id },
        data: { email: email.trim() }, // Mettez à jour uniquement l'email'
      });

      return res.status(200).json({ success: true, utilisateur: updatedEmail });
    } catch (error) {
    }
  }
}
      
