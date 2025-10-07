"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
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
        .select("user_name")
        .eq("id", authData.user.id)
        .single();

      setUsuario({
        id: authData.user.id,
        email: authData.user.email ?? null,
        nome: profile?.user_name ?? authData.user.email ?? "Usuário",
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
    <div className="relative min-h-screen flex flex-col items-center justify-center text-center text-white overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/img/carro-bg.jpeg"
          alt="CORVETTE C5"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      <motion.h1
        initial={{ scale: 2, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="text-red-600 text-4xl md:text-6xl font-extrabold tracking-widest drop-shadow-lg"
      >
        {`Bem-vindo, ${usuario?.nome}!`}
      </motion.h1>

      <motion.button
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="mt-8 px-8 py-3 rounded-full bg-red-600 text-white font-bold shadow-lg hover:bg-red-700 transition"
        onClick={() => router.push("/garagem")}
      >
        Entrar na Garagem
      </motion.button>
    </div>
  );
}
