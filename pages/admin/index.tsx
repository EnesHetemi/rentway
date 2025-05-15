import { CircularProgress } from "@mui/material";
import { motion } from "framer-motion";
import useFetch from "@/hooks/useFetch";
import { useRouter } from "next/router";
import Link from "next/link";
import { getSession } from "next-auth/react";

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

export default function AdminPanel() {
  const router = useRouter();

  const {
    data: cars,
    loading,
    remove,
  } = useFetch<Car[]>("/api/cars");

  const handleDeleteCar = async (id: string) => {
    const confirmed = confirm("A jeni i sigurt që dëshironi ta fshini këtë veturë?");
    if (!confirmed) return;

    try {
      await remove(`/api/cars/${id}`);
      alert("Veturë u fshi me sukses!");
      router.reload();
    } catch (error) {
      alert("Gabim gjatë fshirjes së veturës!");
      console.error(error);
    }
  };

  return (
    <div className="pt-14 px-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold py-10 text-center text-blue-700">
        Paneli i Administratorit
      </h1>

      {loading ? (
        <div className="flex justify-center py-20">
          <CircularProgress />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cars && cars.length > 0 ? (
            cars.map((car) => (
              <motion.div
                key={car._id}
                className="bg-white rounded-xl shadow-md p-6 text-center"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <img
                  src={car.image}
                  alt={car.title}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h2 className="text-2xl font-bold text-blue-600">{car.title}</h2>
                <p className="text-gray-600">{car.brand}</p>
                <p className="text-gray-600">
                  {car.fuel} • {car.transmission}
                </p>
                <p className="text-gray-600">{car.mileage} km</p>
                <p className="text-gray-800 font-bold mb-4">
                  {car.price} €/ditë
                </p>

                <div className="flex justify-center gap-4">
                  <Link href={`/update/cars/${car._id}`}>
                    <button className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
                      Përditëso
                    </button>
                  </Link>

                  <button
                    onClick={() => handleDeleteCar(car._id)}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Fshij
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-3 text-center py-20">
              <p className="text-lg text-gray-700">Nuk ka vetura të regjistruara.</p>
            </div>
          )}
        </div>
      )}

      <div className="text-center mt-10">
        <Link href="/create/Cars">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700">
            Shto Veturë të Re
          </button>
        </Link>
      </div>
    </div>
  );
}

AdminPanel.displayName = "Admin Panel | RentWay";


export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  if (!session || session.user?.role !== "admin") {
    return {
      redirect: {
        destination: "/sign-in",
        permanent: false,
      },
    };
  }

  
}