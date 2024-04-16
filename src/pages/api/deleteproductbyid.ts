import prisma from "@/libs/prismadb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "DELETE") {
    try {
      const { id } = req.query; // L'ID est attendu comme paramètre de requête

      const deleteResult = await prisma.id_prod_cart.delete({
        where: { id: Number(id) },
      });

      if (!deleteResult) {
        return res.status(404).json({ success: false, message: "Article non trouvé dans le panier" });
      }

      return res.status(200).json({ success: true, message: 'Article supprimé du panier', data: deleteResult });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: "Erreur lors de la suppression de l'article" });
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    return res.status(405).end(`Méthode ${req.method} non autorisée`);
  }
}