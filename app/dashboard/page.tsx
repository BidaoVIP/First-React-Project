"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { clearAllModuleContexts } from "next/dist/server/lib/render-server";


interface Usuario {
  nome: string;
  email: string;
  senha: string;
  data: string;
}

export default function Dashboard() {
  const router = useRouter();

  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useEffect(() => {
    const logadoString = localStorage.getItem("usuarioLogado");
    const logado: Usuario | null = logadoString
      ? JSON.parse(logadoString)
      : null;

    if (!logado) {
      router.push("/login");
    } else {
      setUsuario(logado);
    }
  }, [router]);



  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-700 to-black relative">
  <div className="absolute inset-0 bg-[url('/carro-bg.jpg')] bg-cover bg-center opacity-20"></div>
  
  <h1 className="text-red-600 text-4xl font-extrabold tracking-widest">
    {usuario ? `Bem-vindo, ${usuario.nome}!` : "Carregando..."}
  </h1>
  
  <button className="mt-6 px-6 py-3 rounded-full bg-red-600 text-white font-bold shadow-4xl hover:bg-red-700 transition">

    Entrar na Garagem
  </button>
</div>

  );
}
