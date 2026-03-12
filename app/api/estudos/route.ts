import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const usuarioId = cookieStore.get("usuario_id")?.value;

    if (!usuarioId) {
      return NextResponse.json({ erro: "Não autorizado" }, { status: 401 });
    }

    const { data: estudos, error } = await supabase
      .from("estudos")
      .select("*")
      .eq("usuario_id", usuarioId)
      .order("dia", { ascending: true });

    if (error) throw error;

    return NextResponse.json(estudos);
  } catch (error: any) {
    return NextResponse.json({ erro: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const usuarioId = cookieStore.get("usuario_id")?.value;

    if (!usuarioId) {
      return NextResponse.json({ erro: "Não autorizado" }, { status: 401 });
    }

    const { materia, dia, hora, descricao } = await request.json();

    const { data, error } = await supabase
      .from("estudos")
      .insert([
        { 
          materia, 
          dia, 
          hora, 
          descricao, 
          usuario_id: usuarioId 
        }
      ])
      .select();

    if (error) throw error;

    return NextResponse.json(data[0], { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ erro: error.message }, { status: 500 });
  }
}