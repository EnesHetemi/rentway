import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import dbConnect from "@/lib/mongodb";
import CarModel from "@/models/Car";
import mongoose from "mongoose";
import Image from "next/image";

interface CarDetailsProps {
  car: {
    _id: string;
    title: string;
    image: string;
    brand: string;
    price: string;
    fuel: string;
    transmission: string;
    mileage: string;
  };
}

export default function CarDetails({ car }: CarDetailsProps) {
  const router = useRouter();

  const { data: session } = useSession();
  
  const handleReserveClick = (carId: string) => {
    if (!session) {
      router.push("/sign-in");
    } else {
      router.push(`/reserve/${carId}`);
    }
  };

  return (
    <div className="min-h-screen px-6 pt-24 pb-16 bg-gray-100">
      <div className="max-w-6xl mx-auto bg-white shadow rounded-xl p-8 flex flex-col lg:flex-row gap-10">
        
        <div className="flex-1">
          <div className="relative w-full h-80 rounded overflow-hidden shadow">
            <Image
              src={
                car.image?.startsWith("/") || car.image?.startsWith("http")
                  ? car.image
                  : "/images/images.png"
              }
              alt={car.title}
              fill
              className="object-cover"
            />
          </div>
        </div>

        
        <div className="flex-1 space-y-4">
          <h2 className="text-3xl font-bold">{car.title}</h2>
          <p className="text-gray-500 text-sm">{car.brand}</p>

          <div className="text-2xl font-semibold text-blue-600">{car.price} € / ditë</div>

          <p className="text-gray-700 text-sm">
            Vetura {car.title} me {car.fuel}, {car.transmission}, ka përshkuar {car.mileage} km.
          </p>

          <div className="mt-4">
            <p className="text-sm font-medium mb-2 text-gray-700">Karakteristikat:</p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li><strong>Karburanti:</strong> {car.fuel}</li>
              <li><strong>Transmetimi:</strong> {car.transmission}</li>
              <li><strong>Kilometrazha:</strong> {car.mileage} km</li>
            </ul>
          </div>

          <div className="flex gap-4 mt-6">
            <button
                onClick={() => handleReserveClick(car._id)}
                className="mt-3 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Rezervo Veturën
              </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false,
      },
    };
  }

  const { id } = context.params as { id: string };

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return { notFound: true };
  }

  await dbConnect();
  const rawCar = await CarModel.findById(id).lean();

  if (!rawCar) return { notFound: true };

  const car = {
    _id: (rawCar as any)._id.toString(),
    title: (rawCar as any).title,
    brand: (rawCar as any).brand,
    image: (rawCar as any).image,
    price: (rawCar as any).price.toString(),
    fuel: (rawCar as any).fuel,
    transmission: (rawCar as any).transmission,
    mileage: (rawCar as any).mileage.toString(),
  };

  return {
    props: {
      car,
    },
  };
};

CarDetails.displayName = "Detajet e Vetures | RentWay";