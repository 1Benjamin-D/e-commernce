import prisma from "@/libs/prismadb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let data = await prisma.utilisateur.findMany();
  console.log(data);

  return res.status(200).json({ success: true, data });
}