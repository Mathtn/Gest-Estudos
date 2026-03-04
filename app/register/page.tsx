import Image from "next/image";
import Link from "next/link";

export default function register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-2xl flex w-[800px] h-[600px] overflow-hidden">
        {/* Lado da imagem */}
        <div className="w-1/2 bg-blue-400 flex items-center justify-center p-8">
          <Image
            src="/GestEstudosLogo.png"
            alt="Logo"
            width={300}
            height={300}
            className="object-contain"
          />
        </div>

        {/* Lado do formulário */}
        <div className="w-1/2 p-10 flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Criar Conta</h1>

          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Nome"
              className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <input
              type="email"
              placeholder="Email"
              className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <input
              type="password"
              placeholder="Senha"
              className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <button
              type="submit"
              className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
            >
              Criar Conta
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-600">
            Já possui conta?{" "}
            <Link
              href="/login"
              className="text-blue-400 font-semibold hover:underline"
            >
              Fazer login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
