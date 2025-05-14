import { useEffect, useState } from "react";

function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) return;

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


  const put = async (updateUrl: string, body: Partial<T>) => {
    try {
      const res = await fetch(updateUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Dështoi përditësimi i të dhënave");

      return true;
    } catch (err: any) {
      console.error("Gabim në PUT:", err);
      return false;
    }
  };

  return { data, loading, error, remove, put };
}

export default useFetch;