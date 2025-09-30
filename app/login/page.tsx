"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Usuario {
  nome: string;
  email: string;
  senha: string;
  data: string;
}

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleLogin = () => {
    if (!email || !senha) {
      setErro("Preencha todos os campos");
      return;
    }

    const usuariosString = localStorage.getItem("usuarios");
    const usuarios: Usuario[] = usuariosString ? JSON.parse(usuariosString) : [];

    const usuarioValido = usuarios.find((u) => u.email === email && u.senha === senha);

    if (usuarioValido) {
      localStorage.setItem("usuarioLogado", JSON.stringify(usuarioValido));
      router.push("/rolao.tsx");
    } else {
      setErro("E-mail ou senha incorretos");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-700">
      <div className="p-8 rounded-2xl w-full bg-white max-w-md text-black font-bold">
        <h1 className="text-2xl text-center">LOGIN</h1>
        <div className="flex flex-col gap-y-4">
          <label className="flex flex-col">
            Usuário:
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              type="text"
              className="border p-3 rounded-2xl"
            />
          </label>
          <label className="flex flex-col">
            Senha:
            <input
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Password"
              type="password"
              className="border p-3 rounded-2xl"
            />
          </label>
          <button
            className="border p-3.5 rounded-xl bg-blue-600 text-white text-2xl hover:bg-blue-900 transition-all"
            onClick={handleLogin}
          >
            LOGIN
          </button>
          {erro && <span className="text-red-600 text-sm">{erro}</span>}
        </div>
      </div>
    </div>
  );
}
