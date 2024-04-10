import {NextApiRequest, NextApiResponse} from "next";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prismadb from "@/libs/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method !== "POST"){
        res.status(401).json({success: false, type: "error", message: "Method GET is not ALLOWED."})
        return;
    }
    let apiKey = req.headers['api-key']!.toString();
    if(apiKey){
        bcrypt.compare(apiKey, process.env.API_KEY!, function(err) {
            if(err){
                res.status(401).json({success: false, type: "error", message: "Forbidden."})
                return;
            }
        })
    }
    else{
        res.status(401).json({success: false, message: "Forbidden."})
        return;
    }
    const { token, productId, productQuantity } = JSON.parse(req.body);
    if (!token || !jwt.verify(token, process.env.JWT_SECRET!)) {
        res.status(401).json({success: false, type: "warning", message: "Vous devez être connecter pour ajouter un produit a votre panier."});
        return;
    }

    const decodedToken = jwt.decode(token);
    let userId: string | undefined;

    if (decodedToken && typeof decodedToken === 'object' && 'userId' in decodedToken) {
        userId = decodedToken['userId'];
    } else {
        res.status(401).json({success: false, type: "warning", message: "Vous devez être connecter pour ajouter un produit a votre panier."});
        return;
    }

    try {
        let userCart = await prismadb.cart.findFirst({
            where: {
                // @ts-ignore
                id_user: userId
            }
        });

        if (!userCart) {
            userCart = await prismadb.cart.create({
                data: {
                    // @ts-ignore
                    id_user: userId
                }
            })
        }

        const productExistInCart = await prismadb.id_prod_cart.findFirst({
            where: {
                id_prod: productId
            }
        })
        if (productExistInCart){
            let actualQuantity = parseInt(String(productExistInCart.product_quantity!))
            await prismadb.id_prod_cart.update({
                where: {
                    id: productExistInCart.id
                },
                data: {
                    product_quantity: actualQuantity + productQuantity
                }
            })
        }
        else{
            await prismadb.id_prod_cart.create({
                data: {
                    id_cart: userCart.id,
                    id_prod: productId,
                    product_quantity: productQuantity
                }
            })
        }
        return res.status(200).json({success: true, type: "success", message: "Produit ajouté au panier."});
    } catch (error) {
        console.error("Une erreur s'est produite :", error);
        res.status(500).json({success: false, message: "Internal Server Error."});
    }
}