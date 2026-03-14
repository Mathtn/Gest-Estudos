import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-green-600 via-teal-500 to-blue-600 text-white pt-28 pb-16">
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/20 blur-[120px] rounded-full"></div>

      <div className="relative max-w-7xl mx-auto px-6 grid md:grid-cols-2 items-center gap-12">
        {/* TEXTO */}
        <div>
          <span className="bg-white/20 backdrop-blur-md px-4 py-1 rounded-full text-sm">
            🚀 Plataforma de Organização de Estudos
          </span>

          <h1 className="mt-6 text-4xl md:text-6xl font-bold leading-tight">
            Gerencie seus Estudos
            <span className="block text-green-200">com Inteligência</span>
          </h1>

          <p className="mt-6 text-lg text-blue-100 max-w-lg">
            Organize tarefas, metas e cronogramas em um único lugar. Aumente sua
            produtividade e mantenha seus estudos sob controle.
          </p>

          {/* BOTÕES */}
          <div className="mt-8 flex gap-4 flex-wrap">
            <Link
              href="/register"
              className="bg-white text-blue-600 px-7 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition"
            >
              Começar Agora
            </Link>

            <Link
              href="/funcionalidades"
              className="border border-white px-7 py-3 rounded-xl hover:bg-white hover:text-blue-600 transition"
            >
              Ver Funcionalidades
            </Link>
          </div>
        </div>

        {/* IMAGEM */}
        <div className="hidden md:flex justify-center relative">
          <div className="absolute w-80 h-80 bg-green-400/30 blur-3xl rounded-full"></div>

          <Image
            src="/Hero.png"
            alt="Estudando"
            width={620}
            height={520}
            className="relative drop-shadow-2xl"
            priority
          />
        </div>
      </div>
    </section>
  );
}
