import Link from "next/link";
import { useRouter } from "next/router";
import classNames from "classnames";
import { useState } from "react";
import Logo from "@/assets/icons/logo.svg";
import ThemeToggle from "components/ThemeToggle";
import { useSession, signOut } from "next-auth/react";

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export default function Header() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session, status } = useSession();

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

          <div className="flex gap-3 items-center">
            {status === "authenticated" ? (
              <div className="relative group">
                <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-600">
                  {session?.user?.name || "Profili"}
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-lg hidden group-hover:block z-50">
                  <button
                    onClick={() => router.push("/profile/profile")}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm text-gray-900 dark:text-white"
                  >
                    Përditëso Profilin
                  </button>
                  <button
                    onClick={() => signOut({ callbackUrl: "/sign-in" })}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
                  >
                    Dil
                  </button>
                </div>
              </div>
            ) : (
              <>
                <button
                  onClick={() => router.push("/sign-up")}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Regjistrohu
                </button>
                <button
                  onClick={() => router.push("/sign-in")}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                  Kyçu
                </button>
              </>
            )}
          </div>
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
        <div className="md:hidden bg-white dark:bg-gray-900 px-4 pb-4 pt-2 space-y-2">
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

          <div className="pt-4 border-t border-gray-300 dark:border-gray-700">
            {status === "authenticated" ? (
              <div className="space-y-2">
                <button
                  onClick={() => {
                    router.push("/profile/profile");
                    setMenuOpen(false);
                  }}
                  className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {session?.user?.name || "Profili"}
                </button>
                <button
                  onClick={() => {
                    signOut({ callbackUrl: "/sign-in" });
                    setMenuOpen(false);
                  }}
                  className="w-full py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Dil
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <button
                  onClick={() => {
                    router.push("/sign-up");
                    setMenuOpen(false);
                  }}
                  className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Regjistrohu
                </button>
                <button
                  onClick={() => {
                    router.push("/sign-in");
                    setMenuOpen(false);
                  }}
                  className="w-full py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                  Kyçu
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
