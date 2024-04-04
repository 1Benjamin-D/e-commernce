import { Utilisateur } from "@/components/User";
import prisma from "@/libs/prismadb";

export default async function getUserAll(): Promise<Utilisateur[]>{
    return prisma.utilisateur.findMany()
}