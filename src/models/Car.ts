import mongoose, { Schema, Document, models, model } from "mongoose";

export interface ICar extends Document {
  title: string;
  brand: string;
  image: string;
  price: number;
  fuel: string;
  transmission: string;
  mileage: number;
}

const CarSchema = new Schema<ICar>({
  title: { type: String, required: true },
  brand: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  fuel: { type: String, required: true },
  transmission: { type: String, required: true },
  mileage: { type: Number, required: true },
});


const Car = models.Car || model<ICar>("Car", CarSchema);

export default Car;