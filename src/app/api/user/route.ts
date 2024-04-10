import { NextRequest, NextResponse } from "next/server";
import getUserByName from "../getUserByName";
import prisma from "@/libs/prismadb";

export async function GET(request: NextRequest) {
  const user = await getUserByName(request)!;
  return NextResponse.json(user);
}

export async function PUT(request: NextRequest) {

  console.log("Données reçues:", await request.json());

  const data = await request.json();
  const { id, name } = data;

  if (typeof id !== "number" || typeof name !== "string") {
    console.log("Erreur de validation:", { id, name }); 
    return new Response(JSON.stringify({ error: "Invalid request data" }), {
      status: 400,
    });
  }

  try {
    console.log("Mise à jour de l'utilisateur:", { id, name }); 

    const updateUser = await prisma.utilisateur.update({
      where: {
        id: id,
      },
      data: {
        name: name,
      },
    });

    console.log("Utilisateur mis à jour avec succès:", updateUser);

    return NextResponse.json(updateUser);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur:", error);

    return new Response(JSON.stringify({ error: "User update failed" }), {
      status: 500,
    });
  }
}
