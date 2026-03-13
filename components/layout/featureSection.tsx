export default function FeaturesSection() {
  const features = [
    {
      icon: "📅",
      title: "Planejamento Inteligente",
      description: "Crie cronogramas personalizados para suas disciplinas.",
    },
    {
      icon: "✅",
      title: "Gestão de Tarefas",
      description: "Acompanhe e organize suas atividades com facilidade.",
    },
    {
      icon: "🎯",
      title: "Atinga Suas Metas",
      description: "Monitore seu progresso e alcance seus objetivos.",
    },
  ];

  const steps = [
    {
      icon: "📚",
      title: "1. Adicione Disciplinas",
      description: "Cadastre suas matérias de estudo.",
    },
    {
      icon: "📋",
      title: "2. Organize Suas Tarefas",
      description: "Gerencie prazos e atividades.",
    },
    {
      icon: "📈",
      title: "3. Acompanhe o Progresso",
      description: "Visualize seu desempenho.",
    },
  ];

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Cards principais */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-8 shadow-sm border border-gray-100
              hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center"
            >
              <div className="text-5xl mb-4 transition-transform group-hover:scale-110">
                {feature.icon}
              </div>

              <h3 className="text-xl font-semibold text-gray-800">
                {feature.title}
              </h3>

              <p className="text-gray-600 mt-3">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Como funciona */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-blue-900">Como Funciona</h2>
          <p className="text-gray-600 mt-2">Simples, rápido e eficaz!</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-8 shadow-sm border border-gray-100
              hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center"
            >
              <div className="text-5xl mb-4 transition-transform group-hover:scale-110">
                {step.icon}
              </div>

              <h3 className="text-lg font-semibold text-gray-800">
                {step.title}
              </h3>

              <p className="text-gray-600 mt-3">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
