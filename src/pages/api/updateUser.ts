import prisma from "@/libs/prismadb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // ...

  if (req.method === "PUT") {
    try {
      const { id, name } = req.body; // Retirez les autres champs pour ne pas les mettre à jour

      // Validez l'existence de l'id et du name
      if (typeof id !== 'number' || !name?.trim()) {
        return res.status(400).json({ success: false, message: "ID ou nom non valide." });
      }

      // Vérifiez l'existence de l'utilisateur
      const existingUser = await prisma.utilisateur.findUnique({ where: { id } });
      if (!existingUser) {
        return res.status(404).json({ success: false, message: "Utilisateur non trouvé." });
      }

      // Mettez à jour le nom de l'utilisateur
      const updatedUser = await prisma.utilisateur.update({
        where: { id },
        data: { name: name.trim() }, // Mettez à jour uniquement le nom
      });

      return res.status(200).json({ success: true, utilisateur: updatedUser });
    } catch (error) {
    }
  }
}
      
