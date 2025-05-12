import { motion } from "framer-motion";
import Image from "next/image";
import CustomImage from "@/assets/images/images.png";

export default function About() {
  return (
    <div className="pt-14">
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">

        {/* Introduction Section */}
        <motion.section
          className="w-full py-20 bg-blue-300 text-gray-900 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl font-bold mb-4">Rreth Nesh</h1>
          <p className="text-xl">
            Me RentWay, marrja me qira e veturave është më e lehtë, më e shpejtë dhe plotësisht e besueshme – gjithçka në një vend.
          </p>
        </motion.section>

        {/* Our Mission Section */}
        <motion.section
          className="max-w-6xl py-20 px-6 text-center"
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-bold mb-6 text-blue-500">Misioni Ynë</h2>
          <p className="text-gray-700 mb-6">
            Të ofrojmë shërbime të besueshme, të shpejta dhe të përballueshme për qira veturash, duke përdorur teknologjinë më të fundit për një përvojë të lehtë, të sigurt dhe transparente për çdo klient.
          </p>
        </motion.section>

        {/* Our Vision Section */}
        <motion.section
          className="w-full py-20 bg-gray-200 text-center"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold mb-6 text-blue-500">Vizioni Ynë</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md text-gray-800 dark:text-white">
                <p>
                  Të bëhemi platforma më e preferuar në rajon për qira veturash, duke ndërtuar besueshmëri, gamë të gjerë të automjeteve dhe përkushtim ndaj cilësisë së shërbimit.
                </p>
              </div>
              <div>
                <Image
                  src={CustomImage}
                  alt="Ekipi ynë"
                  width={500}
                  height={300}
                  className="rounded-xl"
                />
              </div>
            </div>
          </div>
        </motion.section>

        {/* Our Values Section */}
        <motion.section
          className="max-w-6xl py-20 px-6 text-center"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-bold mb-6 text-blue-500">Vlerat Tona</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md text-gray-800 dark:text-white">
              Besueshmëri & Siguri
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md text-gray-800 dark:text-white">
              Inovacion & Lehtësi
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md text-gray-800 dark:text-white">
              Përkushtim ndaj Klientit
            </div>
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          className="w-full py-20 bg-blue-300 text-gray-900 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-bold mb-6">Na Kontaktoni</h2>
          <p>Email: contact@mycompany.com</p>
          <p>Tel.: +383 000 000</p>
          <p>Adresa: Prishtinë, Kosovë</p>
        </motion.section>
      </div>
    </div>
  );
}

About.displayName = "About | RentWay";
