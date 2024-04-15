import { NextRequest, NextResponse } from "next/server";
import * as jwt from "jsonwebtoken"
import * as bcrypt from "bcryptjs"
import prisma from "@/libs/prismadb";

export async function POST(req: NextRequest) {
    try {
        const apiKey = req.headers.get('api-key');
        if (apiKey) {
            bcrypt.compare(apiKey, process.env.API_KEY!, function (err) {
                if (err) {
                    return new Response(JSON.stringify({ success: false, type: "error", message: "Forbidden." }), {
                        status: 401,
                    });
                }
            })
        }
        else {
            return new Response(JSON.stringify({ success: false, type: "error", message: "Forbidden." }), {
                status: 401,
            });
        }
        const { productId, token, productQuantity } = await req.json();
        if (!token || !jwt.verify(token, process.env.JWT_SECRET!)) {
            return new Response(JSON.stringify({ success: false, type: "warning", message: "Vous devez être connecter pour ajouter un produit a votre panier." }), {
                status: 401
            })
        }
        const decodedToken = jwt.decode(token);
        let userId: string | undefined

        if (decodedToken && typeof decodedToken === 'object' && 'userId' in decodedToken) {
            userId = decodedToken['userId']
        }
        else {
            return new Response(JSON.stringify({ success: false, type: "warning", message: "Vous devez être connecter pour ajouter un produit a votre panier." }), {
                status: 401
            })
        }
        try {
            let userCart = await prisma.cart.findFirst({
                where: {
                    // @ts-ignore
                    id_user: userId
                }
            });

            if (!userCart) {
                userCart = await prisma.cart.create({
                    data: {
                        // @ts-ignore
                        id_user: userId
                    }
                })
            }

            const productExistInCart = await prisma.id_prod_cart.findFirst({
                where: {
                    id_prod: productId
                }
            })
            if (productExistInCart) {
                let actualQuantity = parseInt(String(productExistInCart.product_quantity!))
                await prisma.id_prod_cart.update({
                    where: {
                        id: productExistInCart.id
                    },
                    data: {
                        product_quantity: actualQuantity + productQuantity
                    }
                })
            }
            else {
                await prisma.id_prod_cart.create({
                    data: {
                        id_cart: userCart.id,
                        id_prod: productId,
                        product_quantity: productQuantity
                    }
                })
            }
            return new Response(JSON.stringify({ success: true, type: "success", message: "Produit ajouté au panier." }), {
                status: 200
            })
        }
        catch (error) {
            console.error("Une erreur s'est produite :", error);
            return new Response(JSON.stringify({ success: false, message: "Internal Server Error." }), {
                status: 500,
            })
        }
    }
    catch (error) {
        console.error("Erreur lors du fetch de l'api addtocartbis :", error)
    }
}