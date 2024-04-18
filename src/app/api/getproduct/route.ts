import prisma from "@/libs/prismadb";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
	try {
		let productIdParams = parseInt(req.nextUrl.searchParams.get('productId')!);
		const data = await prisma.product.findFirst({
			where: {
				id: productIdParams,
			},
		});
		return Response.json(data);
	}
	catch (error) {
		console.error("Une erreur est survenu lors du fetch de l'api getProductsbis :", error)
	}
}
