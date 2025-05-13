import { useForm } from "react-hook-form";

type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        alert("Mesazhi u dërgua me sukses!");
        reset();
      } else {
        alert("Dështoi dërgimi!");
      }
    } catch (error) {
      console.error(error);
      alert("Gabim gjatë dërgimit");
    }
  };

  return (
    <div className="pt-14 px-4 bg-gray-100 min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-xl shadow max-w-xl w-full space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-blue-600">
          Na Kontaktoni
        </h2>

        {/* Emri */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Emri
          </label>
          <input
            {...register("name", { required: "Emri është i detyrueshëm" })}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            placeholder="Shkruani emrin tuaj"
          />
          {errors.name?.message && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            {...register("email", {
              required: "Email-i është i detyrueshëm",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Email i pavlefshëm",
              },
            })}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            placeholder="Shkruani email-in tuaj"
          />
          {errors.email?.message && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Mesazhi */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Mesazhi
          </label>
          <textarea
            {...register("message", {
              required: "Mesazhi është i detyrueshëm",
            })}
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            placeholder="Shkruani mesazhin tuaj"
            rows={5}
          />
          {errors.message?.message && (
            <p className="text-red-500 text-sm">{errors.message.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Dërgo Mesazhin
        </button>
      </form>
    </div>
  );
}

Contact.displayName = "Contact | RentWay";