"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"; // Importado para navegação
import ProximoEstudo from "../../components/layout/ProximoEstudo";

interface Estudo {
  id: number;
  materia: string;
  dia: string;
  hora: string;
  descricao: string;
  concluido: boolean;     
  duracao_minutos: number; 
}

export default function Dashboard() {
  const [estudos, setEstudos] = useState<Estudo[]>([]);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [busca, setBusca] = useState("");
  const router = useRouter();

  const [materia, setMateria] = useState("");
  const [dia, setDia] = useState("");
  const [hora, setHora] = useState("");
  const [descricao, setDescricao] = useState("");
  const [duracao, setDuracao] = useState("60"); 

  const carregarEstudos = async () => {
    try {
      const response = await fetch("/api/estudos");
      if (response.ok) {
        const dados = await response.json();
        setEstudos(dados);
      }
    } catch (error) {
      console.error("Erro ao carregar estudos:", error);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarEstudos();
  }, []);

  const estudosFiltrados = estudos.filter(e => 
    e.materia.toLowerCase().includes(busca.toLowerCase()) ||
    e.descricao.toLowerCase().includes(busca.toLowerCase())
  );

  const toggleConcluido = async (id: number, statusAtual: boolean) => {
    try {
      const response = await fetch(`/api/estudos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ concluido: !statusAtual }),
      });

      if (response.ok) {
        setEstudos(prev => prev.map(e => e.id === id ? { ...e, concluido: !statusAtual } : e));
      }
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
    }
  };

  async function logout() {
    const response = await fetch("/api/logout", { method: "POST" });
    if (response.ok) {
      router.push("/login");
      router.refresh();
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setCarregando(true); 

    const novoEstudo = { 
      materia, 
      dia, 
      hora, 
      descricao, 
      duracao_minutos: parseInt(duracao),
      concluido: false 
    };

    try {
      const response = await fetch("/api/estudos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(novoEstudo),
      });

      if (response.ok) {
        setMateria(""); setDia(""); setHora(""); setDescricao(""); setDuracao("60");
        setMostrarForm(false);
        await carregarEstudos(); 
      } else {
        alert("Erro ao salvar estudo.");
      }
    } catch (error) {
      alert("Erro na conexão com o servidor.");
    } finally {
      setCarregando(false);
    }
  }

  async function excluirEstudo(id: number) {
    if (!confirm("Tem certeza que deseja excluir este plano de estudo?")) return;
    const backupEstudos = [...estudos]; 
    setEstudos(estudos.filter(e => e.id !== id)); 

    try {
      const response = await fetch(`/api/estudos/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Erro na exclusão");
    } catch (error) {
      alert("Erro ao excluir. Restaurando...");
      setEstudos(backupEstudos);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        
        {/* HEADER */}
        <header className="flex justify-between items-center border-b-2 border-gray-200 pb-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">📚 Meus Estudos</h1>
            <p className="text-gray-500 text-sm">Organize sua rotina de aprendizado</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setMostrarForm(!mostrarForm)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all shadow-sm ${
                mostrarForm ? "bg-gray-200 text-gray-700 hover:bg-gray-300" : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {mostrarForm ? "Cancelar" : "Novo Estudo"}
            </button>
            <button onClick={logout} className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-red-50 transition-all shadow-sm">
              Sair
            </button>
          </div>
        </header>

        {/* FORMULÁRIO */}
        {mostrarForm && (
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl border border-blue-200 shadow-lg mb-10">
            <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">O que vamos aprender? ✍️</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Título da Matéria</label>
                <input type="text" required className="w-full p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                  value={materia} onChange={e => setMateria(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Data</label>
                <input type="date" required className="w-full p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                  value={dia} onChange={e => setDia(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Horário</label>
                <input type="time" required className="w-full p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                  value={hora} onChange={e => setHora(e.target.value)} />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Duração Estimada</label>
                <select 
                  className="w-full p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                  value={duracao} onChange={e => setDuracao(e.target.value)}
                >
                  <option value="30">30 minutos</option>
                  <option value="60">1 hora</option>
                  <option value="90">1 hora e 30 minutos</option>
                  <option value="120">2 horas</option>
                  <option value="180">3 horas</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                <textarea rows={2} className="w-full p-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
                  value={descricao} onChange={e => setDescricao(e.target.value)} />
              </div>
              <button type="submit" disabled={carregando} className="sm:col-span-2 bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-md disabled:opacity-50">
                {carregando ? "Salvando..." : "Salvar Plano de Estudo"}
              </button>
            </div>
          </form>
        )}

        <section className="mb-6">
          <ProximoEstudo />
          
          {/* LINK PARA ESTATÍSTICAS - ADICIONADO AQUI */}
          <div className="mt-4 flex justify-end">
            <Link 
              href="/dashboard/estatisticas" 
              className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100 shadow-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Ver meu desempenho
            </Link>
          </div>
        </section>

        {/* BUSCA */}
        <div className="relative mb-6">
          <input type="text" placeholder="Buscar por matéria ou descrição..." className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            value={busca} onChange={(e) => setBusca(e.target.value)} />
        </div>

        {/* LISTA DE ESTUDOS */}
        <div className="grid gap-4 pb-10">
          {carregando && estudos.length === 0 ? (
            <p className="text-center text-gray-400 py-10">Carregando seus estudos...</p>
          ) : estudosFiltrados.map((e) => (
            <div key={e.id} className={`bg-white p-5 rounded-xl border transition-all ${e.concluido ? 'border-green-200 bg-green-50/30' : 'border-gray-200 shadow-sm'}`}>
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <strong className={`text-lg font-bold uppercase ${e.concluido ? 'text-green-700 line-through' : 'text-gray-900'}`}>
                      {e.materia}
                    </strong>
                    {e.concluido && <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">FEITO</span>}
                  </div>
                  <p className={`text-sm ${e.concluido ? 'text-green-600/70' : 'text-gray-600'}`}>{e.descricao}</p>
                </div>

                <div className="flex flex-col items-end gap-3">
                  <div className="flex items-center text-[11px] text-gray-500 font-mono bg-white px-2 py-1 rounded border border-gray-100 whitespace-nowrap">
                    {e.dia.split('-').reverse().join('/')} | {e.hora} | {e.duracao_minutos}min
                  </div>
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={() => toggleConcluido(e.id, e.concluido)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                        e.concluido 
                        ? 'bg-green-500 text-white border-green-600' 
                        : 'bg-white text-gray-600 border-gray-300 hover:border-green-500 hover:text-green-600'
                      }`}
                    >
                      {e.concluido ? "✓ Concluído" : "Concluir"}
                    </button>
                    <button onClick={() => excluirEstudo(e.id)} className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg border border-transparent hover:border-red-100">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}