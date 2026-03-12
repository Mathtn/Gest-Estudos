import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const { email, senha } = await request.json();

    const { data: usuario, error } = await supabase
      .from("usuarios")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !usuario) {
      return NextResponse.json({ erro: "Usuário não encontrado" }, { status: 401 });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return NextResponse.json({ erro: "Senha incorreta" }, { status: 401 });
    }

    const cookieStore = await cookies();
    
    cookieStore.set("usuario_email", usuario.email, { path: "/" });
    cookieStore.set("usuario_id", usuario.id, { path: "/" });

    return NextResponse.json({ mensagem: "Login realizado com sucesso!" });

  } catch (error: any) {
    console.error("Erro no login:", error.message);
    return NextResponse.json({ erro: "Erro interno no servidor" }, { status: 500 });
  }
}