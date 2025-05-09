import Link from "next/link";
import Logo from "@/assets/icons/logo.svg";
import { Facebook, Twitter, Instagram, Mail } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-blue-300 via-white to-blue-300 py-10 text-gray-700">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <Link href="/" className="flex items-center gap-2 mb-4">
            <picture>
              <img src={Logo.src} alt="Logo" className="h-10 w-auto" />
            </picture>
            <span className="font-bold text-lg text-blue-800">RentWay</span>
          </Link>
          <p className="text-sm">
            RentWay ju ofron zgjidhje të shpejta dhe të sigurta për rezervimin e veturave online.
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Zyra</h3>
          <p className="text-sm">Rr. Prishtinë, Kosovë</p>
          <p className="text-sm">info@rentway.com</p>
          <p className="text-sm">+383 44 000 000</p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Linke</h3>
          <ul className="space-y-1 text-sm">
            <li><Link href="/">Ballina</Link></li>
            <li><Link href="/cars">Veturat</Link></li>
            <li><Link href="/about">Rreth Nesh</Link></li>
            <li><Link href="/contact">Kontakti</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Newsletter</h3>
          <div className="flex items-center border-b border-gray-400 py-2">
            <Mail className="w-5 h-5 text-gray-500 mr-2" />
            <input
              type="email"
              placeholder="Shkruaj email-in..."
              className="bg-transparent outline-none text-sm flex-1"
            />
            <button className="text-sm text-blue-600 font-semibold">Dërgo</button>
          </div>

          <div className="flex gap-4 mt-4">
            <Facebook className="w-5 h-5 text-gray-600 hover:text-blue-600 cursor-pointer" />
            <Twitter className="w-5 h-5 text-gray-600 hover:text-blue-400 cursor-pointer" />
            <Instagram className="w-5 h-5 text-gray-600 hover:text-pink-500 cursor-pointer" />
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-sm text-gray-500">
        © {year} RentWay – Të gjitha të drejtat e rezervuara.
      </div>
    </footer>
  );
}