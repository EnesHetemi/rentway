import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface Reservation {
  _id: string;
  userEmail: string;
  car?: {
    title: string;
    brand: string;
  };
  startDate: string;
  endDate: string;
}

export default function AdminReservations() {
  const { status } = useSession();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchReservations = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/admin/reservations");

        if (!res.ok) {
          const { message } = await res.json();
          throw new Error(message || "Gabim gjatë marrjes së rezervimeve");
        }

        const data = await res.json();

        if (Array.isArray(data)) {
          setReservations(data);
        } else {
          throw new Error("Përgjigjja nuk është në formatin e duhur.");
        }
      } catch (err: any) {
        setError(err.message || "Gabim i panjohur");
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated") {
      fetchReservations();
    }
  }, [status]);

  return (
    <div className="pt-24 px-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-blue-600 text-center">Të gjitha Rezervimet</h1>

      {loading && (
        <p className="text-center text-gray-600">Duke u ngarkuar rezervimet...</p>
      )}

      {error && (
        <p className="text-center text-red-500">Gabim: {error}</p>
      )}

      {!loading && !error && (
        <>
          {reservations.length === 0 ? (
            <p className="text-center text-gray-700">Nuk ka rezervime për të shfaqur.</p>
          ) : (
            <div className="overflow-x-auto shadow rounded-lg bg-white">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Email i Përdoruesit</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Vetura</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Marka</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Prej</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Deri më</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {reservations.map((r) => (
                    <tr key={r._id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{r.userEmail}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{r.car?.title || "—"}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{r.car?.brand || "—"}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{r.startDate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{r.endDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}