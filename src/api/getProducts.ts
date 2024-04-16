import prisma from "@/libs/prismadb";

export default async function getProducts() {
    try {
        const products = await prisma.product.findMany(
            
        );
        return products;
    } catch (err) {
        console.error("Error fetching products", err);
        return [];
    }
}