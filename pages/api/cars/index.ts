import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/lib/mongodb";
import Car from "models/Car";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectDB();

  if (req.method === "GET") {
    const cars = await Car.find();
    return res.status(200).json(cars);
  }

  if (req.method === "POST") {
    try {
      const car = await Car.create(req.body);
      return res.status(201).json(car);
    } catch (err) {
      return res.status(400).json({ message: "Gabim në shtim!" });
    }
  }

  res.status(405).json({ message: "Metoda nuk lejohet" });
}