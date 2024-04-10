import prisma from "@/libs/prismadb";
import { Product } from "@prisma/client";
import { NextRequest } from "next/server";

export default async function getProductByName(request: NextRequest): Promise<Product | null>{
    const name = request.nextUrl.searchParams.get("name")!;
    return prisma.product.findFirst({where: {product_name: name}});
}