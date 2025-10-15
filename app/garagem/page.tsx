"use client"
import { supabase } from "@/supabaseClient";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Garagem() {
    const router = useRouter();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const getUser = async () => {
            const { data } = await supabase.auth.getUser();
            setUser(data.user);
        };
        getUser();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/login");
    };


    return (
        <div className="min-h-screen flex">
            <div className="fixed w-full text-white z-50 bg-black ">
                <div className="flex h-24 justify-between items-center px-4 md:px-8 flex-wrap">

                    <div className="flex items-center">
                        <img src="/logo.png" alt="Logo" className="ml-4 md:ml-7 h-8 md:h-10 w-auto" />
                    </div>

                    <div className="flex flex-wrap items-center justify-center text-lg md:text-xl font-bold gap-2 md:gap-5">
                        <div className="relative group">
                            <button
                                className="hover:bg-gray-600 px-3 py-2 rounded-md transition flex items-center gap-1"
                            >
                                Garagem
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4 text-gray-300 group-hover:rotate-180 transition-transform"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <div className="absolute left-0 w-44 bg-neutral-800 border border-red-700/60 rounded-md shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-200">
                                <button
                                    onClick={() => router.push("/garagem")}
                                    className="block w-full text-left px-4 py-2 text-gray-200 hover:bg-neutral-700 transition"
                                >
                                    Garagem
                                </button>
                                <button
                                    onClick={() => router.push("/minha-garagem")}
                                    className="block w-full text-left px-4 py-2 text-gray-200 hover:bg-neutral-700 transition"
                                >
                                    Minha Garagem
                                </button>
                            </div>
                        </div>
                        <button
                            onClick={() => router.push("/favoritos")}
                            className="hover:bg-gray-600 px-3 py-2 rounded-md transition">
                            Favoritos
                        </button>
                        <button
                            onClick={() => router.push("/dashboard")}
                            className="hover:bg-gray-600 px-3 py-2 rounded-md transition">
                            Sobre nós
                        </button>
                    </div>

                    <div className="flex items-center mr-7">
                        {user ? (
                            <button onClick={handleLogout} className="hover:opacity-80 transition">
                                <img
                                    src="/img/carro-bg.jpeg"
                                    alt="Perfil"
                                    className="h-15 w-15 rounded-full border border-white object-cover"
                                />
                            </button>
                        ) : (
                            <button onClick={() => router.push("/login")}
                                className="hover:bg-gray-600 px-3 py-2 rounded-md transition font-bold border"
                            >
                                Entrar
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <div className="min-h-screen w-full bg-neutral-900 flex flex-col items-center justify-center md:px-12 py-34">
                <h2 className="text-3xl font-extrabold tracking-wide text-red-600 text-center">
                    Nossa Garagem
                </h2>


                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 mt-15 gap-8 pb-4">
                    {[...Array(16)].map((_, i) => (
                        <div
                            key={i}
                            className="bg-neutral-800 hover:bg-neutral-700 transition-all duration-300 shadow-lg hover:shadow-red-500/20 rounded-2xl min-w-96 md:p-8 border border-red-700/60 transform hover:-translate-y-2"
                        >
                            <div className="h-40 md:h-48 w-full bg-neutral-500 rounded-xl mb-6 flex items-center justify-center text-neutral-400">
                                image
                            </div>
                            <h3 className="text-lg font-semibold text-white">Carro {i + 1}</h3>
                            <p className="text-neutral-300 text-sm">Descrição breve aqui</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}