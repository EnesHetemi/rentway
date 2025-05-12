import { motion } from "framer-motion";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="pt-14 bg-gray-100 min-h-screen flex flex-col items-center">
      {/* Seksioni Hyrës */}
      <motion.section
        className="w-full py-20 bg-blue-300 text-gray-900 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl font-bold mb-4">Na Kontaktoni</h1>
        <p className="text-xl max-w-2xl mx-auto">
          Keni pyetje rreth rezervimit të veturave? Jemi këtu për t’ju ndihmuar në çdo hap të procesit!
        </p>
      </motion.section>

      {/* Seksioni i Formularit të Kontaktit */}
      <motion.section
        className="w-full max-w-4xl px-6 py-20"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="bg-white p-10 rounded-2xl shadow-xl border border-gray-200">
          <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
            Formulari i Kontaktit të RentWay
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Fusha për emër */}
            <div>
              <label className="block text-gray-700 font-medium">Emri juaj</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full mt-2 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-300 focus:outline-none"
                placeholder="Shkruani emrin tuaj"
                required
              />
            </div>

            {/* Fusha për email */}
            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-2 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-300 focus:outline-none"
                placeholder="Shkruani email-in tuaj"
                required
              />
            </div>

            {/* Fusha për mesazh */}
            <div>
              <label className="block text-gray-700 font-medium">Mesazhi</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full mt-2 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-300 focus:outline-none"
                placeholder="Shkruani mesazhin tuaj"
                rows={5}
                required
              />
            </div>

            {/* Butoni për dërgim */}
            <div className="text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="mt-4 px-8 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
              >
                Dërgo Mesazhin
              </motion.button>
            </div>
          </form>
        </div>
      </motion.section>
    </div>
  );
}

Contact.displayName = "Na Kontaktoni | RentWay";