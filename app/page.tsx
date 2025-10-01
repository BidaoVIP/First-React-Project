"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiAlertTriangle } from "react-icons/fi";
import { CgLogIn } from "react-icons/cg";

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

        if (!nome) newErrors.nome = "Digite seu nome!";
        if (email.length < 9 || !email.includes("@")) newErrors.email = "Digite um email válido!";
        if (!data) newErrors.data = "Preencha a data de nascimento!";
        if (senha.length < 6 || !/\d/.test(senha) || !/[!@#$%^&*(),.?":{}|<>]/.test(senha))
            newErrors.senha = "Senha inválida! Deve ter 6+ caracteres, um número e um caractere especial.";

        setErrors(newErrors);
        const hasErrors = Object.values(newErrors).some((e) => e !== "");
        if (!hasErrors) {
            const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
            usuarios.push({ nome, email, data, senha });
            localStorage.setItem("usuarios", JSON.stringify(usuarios));

            router.push("/login");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-indigo-700">
            <div className="bg-white p-8 rounded-2xl w-full max-w-md text-black font-bold shadow-xl">
                <h1 className=" text-3xl mb-6 font-extrabold tracking-wide text-center">
                    <CgLogIn className="text"/>
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
                            className="p-3 border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                        />
                        {errors.nome && <span className="mt-1 flex gap-1 text-red-600 text-sm"><FiAlertTriangle className="text-lg"/>{errors.nome}</span>}
                    </label>

                    <label className="flex flex-col">
                        Email:
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="p-3 border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                        />
                        {errors.email && <span className="mt-1 flex gap-1 text-red-600 text-sm"><FiAlertTriangle className="text-lg"/>{errors.email}</span>}
                    </label>

                    <label className="flex flex-col">
                        Data Nascimento:
                        <input
                            type="date"
                            value={data}
                            onChange={(e) => setData(e.target.value)}
                            className="p-3 border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                        />
                        {errors.data && <span className="mt-1 flex gap-1 text-red-600 text-sm"><FiAlertTriangle className="text-lg" />{errors.data}</span>}
                    </label>

                    <label className="flex flex-col">
                        Senha:
                        <input
                            type="password"
                            placeholder="Password"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            className="p-3 border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                        />
                        {errors.senha && <span className="mt-1 flex gap-1 text-red-600 text-sm"><FiAlertTriangle className="text-2xl" />{errors.senha}</span>}
                    </label>

                    <button
                        className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold shadow-xl hover:scale-105 hover:bg-blue-900 transition-transform"
                        onClick={Salvar}
                    >
                        SALVAR
                    </button>
                </div>
            </div>
        </div>
    );
}
