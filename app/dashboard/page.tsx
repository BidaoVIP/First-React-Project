"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/supabaseClient";

interface Usuario {
  id: string;
  email: string | null;
  nome?: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        router.push("/login");
        return;
      }

      const user: Usuario = {
        id: data.user.id,
        email: data.user.email || null,
        nome: data.user.user_metadata?.name || data.user.email || "Usuário",
      };

      setUsuario(user);
      setLoading(false);
    };

    fetchUser();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-2xl">
        Carregando...
      </div>
    );
  }


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-700 to-black relative">
      <div className="absolute inset-0 bg-[url('/carro-bg.jpg')] bg-cover bg-center"></div>

      <h1 className="text-red-600 text-4xl font-extrabold tracking-widest">
        {usuario ? `Bem-vindo, ${usuario.nome}!` : "Carregando..."}
      </h1>

      <button className="mt-6 px-6 py-3 rounded-full bg-red-600 text-white font-bold shadow-4xl hover:bg-red-700 transition">
        {/* onClick={() => router.push("/garagem")} */}
        Entrar na Garagem
      </button>
    </div>

  );
}
