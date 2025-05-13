import Link from "next/link";
import { useRouter } from "next/router";
import classNames from "classnames";
import { useState } from "react";
import Logo from "@/assets/icons/logo.svg";
import ThemeToggle from "components/ThemeToggle";

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
  { name: "Admin", path: "/admin" },
];

export default function Header() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm transition">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        
        <Link href="/" className="flex items-center gap-2">
          <img src={Logo.src} alt="Logo" className="h-10 w-auto" />
          <span className="text-xl font-bold text-gray-900 dark:text-white">RentWay</span>
        </Link>

        
        <nav className="hidden md:flex gap-8 items-center">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={classNames(
                "text-sm font-medium transition-all",
                router.pathname === item.path
                  ? "text-blue-600 dark:text-blue-400 underline"
                  : "text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
              )}
            >
              {item.name}
            </Link>
          ))}
          <ThemeToggle />
        </nav>

        
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-2xl p-2 focus:outline-none"
          >
            ☰
          </button>
        </div>
      </div>

      
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 px-4 pb-4 pt-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={classNames(
                "block py-2 text-sm font-medium transition",
                router.pathname === item.path
                  ? "text-blue-600 dark:text-blue-400 underline"
                  : "text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
              )}
              onClick={() => setMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}