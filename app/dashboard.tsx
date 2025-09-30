"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


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
    <div className="min-h-screen flex items-center justify-center bg-yellow-700">
      <h1 className="text-white text-2xl">
        {usuario ? `Bem-vindo, ${usuario.nome}!` : "Carregando..."}
      </h1>
    </div>
  );
}
