import prisma from "@/libs/prismadb";
import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const res = NextResponse
    try {
        const apiKey = req.headers.get('api-key')
        let compare = bcrypt.compare(process.env.NEXT_PUBLIC_API_KEY!, apiKey!);
        if (!compare) {
            return res.json({}, {
                status: 401
            })
        }
        const { id, user_token } = await req.json();
        const { userId } = jwt.decode(user_token!);
        if (!userId) {
            return res.json({}, {
                status: 401
            })
        }
        const userCartId = await prisma.cart.findMany({
            where: {
                id_user: userId
            },
            select: {
                id: true
            }
        })
        const deleteResult = await prisma.id_prod_cart.delete({
            where: {
                id_cart: userCartId.id,
                id: id
            },
        });

        if (!deleteResult) {
            return res.json({ success: false, message: "Article non trouvé dans le panier" }, {
                status: 404
            });
        }

        return res.json({ success: true, message: 'Article supprimé du panier', data: deleteResult }, {
            status: 200
        });
    }
    catch (error) {
        console.error(error);
        return res.json({ success: false, message: "Erreur lors de la suppression de l'article" }, {
            status: 500
        });
    }
}