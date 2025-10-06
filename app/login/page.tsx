"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiAlertTriangle } from "react-icons/fi";
import { CgLogIn } from "react-icons/cg";
import { supabase } from "@/supabaseClient";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

    const handleLogin = async () => {
    setErro("");

    if (!email || !senha) {
      setErro("Preencha todos os campos");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErro("Email inválido");
      return;
    }
    if (senha.length < 6) {
      setErro("Senha inválida");
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password: senha });

    if (error) {
      setErro("Email ou senha incorretos!");
      return;
    }

    if (!data.user) {
      setErro("Falha ao obter dados do usuário");
      return;
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", data.user.id)
      .single();

    if (profileError) {
      console.error(profileError.message);
      setErro("Falha ao carregar perfil");
      return;
    }

    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-700 to-black">
      <div className="bg-white p-8 rounded-2xl w-full max-w-md text-black font-bold shadow-xl">
        <h1 className="flex text-3xl mb-6 font-extrabold tracking-wide justify-center items-center gap-x-2"><CgLogIn />LOGIN</h1>
        <div className="flex flex-col gap-y-4">
          <label className="flex flex-col">
            Email:
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              type="text"
              className="p-3 border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 transition"
            />
          </label>
          <label className="flex flex-col">
            Senha:
            <input
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Password"
              type="password"
              className="p-3 border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 transition"
            />
          </label>
          <button
            className="w-full py-3 rounded-xl bg-red-600 text-white font-semibold shadow-xl hover:scale-105 hover:bg-red-900 transition-transform"
            onClick={handleLogin}
          >
            LOGIN
          </button>
          {erro && (
            <div className="flex items-center gap-2 p-2 mt-2 text-sm text-red-700 bg-red-100 border border-red-400 rounded-lg">
              <FiAlertTriangle className="text-xl" />
              {erro}
            </div>
          )}

          <div className="text-sm text-black">
            Não tem cadastro?<a href="../" className="text-indigo-600 font-bold hover:underline">Cadastre-se</a>
          </div>

        </div>
      </div>
    </div>
  );
}
