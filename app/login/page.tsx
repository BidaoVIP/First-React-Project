"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiAlertTriangle } from "react-icons/fi";
import { CgLogIn } from "react-icons/cg";

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
      router.push("/dashboard");
    } else {
      setErro("E-mail ou senha incorretos");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-indigo-700">
      <div className="bg-white p-8 rounded-2xl w-full max-w-md text-black font-bold shadow-xl">
        <h1 className="flex text-3xl mb-6 font-extrabold tracking-wide justify-center items-center gap-x-2"><CgLogIn />LOGIN</h1>
        <div className="flex flex-col gap-y-4">
          <label className="flex flex-col">
            Usuário:
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              type="text"
              className="p-3 border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </label>
          <label className="flex flex-col">
            Senha:
            <input
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Password"
              type="password"
              className="p-3 border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </label>
          <button
            className="bw-full py-3 rounded-xl bg-indigo-600 text-white font-semibold shadow-xl hover:scale-105 hover:bg-blue-900 transition-transform"
            onClick={handleLogin}
          >
            LOGIN
          </button>
          {erro && <span className="mt-1 flex gap-1 text-red-600 text-sm"><FiAlertTriangle className="text-xl" />{erro}</span>}
        </div>
      </div>
    </div>
  );
}
