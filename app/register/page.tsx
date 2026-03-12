"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);
  const router = useRouter();

  async function registrar(e: React.FormEvent) {
    e.preventDefault();
    setCarregando(true);

    try {
      const resposta = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha }),
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        alert(dados.erro || "Erro ao criar conta");
        return;
      }

      alert("Usuário criado com sucesso!");
      router.push("/login");
    } catch (error) {
      alert("Erro na conexão com o servidor.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-xl rounded-2xl flex w-full max-w-[800px] h-auto md:h-[600px] overflow-hidden flex-col md:flex-row relative">
        
        <Link 
          href="/" 
          className="absolute top-4 right-4 text-gray-300 hover:text-gray-500 transition-colors z-10"
          title="Voltar para o início"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </Link>

        <div className="md:w-1/2 bg-blue-400 flex items-center justify-center p-8">
          <Link href="/">
            <Image
              src="/GestEstudosLogo.png"
              alt="Logo"
              width={300}
              height={300}
              className="object-contain"
              priority
            />
          </Link>
        </div>

        <div className="md:w-1/2 p-10 flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Criar Conta</h1>

          <form onSubmit={registrar} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
            />

            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              className="border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
            />

            <button
              type="submit"
              disabled={carregando}
              className={`bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-md ${
                carregando ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {carregando ? "Criando..." : "Finalizar Cadastro"}
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-600 text-center">
            Já possui conta?{" "}
            <Link href="/login" className="text-blue-600 font-semibold hover:underline">
              Fazer login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}