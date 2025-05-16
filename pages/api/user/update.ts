import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session || !session.user?.email) {
    return res.status(401).json({ message: "Jo i autorizuar" });
  }

  const { name, email } = req.body;

  try {
    await dbConnect();

    const user = await User.findOneAndUpdate(
      { email: session.user.email },
      { name, email },
      { new: true }
    );

    res.status(200).json({ message: "Profili u përditësua", user });
  } catch (error) {
    console.error("Gabim gjatë përditësimit të profilit:", error);
    res.status(500).json({ message: "Gabim i brendshëm" });
  }
}