import { useEffect, useState } from "react";

function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => setData(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [url]);


  const remove = async (deleteUrl: string) => {
    const res = await fetch(deleteUrl, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("Fshirja dështoi!");
    }

    return true;
  };

  return { data, loading, error, remove };
}

export default useFetch;