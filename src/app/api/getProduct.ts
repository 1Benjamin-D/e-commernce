import prisma from "@/libs/prismadb";
import { Product } from "@prisma/client";

export default async function getProductAll(): Promise<Product[]>{
    return prisma.product.findMany()
}