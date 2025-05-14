import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI nuk është e definuar në .env");
}

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(MONGODB_URI);
    isConnected = true;
    console.log("✅ MongoDB u lidh me sukses");
  } catch (error) {
    console.error("❌ Lidhja me MongoDB dështoi:", error);
    throw error;
  }
};

export default connectDB;