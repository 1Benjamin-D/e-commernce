import { Product } from "@/components/Product";
import prisma from "@/libs/prismadb";
import { NextRequest } from "next/server";

export default async function getProductByName(request: NextRequest): Promise<Product | null>{
    const name = request.nextUrl.searchParams.get("name");
    console.log(`Recherche du produit avec le nom: ${name}`);

    // Vérifiez si `name` est null ou vide
    if (!name) {
        console.log('Le nom du produit est vide ou manquant.');
        return null;
    }

    const product = await prisma.product.findFirst({where: {product_name: name}});
    console.log(`Produit trouvé:`, product);

    return product;
}