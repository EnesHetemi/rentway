import { getServerSession } from "next-auth/next";
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

  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: "Të dy fushat janë të detyrueshme" });
  }

  await dbConnect();

  try {
    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return res.status(404).json({ message: "Përdoruesi nuk u gjet" });
    }

    if (user.password !== currentPassword) {
      return res.status(400).json({ message: "Fjalëkalimi aktual është i pasaktë" });
    }

    user.password = newPassword;
    await user.save();

    return res.status(200).json({ message: "Fjalëkalimi u përditësua me sukses" });
  } catch (error) {
    console.error("Gabim gjatë përditësimit të fjalëkalimit:", error);
    return res.status(500).json({ message: "Gabim i brendshëm i serverit" });
  }
}