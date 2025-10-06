"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/supabaseClient";

interface Usuario {
  id: string;
  email: string | null;
  nome: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: authData, error: authError } = await supabase.auth.getUser();

      if (authError || !authData.user) {
        router.push("/login");
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("name_user")
        .eq("id", authData.user.id)
        .single();

      setUsuario({
        id: authData.user.id,
        email: authData.user.email ?? null, 
        nome: profile?.name_user ?? authData.user.email ?? "Usuário",
      });

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

      <h1 className="text-red-600 text-4xl font-extrabold tracking-widest z-10">
        {`Bem-vindo, ${usuario?.nome}!`}
      </h1>

      <button
        className="mt-6 px-6 py-3 rounded-full bg-red-600 text-white font-bold shadow-4xl hover:bg-red-700 transition z-10"
        onClick={() => router.push("/garagem")}
      >
        Entrar na Garagem
      </button>
    </div>
  );
}
