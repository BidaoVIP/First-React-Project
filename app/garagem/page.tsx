"use client"
import { supabase } from "@/supabaseClient";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";


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
                        {/* <span className="font-bold">logo</span> */}
                    </div>

                    <div className="flex flex-wrap items-center justify-center text-lg md:text-xl font-bold gap-2 md:gap-5">
                        <button
                            onClick={() => router.push("/garagem")}
                            className="hover:bg-gray-600 px-3 py-2 rounded-md transition">
                            Garagem
                        </button>
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
            <div className="min-h-screen w-full bg-neutral-900 flex flex-col items-center justify-center md:px-12 py-24">
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