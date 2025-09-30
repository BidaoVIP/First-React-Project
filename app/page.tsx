"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [data, setData] = useState("");
  const [senha, setSenha] = useState("");

  const [errors, setErrors] = useState({
    nome: "",
    email: "",
    data: "",
    senha: ""
  });

  const Salvar = () => {
    const newErrors = { nome: "", email: "", data: "", senha: "" };

    if (!nome) {
      newErrors.nome = "Digite seu nome!";
    }
    if (!email.includes("@")) {
      newErrors.email = "Digite um email válido!";
    }
    if (!data) {
      newErrors.data = "Preencha a data de nascimento!";
    }
    if (senha.length < 6 && !/\d/.test(senha) && !/[!@#$%^&*(),.?":{}|<>]/.test(senha)) {
      newErrors.senha = "Senha inválida! Deve ter 6+ caracteres, um número e um caractere especial."
    }

    setErrors(newErrors);
    const hasErrors = Object.values(newErrors).some((e) => e !== "");
    if (!hasErrors) {
      router.push("/login");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-700">
      <div className="bg-white p-8 rounded-2xl w-full max-w-md text-black font-bold">
        <h1 className=" text-2xl text-center">
          CADASTRO
        </h1>
        <div className="flex flex-col gap-4">
          <label className="flex flex-col">
            Nome:
            <input
              type="text"
              placeholder="Nome completo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="p-3 border rounded-xl"
            />
            {errors.nome && <span className="text-red-600 text-sm">{errors.nome}</span>}
          </label>

          <label className="flex flex-col">
            Email:
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 border rounded-xl"
            />
            {errors.email && <span className="text-red-600 text-sm">{errors.email}</span>}
          </label>

          <label className="flex flex-col">
            Data Nascimento:
            <input
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              className="p-3 border rounded-xl"
            />
            {errors.data && <span className="text-red-600 text-sm">{errors.data}</span>}
          </label>

          <label className="flex flex-col">
            Senha:
            <input
              type="password"
              placeholder="Password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="p-3 border rounded-xl"
            />
            {errors.senha && <span className="text-red-600 text-sm">{errors.senha}</span>}
          </label>

          <button
            className="border p-3 rounded-xl bg-blue-600 text-white hover:bg-blue-900 transition"
            onClick={Salvar}
          >
            SALVAR
          </button>
        </div>
      </div>
    </div>
  );
}
