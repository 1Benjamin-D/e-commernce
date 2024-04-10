import prisma from "@/libs/prismadb";
import { Utilisateur } from "@prisma/client";
import { NextRequest } from "next/server";

export default async function getUserByPhone(request: NextRequest): Promise<Utilisateur | null> {
  // Récupérer la valeur du paramètre et essayer de le convertir en nombre
  const phoneString = request.nextUrl.searchParams.get("phone");
  const phone = phoneString ? parseInt(phoneString, 10) : null;

  // S'assurer que `phone` est un nombre avant de continuer
  if (phone === null || isNaN(phone)) {
    // Gérer l'erreur ou retourner `null` si `phone` n'est pas un nombre valide
    return null;
  }

  return prisma.utilisateur.findFirst({ where: { numero_phone: phone } });
}

