import { Utilisateur } from "@/components/Email";
import prisma from "@/libs/prismadb";

export default async function getEmailAll(): Promise<Utilisateur[]>{
    return prisma.utilisateur.findMany()
}