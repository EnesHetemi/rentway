import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import dbConnect from "@/lib/mongodb";
import Reservation from "@/models/Reservation";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session || session.user?.role !== "admin") {
    return res.status(403).json({ message: "Qasje e ndaluar" });
  }

  await dbConnect();

  const { userEmail } = req.query;
  const filter = userEmail ? { userEmail } : {};

  try {
    const reservations = await Reservation.find(filter)
      .populate("car")
      .lean();

    return res.status(200).json(reservations);
  } catch (err) {
    console.error("Gabim:", err);
    return res.status(500).json({ message: "Gabim i brendshëm i serverit" });
  }
}