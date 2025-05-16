import { useSession, getSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";

export default function ProfilePage() {
  const { data: session, update } = useSession();

  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    if (session?.user) {
      setForm({
        name: session.user.name || "",
        email: session.user.email || "",
      });
    }
  }, [session]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/user/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
        credentials: "include",
      });

      if (!res.ok) throw new Error("Dështoi përditësimi");

      // Refresh the session to update the user's name in the UI
      await update();

      alert("Profili u përditësua me sukses!");
    } catch (err) {
      alert("Gabim gjatë përditësimit");
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/user/change-password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(passwordForm),
        credentials: "include",
      });

      if (!res.ok) throw new Error("Dështoi ndryshimi i fjalëkalimit");

      alert("Fjalëkalimi u përditësua me sukses!");
      setPasswordForm({ currentPassword: "", newPassword: "" });
    } catch (err) {
      alert("Gabim gjatë ndryshimit të fjalëkalimit");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md max-w-md w-full"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Profili im</h2>

        <div className="mb-4">
          <label className="block mb-1 text-sm">Emri</label>
          <input
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 text-sm">Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Përditëso
        </button>
      </form>

      <form
        onSubmit={handlePasswordSubmit}
        className="bg-white mt-10 p-8 rounded-xl shadow-md max-w-md w-full"
      >
        <h2 className="text-xl font-semibold mb-4 text-blue-700">Ndrysho Fjalëkalimin</h2>

        <div className="mb-4">
          <label className="block mb-1 text-sm">Fjalëkalimi Aktual</label>
          <input
            name="currentPassword"
            type="password"
            value={passwordForm.currentPassword}
            onChange={handlePasswordChange}
            className="w-full border px-4 py-2 rounded"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 text-sm">Fjalëkalimi i Ri</label>
          <input
            name="newPassword"
            type="password"
            value={passwordForm.newPassword}
            onChange={handlePasswordChange}
            className="w-full border px-4 py-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Ndrysho Fjalëkalimin
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

  return {
    props: { session },
  };
};
