import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    const { nome, email, senha } = await request.json();

    if (!nome || !email || !senha) {
      return NextResponse.json({ erro: "Dados incompletos" }, { status: 400 });
    }

    const { data: usuarioExistente } = await supabase
      .from("usuarios")
      .select("id")
      .eq("email", email)
      .single();

    if (usuarioExistente) {
      return NextResponse.json({ erro: "Este e-mail já está cadastrado" }, { status: 400 });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const { error } = await supabase
      .from("usuarios")
      .insert([
        { nome, email, senha: senhaHash }
      ]);

    if (error) throw error;

    return NextResponse.json({ mensagem: "Usuário criado com sucesso!" }, { status: 201 });

  } catch (error: any) {
    console.error("Erro no cadastro:", error.message);
    return NextResponse.json({ erro: "Erro ao criar conta no servidor" }, { status: 500 });
  }
}