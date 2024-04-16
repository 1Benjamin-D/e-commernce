import {NextApiRequest, NextApiResponse} from "next";
import bcrypt from "bcryptjs";
import prismadb from "@/libs/prismadb";

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if(req.method !== "POST"){
        res.status(400).json({success: false, message: "Invalid Method."})
        return;
    }
    if(req.headers['api-key']){
        bcrypt.compare(process.env.API_KEY!, req.headers['api-key'] as string, function (err, success) {
            if (err){
                res.status(400).json({success: false, message: "Forbidden."})
            }
        });
    }
    else{
        res.status(400).json({success: false, message: "Forbidden."})
        return;
    }
    const productId = parseInt(JSON.parse(req.body).productId);
    if(productId){
        const product = await prismadb.product.findFirst({
            where: {
                id: productId
            }
        })
        if (product){
            res.status(200).json({success: true, message: "", data: product})
            return;
        }
        else{
            res.status(404).json({success: false, message: "Product not found."})
        }
    }
    else{
        res.status(404).json({success: false, message: "Product id is missing."})
        return;
    }
}