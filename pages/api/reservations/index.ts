import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import dbConnect from "@/lib/mongodb";
import Reservation from "@/models/Reservation";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const session = await getServerSession(req, res, authOptions);
  if (!session || !session.user?.email) {
    return res.status(401).json({ message: "Jo i autorizuar" });
  }

  const { carId, startDate, endDate } = req.body;

  if (!carId || !startDate || !endDate) {
    return res.status(400).json({ message: "Të gjitha fushat janë të detyrueshme" });
  }

  try {
    await dbConnect();
    const newReservation = await Reservation.create({
      userEmail: session.user.email,
      car: carId,
      startDate,
      endDate,
    });

    return res.status(201).json(newReservation);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Gabim i brendshëm i serverit" });
  }
}