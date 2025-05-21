import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import dbConnect from "@/lib/mongodb";
import CarModel from "@/models/Car";
import { useRouter } from "next/router";
import { useState } from "react";

export default function ReservePage({ car }: any) {
  const router = useRouter();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleReserve = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!startDate || !endDate) return alert("Plotësoni të dy datat");

    const res = await fetch("/api/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ carId: car._id, startDate, endDate }),
    });

    if (res.ok) {
      alert("Rezervimi u krye me sukses!");
      router.push("/dashboard");
    } else {
      alert("Gabim gjatë rezervimit");
    }
  };

  return (
    <div className="min-h-screen pt-20 px-4">
      <h1 className="text-2xl font-bold mb-4 text-blue-600">Rezervo {car.title}</h1>

      <form onSubmit={handleReserve} className="bg-white p-6 rounded shadow max-w-md">
        <p className="mb-2">Marka: {car.brand}</p>
        <p className="mb-4">Çmimi: {car.price} €/ditë</p>

        <label className="block mb-2 font-medium">Data e Fillimit</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          required
        />

        <label className="block mb-2 font-medium">Data e Mbarimit</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Konfirmo Rezervimin
        </button>
      </form>
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

  await dbConnect();
  const car = await CarModel.findById(context.params?.id).lean();
  if (!car) {
    return { notFound: true };
  }

  return {
    props: {
      car: JSON.parse(JSON.stringify(car)),
    },
  };
};
