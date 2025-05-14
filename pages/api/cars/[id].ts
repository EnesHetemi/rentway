import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import Car from "@/models/Car";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const car = await Car.findById(id);
      if (!car) return res.status(404).json({ message: "Veturë nuk u gjet" });
      return res.status(200).json(car);
    } catch (error) {
      return res.status(500).json({ message: "Gabim gjatë marrjes së veturës", error });
    }
  }

  if (req.method === "PUT") {
    try {
      const updatedCar = await Car.findByIdAndUpdate(id, req.body, { new: true });
      return res.status(200).json(updatedCar);
    } catch (error) {
      return res.status(400).json({ message: "Gabim gjatë përditësimit", error });
    }
  }

  if (req.method === "DELETE") {
    try {
      await Car.findByIdAndDelete(id);
      return res.status(200).json({ message: "Fshirë me sukses" });
    } catch (error) {
      return res.status(400).json({ message: "Gabim gjatë fshirjes", error });
    }
  }

  return res.status(405).json({ message: "Metoda nuk lejohet" });
}