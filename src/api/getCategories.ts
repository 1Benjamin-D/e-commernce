import prisma from "@/libs/prismadb";

export default async function getCategories() {
    try {
        const categories = await prisma.category.findMany();
        return categories;
    } catch (err) {
        console.error("Error fetching projects", err);
        return [];
    }
}
