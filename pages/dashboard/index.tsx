import { getSession, useSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import useFetch from "@/hooks/useFetch";
import { useRouter } from "next/router";

export interface Car {
  _id: string;
  title: string;
  brand: string;
  image: string;
  price: number;
  fuel: string;
  transmission: string;
  mileage: number;
}

export default function Dashboard() {
  const { data: session } = useSession();
  const { data: cars, loading } = useFetch<Car[]>("/api/cars");
  const router = useRouter();

  const handleReserveClick = (carId: string) => {
    if (!session) {
      router.push("/sign-in");
    } else {
      router.push(`/reserve/${carId}`);
    }
  };

  return (
    <div className="pt-24 px-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Dashboard - Veturat
      </h1>

      {loading ? (
        <p className="text-center">Duke u ngarkuar veturat...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cars?.map((car) => (
            <div key={car._id} className="bg-white p-4 rounded shadow text-center">
              <img
                src={car.image || "/placeholder.png"}
                alt={car.title}
                className="h-40 w-full object-cover rounded mb-2"
              />
              <h2 className="text-xl font-bold">{car.title}</h2>
              <p className="text-sm text-gray-600">{car.brand}</p>
              <p>{car.fuel} • {car.transmission}</p>
              <p>{car.mileage} km</p>
              <p className="text-blue-600 font-semibold">{car.price} €/ditë</p>

              <button
                onClick={() => handleReserveClick(car._id)}
                className="mt-3 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Rezervo Veturën
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};