import { useState } from "react";
import { useRouter } from "next/router";

export default function CreateCar() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    brand: "",
    image: "",
    price: 0,
    fuel: "",
    transmission: "",
    mileage: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/cars", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Vetura u shtua me sukses!");
        router.push("/admin");
      } else {
        alert("Shtimi dështoi!");
      }
    } catch (err) {
      console.error("Gabim:", err);
      alert("Gabim gjatë shtimit!");
    }
  };

  return (
    <div className="pt-14 px-4 min-h-screen bg-gray-100 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-2xl space-y-4"
      >
        <h1 className="text-2xl font-bold text-center text-blue-600">Shto Veturë</h1>

        {[
          { name: "title", label: "Titulli" },
          { name: "brand", label: "Brandi" },
          { name: "image", label: "URL e Imazhit" },
          { name: "price", label: "Çmimi", type: "number" },
          { name: "fuel", label: "Lloji i Karburantit" },
          { name: "transmission", label: "Transmisioni" },
          { name: "mileage", label: "Kilometra", type: "number" },
        ].map(({ name, label, type = "text" }) => (
          <div key={name}>
            <label className="block text-sm font-medium mb-1">{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name as keyof typeof formData]}
              onChange={handleChange}
              required
              className="w-full border rounded p-2"
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Shto Veturë
        </button>
      </form>
    </div>
  );
}
