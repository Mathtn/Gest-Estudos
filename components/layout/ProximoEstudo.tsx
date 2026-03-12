"use client";

import { useEffect, useState } from "react";

interface Estudo {
  id: number;
  materia: string;
  dia: string;
  hora: string;
}

export default function ProximoEstudo() {
  const [proximo, setProximo] = useState<Estudo | null>(null);

  useEffect(() => {
    async function carregarProximo() {
      try {
        const resposta = await fetch("/api/estudos");
        
        // Verificação de segurança: se a resposta não for OK ou estiver vazia
        if (!resposta.ok) {
          console.warn("Falha ao buscar estudos ou não autorizado");
          return;
        }

        const texto = await resposta.text();
        if (!texto) return; // Se o corpo da resposta estiver vazio, sai da função

        const estudos: Estudo[] = JSON.parse(texto);

        if (estudos && estudos.length > 0) {
          const agora = new Date();
          
          const futuros = estudos
            .map(e => ({
              ...e,
              dataCompleta: new Date(`${e.dia}T${e.hora}`)
            }))
            .filter(e => e.dataCompleta > agora)
            .sort((a, b) => a.dataCompleta.getTime() - b.dataCompleta.getTime());

          if (futuros.length > 0) {
            setProximo(futuros[0]);
          } else {
            setProximo(null);
          }
        }
      } catch (error) {
        console.error("Erro ao processar próximo estudo:", error);
      }
    }

    carregarProximo();
  }, []);

  if (!proximo) return null;

  return (
    <div className="bg-blue-600 text-white p-6 rounded-2xl shadow-lg mb-8 flex items-center justify-between">
      <div>
        <p className="text-blue-100 text-sm font-semibold uppercase tracking-wider">Próximo Estudo</p>
        <h2 className="text-2xl font-bold mt-1">{proximo.materia}</h2>
        <p className="text-blue-50 mt-1 opacity-90">
          📅 {proximo.dia.split('-').reverse().join('/')} às {proximo.hora}
        </p>
      </div>
      <div className="text-4xl">🚀</div>
    </div>
  );
}