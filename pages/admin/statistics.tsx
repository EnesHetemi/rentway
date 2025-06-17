import { GetServerSideProps } from "next";
import dbConnect from "@/lib/mongodb";
import ReservationModel from "@/models/Reservation";
import CarModel from "@/models/Car";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface StatisticsProps {
  reservationsByMonth: { month: string; count: number }[];
  mostReservedCar: string;
}

export default function Statistics({ reservationsByMonth, mostReservedCar }: StatisticsProps) {
  const chartData = {
    labels: reservationsByMonth.map((r) => r.month),
    datasets: [
      {
        label: "Numri i Rezervimeve",
        data: reservationsByMonth.map((r) => r.count),
        backgroundColor: "#3B82F6",
      },
    ],
  };

  return (
    <div className="min-h-screen p-10 bg-gray-100">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Statistika të Rezervimeve</h1>

        <div className="bg-white p-6 rounded-xl shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">Vetura më e rezervuar</h2>
          <p className="text-blue-600 text-lg font-medium">{mostReservedCar}</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Rezervimet sipas muajve</h2>
          <Bar data={chartData} />
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  await dbConnect();

  const reservations = await ReservationModel.find({}, { createdAt: 1, carId: 1 }).lean();

  const months = [
    "Janar",
    "Shkurt",
    "Mars",
    "Prill",
    "Maj",
    "Qershor",
    "Korrik",
    "Gusht",
    "Shtator",
    "Tetor",
    "Nentor",
    "Dhjetor",
  ];

  const reservationsByMonth = Array(12).fill(0);

  reservations.forEach((r) => {
    const monthIndex = new Date(r.createdAt as string).getMonth();
    reservationsByMonth[monthIndex]++;
  });

  const reservationsData = reservationsByMonth.map((count, index) => ({
    month: months[index],
    count,
  }));

  const carCounts: Record<string, number> = {};
  reservations.forEach((r) => {
    const carId = r.carId?.toString();
    if (carId) {
      carCounts[carId] = (carCounts[carId] || 0) + 1;
    }
  });

  const topCarId = Object.entries(carCounts).sort((a, b) => b[1] - a[1])[0]?.[0];

  let mostReservedCar = "Nuk ka të dhëna";
  if (topCarId && typeof topCarId === "string") {
    const car = await CarModel.findById(topCarId).lean();
    if (car && typeof car === "object" && "title" in car) {
      mostReservedCar = (car as any).title;
    }
  }

  return {
    props: {
      reservationsByMonth: reservationsData,
      mostReservedCar,
    },
  };
};
