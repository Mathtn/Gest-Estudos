import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="mt-6">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/HomeLogo.png"
              width={280}
              height={140}
              alt="Logo GestEstudos"
              className="object-contain"
            />
          </Link>
        </div>
        {/* Menu Desktop */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/login"
            className="text-gray-700 font-medium hover:text-green-600 transition"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="px-5 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700 transition shadow-md"
          >
            Criar Conta
          </Link>
        </div>
      </div>
    </nav>
  );
}
