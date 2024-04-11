import prisma from "@/libs/prismadb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    
    const userId = 9; 

    try {
      const cartItems = await prisma.cart.findMany({
        where: { id_user: Number(userId) },
        include: {
          id_prod_cart: {
            include: {
              Product: true, 
            },
          },
        },
      });

      if (cartItems.length === 0) {
    
        return res.status(404).json({ success: false, message: "Panier non trouvé pour cet utilisateur" });
      }

      
      return res.status(200).json({ success: true, data: cartItems });
    } catch (error) {
        console.error(error); // Ajoutez cette ligne pour voir le détail de l'erreur
      res.status(500).json({ success: false, message: "Erreur lors de la récupération du panier" });
    }
  } else {
    
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Méthode ${req.method} non autorisée`);
  }
}
