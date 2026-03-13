import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        
        <div className="flex-shrink-0">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/HomeLogo.png"
              width={200} // Reduzi um pouco o padrão para caber melhor
              height={100}
              alt="Logo GestEstudos"
              className="object-contain w-[150px] md:w-[280px]" // No celular fica com 150px, no PC 280px
            />
          </Link>
        </div>

        <div className="flex items-center gap-3 md:gap-6">
          <Link
            href="/login"
            className="text-gray-700 text-sm md:text-base font-medium hover:text-green-600 transition"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="px-3 py-1.5 md:px-5 md:py-2 text-sm md:text-base rounded-xl bg-green-600 text-white hover:bg-green-700 transition shadow-md whitespace-nowrap"
          >
            Criar Conta
          </Link>
        </div>
        
      </div>
    </nav>
  );
}