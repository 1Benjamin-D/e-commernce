import getProducts from "@/api/getProducts";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function GET(req: Request) {
    const apiKey = req.headers.get("api-key");

    if (!apiKey || typeof apiKey !== "string") {
        return NextResponse.json(
            { error: "API key is required." },
            { status: 401 }
        );
    }

    const apiKeyCorrect = await bcrypt.compare(process.env.API_KEY!, apiKey);

    if (!apiKeyCorrect) {
        return NextResponse.json({ error: "Forbidden." }, { status: 403 });
    }

    try {
        const categoryData = await getProducts();
        if (!categoryData) {
            return NextResponse.json(
                { error: "Aucune catégorie(s) trouvée(s)." },
                { status: 404 }
            );
        }
        return NextResponse.json(categoryData, { status: 200 });
    } catch (error: any) {
        return NextResponse.json(
            { error: "Server error.", details: error.message },
            { status: 500 }
        );
    }
}