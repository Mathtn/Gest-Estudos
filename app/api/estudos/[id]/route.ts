import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

type RouteParams = { params: Promise<{ id: string }> };

// DELETE: Excluir um estudo específico
export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const cookieStore = await cookies();
    const usuarioId = cookieStore.get("usuario_id")?.value;

    if (!usuarioId) {
      return NextResponse.json({ erro: "Não autorizado" }, { status: 401 });
    }

    const { error } = await supabase
      .from("estudos")
      .delete()
      .eq("id", id)
      .eq("usuario_id", usuarioId);

    if (error) throw error;

    return NextResponse.json({ sucesso: true });
  } catch (error: any) {
    console.error("Erro ao excluir:", error.message);
    return NextResponse.json({ erro: "Erro ao excluir estudo" }, { status: 500 });
  }
}

// PUT: Atualizar um estudo existente (Dinâmico)
export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    // Capturamos o corpo da requisição de forma dinâmica
    const dadosParaAtualizar = await request.json();
    
    const cookieStore = await cookies();
    const usuarioId = cookieStore.get("usuario_id")?.value;

    if (!usuarioId) {
      return NextResponse.json({ erro: "Não autorizado" }, { status: 401 });
    }

    // O .update(dadosParaAtualizar) vai atualizar apenas os campos que você enviar
    // Se enviar só { concluido: true }, ele só altera isso e mantém o resto.
    const { error } = await supabase
      .from("estudos")
      .update(dadosParaAtualizar)
      .eq("id", id)
      .eq("usuario_id", usuarioId);

    if (error) throw error;

    return NextResponse.json({ sucesso: true });
  } catch (error: any) {
    console.error("Erro ao atualizar:", error.message);
    return NextResponse.json({ erro: "Erro ao atualizar estudo" }, { status: 500 });
  }
}