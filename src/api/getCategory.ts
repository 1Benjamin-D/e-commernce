import prisma from "@/libs/prismadb";

export default async function getCategory() {
    try {
        const categories = await prisma.category.findMany({
            include: {
                id_sub_cat: {
                    include: {
                        Sub_category: true,
                    },
                },
            },
        });
        return categories;
    } catch (err) {
        console.error("Error fetching", err);
        return [];
    }
}
