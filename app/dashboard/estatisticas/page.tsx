"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Estudo {
  id: number;
  dia: string;
  duracao_minutos: number;
  concluido: boolean;
}

export default function Estatisticas() {
  const [estudos, setEstudos] = useState<Estudo[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    fetch("/api/estudos")
      .then((res) => res.json())
      .then((dados) => {
        setEstudos(dados);
        setCarregando(false);
      });
  }, []);

  const concluidos = estudos.filter(e => e.concluido);
  const totalMinutos = concluidos.reduce((acc, curr) => acc + curr.duracao_minutos, 0);
  const totalHoras = (totalMinutos / 60).toFixed(1);
  const mediaDiaria = ((totalMinutos / 60) / 7).toFixed(1);

  if (carregando) return <p className="p-10 text-center text-gray-500">Organizando seus dados...</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-4xl mx-auto">
        
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Meu Desempenho 📈</h1>
            <p className="text-gray-500 text-sm">Acompanhe sua evolução e constância.</p>
          </div>
          <Link href="/dashboard" className="text-sm font-medium text-blue-600 hover:text-blue-800 bg-blue-50 px-4 py-2 rounded-lg transition-colors">
            ← Voltar ao início
          </Link>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Tempo Total</p>
            <div className="flex items-baseline gap-1 mt-2">
              <h2 className="text-3xl font-bold text-gray-800">{totalHoras}</h2>
              <span className="text-gray-500 font-medium">horas</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Média Diária</p>
            <div className="flex items-baseline gap-1 mt-2">
              <h2 className="text-3xl font-bold text-gray-800">{mediaDiaria}</h2>
              <span className="text-gray-500 font-medium">h/dia</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Concluídos</p>
            <div className="flex items-baseline gap-1 mt-2">
              <h2 className="text-3xl font-bold text-gray-800">{concluidos.length}</h2>
              <span className="text-gray-500 font-medium">tasks</span>
            </div>
          </div>
        </div>

        {/* FEEDBACK AMIGÁVEL */}
        <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm mb-8">
          <div className="flex items-start gap-4">
            <span className="text-2xl">💡</span>
            <div>
              <h3 className="font-bold text-gray-800">Insight para sua rotina</h3>
              <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                {parseFloat(mediaDiaria) > 0 
                  ? `Você já dedicou ${totalHoras} horas aos seus objetivos. Bom trabalho!`
                  : "Seus dados de progresso aparecerão aqui conforme você concluir seus primeiros estudos. Que tal começar um hoje?"}
              </p>
            </div>
          </div>
        </div>

        {/* ÚLTIMAS ATIVIDADES */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-50 bg-gray-50/50">
            <h3 className="text-sm font-bold text-gray-700">Atividades Recentes</h3>
          </div>
          <div className="divide-y divide-gray-50">
            {concluidos.length > 0 ? (
              concluidos.slice(-5).reverse().map((estudo) => (
                <div key={estudo.id} className="px-6 py-4 flex justify-between items-center hover:bg-gray-50/50 transition-colors">
                  <span className="text-sm font-medium text-gray-700">
                    {estudo.dia.split('-').reverse().join('/')}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-500">{estudo.duracao_minutos} min</span>
                    <span className="text-[10px] font-bold py-1 px-2 bg-green-50 text-green-600 rounded-md uppercase tracking-tight">
                      Finalizado
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="p-8 text-center text-sm text-gray-400 italic">Nenhum registro encontrado.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}