import Image from "next/image"; 
import { motion } from "framer-motion";
import CustomImage from "@/assets/images/images.png";
import Button from "components/shared/Button";
import Card from "components/shared/Card";
import { BarChart, Rocket, ShieldCheck } from "lucide-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import { CircularProgress } from "@mui/material";
import CarCard from "components/shared/Card";

export interface Post {
  id: string;
  title: string;
  body: string;
}

export default function Home() {
  const { data: initialPosts, loading } = useFetch<Post[]>(
    "https://jsonplaceholder.typicode.com/posts"
  );

  const [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    if (initialPosts) {
      setPosts(initialPosts);
    }
  }, [initialPosts]);

  const router = useRouter();

  const handleClick = () => {
    alert("A dëshironi të rezervoni një veturë?");
    router.push("/contact");
  };

  const handleDelete = (id: string) => {
    if (posts) {
      setPosts(posts.filter((post) => post.id !== id));
    }
  };

  return (
    <div className="pt-14">
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <motion.section
          className="w-full py-20 bg-blue-300 text-gray-900 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl font-bold mb-4">Zgjidh RentWay për qira makinash!</h1>
          <p className="text-xl">
            Platformë moderne për rezervim të shpejtë dhe të sigurt të veturave
          </p>
          <Button
            text="Shiko Veturat"
            variant="secondary"
            onClick={() => router.push("/cars")}
          />
        </motion.section>

        <motion.section
          className="max-w-6xl py-20 px-6 text-center"
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-bold mb-6 text-blue-500">Rreth RentWay</h2>
          <p className="text-gray-700 mb-6">
            RentWay është platformë inovative për rezervimin online të veturave. Ofrojmë
            shërbime të shpejta, çmime konkurruese dhe siguri maksimale për klientët tanë.
          </p>
          <Image
            src={CustomImage}
            alt="Imazh Rreth RentWay"
            width={500}
            height={300}
            className="rounded-xl"
          />
        </motion.section>

        <motion.section
          className="w-full py-20 bg-gray-200 text-center"
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="container m-auto">
            <h2 className="text-4xl font-bold mb-6 text-blue-500">
              Pse të zgjedhësh RentWay?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <CarCard
                title="BMW X5 2021"
                image=""
                price="45€"
                fuel="Diesel"
                transmission="Automatik"
                mileage="95,000"
              />
              <CarCard
                title="Audi A4 2020"
                image=""
                price="38€"
                fuel="Benzinë"
                transmission="Manual"
                mileage="85,000"
              />

            <CarCard
              title="Volkswagen Golf 7"
              image=""
              price="30€"
              fuel="Diesel"
              transmission="Automatik"
              mileage="110,000"
            />
            </div>
          </div>
        </motion.section>

        <motion.section
          className="w-full py-20 bg-blue-300 text-gray-900 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-bold mb-6">Na Kontaktoni</h2>
          <p>Email: info@rentway.com</p>
          <p>Tel.: +383 44 000 000</p>
          <p>Adresa: Prishtinë, Kosovë</p>
          <Button text="Kontaktoni Tani" variant="secondary" onClick={handleClick} />
        </motion.section>
      </div>
    </div>
  );
}

Home.displayName = "RentWay | Ballina";
