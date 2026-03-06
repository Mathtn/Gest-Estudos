import Image from "next/image";

export default function Hero() {
  return (
    <section className="w-full  bg-gradient-to-br from-green-600 to-blue-600 text-white py-20 pt-32  flex items-center">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 items-center gap-10">
        {/* Texto */}
        <div>
          <h1 className="text-5xl font-bold leading-tight mb-6">
            Gerencie seus Estudos <br /> com Eficiência
          </h1>

          <p className="text-lg text-blue-100 mb-8">
            Organize suas tarefas, cronogramas e metas acadêmicas em um único
            lugar.
          </p>

          <div className="flex gap-4">
            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition">
              Começar Agora
            </button>

            <button className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition">
              Saiba Mais
            </button>
          </div>
        </div>

        {/* Ilustração */}
        <div className="flex justify-center">
          <Image src="/HeroLogo.png" alt="Estudando" width={520} height={420} />
        </div>
      </div>
    </section>
  );
}
