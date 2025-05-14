import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import { Car } from "../../admin";


export default function UpdateCar() {
  const router = useRouter();
  const { id } = router.query;

  // Kjo është pjesa që shton
  const { data: existingCar, loading } = useFetch<Car>(
    id ? `/api/cars/${id}` : ""
  );

  const [carData, setCarData] = useState({
    title: "",
    brand: "",
    image: "",
    price: 0,
    fuel: "",
    transmission: "",
    mileage: 0,
  });

  useEffect(() => {
    if (existingCar) {
      setCarData({
        title: existingCar.title,
        brand: existingCar.brand,
        image: existingCar.image,
        price: existingCar.price,
        fuel: existingCar.fuel,
        transmission: existingCar.transmission,
        mileage: existingCar.mileage,
      });
    }
  }, [existingCar]);

  const handleUpdate = async () => {
    if (!id) return;

    try {
      const res = await fetch(`/api/cars/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(carData),
      });

      if (!res.ok) throw new Error("Përditësimi dështoi!");
      alert("Veturë u përditësua me sukses!");
      router.push("/admin");
    } catch (error) {
      console.error("Gabim gjatë përditësimit:", error);
      alert("Gabim gjatë përditësimit të veturës!");
    }
  };

  if (!router.isReady || loading) return <p className="text-center mt-10">Duke u ngarkuar...</p>;

  const fields: { key: keyof typeof carData; label: string; type?: string }[] = [
    { key: "title", label: "Titulli" },
    { key: "brand", label: "Brandi" },
    { key: "image", label: "Linku i Imazhit" },
    { key: "price", label: "Çmimi", type: "number" },
    { key: "fuel", label: "Lloji i Karburantit" },
    { key: "transmission", label: "Transmisioni" },
    { key: "mileage", label: "Kilometrazha", type: "number" },
  ];

  return (
    <div className="pt-12 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">Përditëso Veturën</h2>

        {fields.map(({ key, label, type = "text" }) => (
          <div key={key} className="mb-4">
            <label className="block text-sm font-medium mb-1">{label}</label>
            <input
              type={type}
              value={carData[key]}
              onChange={(e) =>
                setCarData({
                  ...carData,
                  [key]: type === "number" ? +e.target.value : e.target.value,
                })
              }
              className="w-full px-4 py-2 border rounded placeholder-gray-400 text-black"
            />
          </div>
        ))}

        <button
          onClick={handleUpdate}
          className="w-full mt-4 bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 transition"
        >
          Përditëso Veturën
        </button>
      </div>
    </div>
  );
}

UpdateCar.displayName = "Update Car | RentWay";