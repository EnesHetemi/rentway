import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Të gjitha fushat janë të detyrueshme" });
  }

  try {
    await dbConnect();

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Përdoruesi ekziston" });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: "user",
    });

    return res.status(201).json({ message: "Përdoruesi u regjistrua me sukses", user });
  } catch (err) {
    console.error("Gabim gjatë regjistrimit:", err);
    return res.status(500).json({ message: "Gabim i brendshëm" });
  }
}