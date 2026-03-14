import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";

export default function Funcionalidades() {
  const funcionalidades = [
    {
      icon: "📅",
      title: "Planejamento de Estudos",
      description:
        "Crie cronogramas personalizados para organizar suas disciplinas e horários de estudo.",
    },
    {
      icon: "✅",
      title: "Gestão de Tarefas",
      description:
        "Adicione atividades, defina prazos e acompanhe tudo de forma simples.",
    },
    {
      icon: "📈",
      title: "Acompanhamento de Progresso",
      description:
        "Visualize seu progresso e mantenha o controle sobre seu desempenho acadêmico.",
    },
    {
      icon: "🎯",
      title: "Definição de Metas",
      description:
        "Estabeleça metas de estudo e mantenha sua motivação ao longo do tempo.",
    },
    {
      icon: "⏰",
      title: "Controle de Tempo",
      description:
        "Gerencie o tempo dedicado a cada disciplina para melhorar sua produtividade.",
    },
    {
      icon: "📊",
      title: "Relatórios de Desempenho",
      description:
        "Analise seus hábitos de estudo e identifique oportunidades de melhoria.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Título */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-blue-900">
              Funcionalidades do GestEstudos
            </h1>

            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Tudo o que você precisa para organizar seus estudos.
            </p>
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {funcionalidades.map((item, index) => (
              <div
                key={index}
                className="group bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center"
              >
                <div className="text-5xl mb-4 transition-transform group-hover:scale-110">
                  {item.icon}
                </div>

                <h3 className="text-xl font-semibold text-gray-800">
                  {item.title}
                </h3>

                <p className="text-gray-600 mt-3">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
