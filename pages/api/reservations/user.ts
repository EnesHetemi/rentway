import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import dbConnect from "@/lib/mongodb";
import Reservation from "@/models/Reservation";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).end();

  const session = await getServerSession(req, res, authOptions);
  if (!session || !session.user?.email) {
    return res.status(401).json({ message: "Jo i autorizuar" });
  }

  try {
    await dbConnect();

    const reservations = await Reservation.find({ userEmail: session.user.email })
      .populate("car")
      .lean();

    return res.status(200).json(reservations);
  } catch (err) {
    console.error("Gabim:", err);
    return res.status(500).json({ message: "Gabim i brendshëm" });
  }
}
