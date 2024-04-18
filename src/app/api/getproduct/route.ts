import prisma from "@/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";
import * as bcrypt from 'bcryptjs'

export async function GET(req: NextRequest) {
	const res = NextResponse
	try {
		const { searchParams } = new URL(req.url)
		let apiKey = searchParams.get('apiKey');
		const compare = bcrypt.compare(process.env.NEXT_PUBLIC_API_KEY!, apiKey!)
		if (!compare) {
			return res.json({ success: false, type: 'error', message: 'Forbidden.' }, {
				status: 401
			})
		}
		let productIdParams = parseInt(searchParams.get('productId')!);
		const data = await prisma.product.findFirst({
			where: {
				id: productIdParams,
			},
		});
		return res.json({ success: true, data: data }, {
			status: 200
		});
	}
	catch (error) {
		console.error("Une erreur est survenu lors du fetch de l'api getproduct :", error)
		return res.json({ success: false, type: 'error', message: 'Internal server error' }, {
			status: 500
		})
	}
}
