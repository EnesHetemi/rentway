import { LucideIcon, Fuel, GaugeCircle, CarFront } from "lucide-react";
import Image from "next/image";

interface CarCardProps {
  title: string;
  image: string;
  price: string | number;
  fuel: string;
  transmission: string;
  mileage: string | number;
  onClick?: () => void;
}

export default function CarCard({
  title,
  image,
  price,
  fuel,
  transmission,
  mileage,
  onClick,
}: CarCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-xl transition cursor-pointer overflow-hidden border">
      
      <div className="relative h-48 w-full">
        {image && (image.startsWith("/") || image.startsWith("http")) && (
         <Image
           src={image}
           alt={title}
           fill
           className="object-cover"
         />
        )}
      </div>

      
      <div className="p-4 space-y-3">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>

        <div className="flex justify-between text-sm text-gray-500">
          <span className="flex items-center gap-1"><Fuel className="w-4 h-4" /> {fuel}</span>
          <span className="flex items-center gap-1"><GaugeCircle className="w-4 h-4" /> {mileage} km</span>
          <span className="flex items-center gap-1"><CarFront className="w-4 h-4" /> {transmission}</span>
        </div>

        <div className="flex justify-between items-center pt-3">
          <span className="text-lg font-bold text-blue-600">{price}/ditë</span>
          <button
            onClick={onClick}
            className="bg-blue-500 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Rezervo
          </button>
        </div>
      </div>
    </div>
  );
}