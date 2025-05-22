import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function MyReservations() {
  const { data: session, status } = useSession();
  const [reservations, setReservations] = useState<any[]>([]);

  useEffect(() => {
    const fetchReservations = async () => {
      const res = await fetch("/api/reservations/user");
      const data = await res.json();
      setReservations(data);
    };

    if (status === "authenticated") {
      fetchReservations();
    }
  }, [status]);

  if (status === "loading") return <p className="text-center mt-20">Duke kontrolluar sesionin...</p>;
  if (status === "unauthenticated") return <p className="text-center mt-20 text-red-500">Ju duhet të kyçeni për të parë rezervimet.</p>;

  return (
    <div className="pt-24 px-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-blue-600 text-center">Rezervimet e Mia</h1>

      {reservations.length === 0 ? (
        <p className="text-center text-gray-700">Nuk keni bërë ende rezervime.</p>
      ) : (
        <div className="overflow-x-auto shadow rounded-lg bg-white">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Vetura</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Marka</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Prej</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Deri më</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reservations.map((r, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{r.car?.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{r.car?.brand}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{r.startDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{r.endDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
