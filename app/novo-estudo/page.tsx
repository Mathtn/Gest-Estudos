"use client";

import { useState } from "react";
import { salvarEstudo } from "../../lib/storage";

export default function NovoEstudo() {

  const [materia, setMateria] = useState("");
  const [dia, setDia] = useState("");
  const [hora, setHora] = useState("");
  const [descricao, setDescricao] = useState("");

  function salvar(e:any) {
    e.preventDefault();

    salvarEstudo({
      materia,
      dia,
      hora,
      descricao
    });

    alert("Estudo salvo!");
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Novo Estudo</h1>

      <form onSubmit={salvar}>

        <input
          placeholder="Matéria"
          onChange={(e)=>setMateria(e.target.value)}
        />

        <br/>

        <input
          placeholder="Dia da semana"
          onChange={(e)=>setDia(e.target.value)}
        />

        <br/>

        <input
          type="time"
          onChange={(e)=>setHora(e.target.value)}
        />

        <br/>

        <textarea
          placeholder="Descrição"
          onChange={(e)=>setDescricao(e.target.value)}
        />

        <br/>

        <button type="submit">
          Salvar estudo
        </button>

      </form>
    </div>
  );
}