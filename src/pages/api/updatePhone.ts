import prisma from "@/libs/prismadb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // ...

  if (req.method === "PUT") {
    try {
      const { id, numero_phone } = req.body; // Retirez les autres champs pour ne pas les mettre à jour
     

      // Validez l'existence de l'id et de l'email
      if (typeof id !== 'number' || !numero_phone?.trim()) {
        return res.status(400).json({ success: false, message: "ID ou nom non valide." });
      }

      // Vérifiez l'existence de l'utilisateur
      const existingPhone = await prisma.utilisateur.findUnique({ where: { id } });
      if (!existingPhone) {
        return res.status(404).json({ success: false, message: "Numéro non trouvé." });
      }

      // Mettez à jour le nom de l'utilisateur
      const updatedPhone = await prisma.utilisateur.update({
        where: { id },
        data: { numero_phone: numero_phone.trim() }, // Mettez à jour uniquement Le numéro 
      });

      return res.status(200).json({ success: true, utilisateur: updatedPhone });
    } catch (error) {
    }
  }
}
      
