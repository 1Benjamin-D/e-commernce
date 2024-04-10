import prisma from "@/libs/prismadb";
import { Utilisateur } from "@prisma/client";
import { NextRequest } from "next/server";

export default async function getUserByEmail(request: NextRequest): Promise<Utilisateur | null>{
    const email = request.nextUrl.searchParams.get("email")!;
    return prisma.utilisateur.findFirst({where: {email}});
}