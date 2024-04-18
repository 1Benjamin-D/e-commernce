import { NextRequest, NextResponse } from "next/server";
import * as bcrypt from 'bcryptjs'
import * as jwt from 'jsonwebtoken'
import prisma from "@/libs/prismadb";

export async function GET(req: NextRequest) {
    const res = NextResponse
    try {
        const { searchParams } = new URL(req.url)
        const apiKey = searchParams.get('apiKey');
        let compare = bcrypt.compare(process.env.NEXT_PUBLIC_API_KEY!, apiKey!);
        if (!compare) {
            return res.json({}, {
                status: 401
            })
        }
        const user_token = searchParams.get('user_token');

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
        let cartItems = await prisma.cart.findMany({
            where: { id_user: userId },
            include: {
                id_prod_cart: {
                    where: {
                        id_cart: userCartId.id,
                    },
                    include: {
                        Product: true,
                    },
                },
            },
        });
        if (!cartItems) {
            cartItems = await prisma.cart.create({
                data: {
                    id_user: userId
                }
            })
        }
        return res.json({ success: true, data: cartItems }, {
            status: 200
        });
    }
    catch (error) {
        console.error(error);
        return res.json({ success: false, message: "Erreur lors de la récupération du panier de l'utilisateur" }, {
            status: 500
        });
    }
}