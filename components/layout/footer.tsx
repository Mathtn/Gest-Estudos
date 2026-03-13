import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-3 gap-10">
        {/* Logo e descrição */}
        <div>
          <h2 className="text-2xl font-bold text-white">GestEstudos</h2>
          <p className="mt-4 text-sm text-gray-400 max-w-sm">
            Plataforma para organização de estudos, tarefas e metas acadêmicas.
            Aumente sua produtividade e mantenha seu aprendizado sempre em dia.
          </p>
        </div>

        {/* Navegação */}
        <div>
          <h3 className="text-white font-semibold mb-4">Navegação</h3>

          <ul className="space-y-3 text-sm">
            <li>
              <Link href="/" className="hover:text-white transition">
                Home
              </Link>
            </li>

            <li>
              <Link href="/login" className="hover:text-white transition">
                Login
              </Link>
            </li>

            <li>
              <Link href="/register" className="hover:text-white transition">
                Criar Conta
              </Link>
            </li>
          </ul>
        </div>

        {/* Contato */}
        <div>
          <h3 className="text-white font-semibold mb-4">Contato</h3>

          <ul className="space-y-3 text-sm text-gray-400">
            <li>Email: suporte@gestestudos.com</li>
            <li>Projeto acadêmico</li>
            <li>Brasil</li>
          </ul>
        </div>
      </div>

      {/* Linha inferior */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} GestEstudos — Todos os direitos
          reservados.
        </div>
      </div>
    </footer>
  );
}
