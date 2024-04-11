import prisma from "@/libs/prismadb";
import { Utilisateur } from "@prisma/client";
import { NextRequest } from "next/server";

export default async function getUserByName(request: NextRequest): Promise<Utilisateur | null>{
    const name = request.nextUrl.searchParams.get("name")!;
    return prisma.utilisateur.findFirst({where: {name}});
}