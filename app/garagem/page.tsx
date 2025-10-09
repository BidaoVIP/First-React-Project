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
                <div className="flex h-24 justify-between">

                    <div className="flex items-center">
                        <img src="/logo.png" alt="Logo" className=" ml-7 h-10 w-auto" />
                        {/* <span className="font-bold">logo</span> */}
                    </div>

                    <div className="flex items-center text-xl w-xl font-bold ">
                        <button
                            onClick={() => router.push("/garagem")}
                            className="hover:bg-gray-600 p-2 h-full w-full transition">
                            Garagem
                        </button>
                        <button
                            onClick={() => router.push("/favoritos")}
                            className="hover:bg-gray-600 p-2 h-full w-full transition">
                            Favoritos
                        </button>
                        <button
                            onClick={() => router.push("/dashboard")}
                            className="hover:bg-gray-600 p-2 h-full w-full transition">
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
                            <Link href="/login" className="hover:text-gray-300">
                                Entrar
                            </Link>
                        )}
                    </div>
                </div>
            </div>
            <div className="min-h-screen w-full bg-neutral-500 flex items-center justify-center mt-20">
                <section className="w-11/12 max-w-7xl bg-neutral-900 rounded-3xl p-10 border border-red-700/40">
                    <h2 className="text-3xl font-extrabold tracking-wide text-red-500 mb-10 text-center">
                        Nossa Garagem
                    </h2>

                    <div className="max-h-[70vh] overflow-y-scroll pr-2 scrollbar-thin scrollbar-thumb-red-600 scrollbar-track-neutral-800 rounded-xl">

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-8 pb-4">
                            {[...Array(16)].map((_, i) => (
                                <div
                                    key={i}
                                    className="bg-neutral-800 hover:bg-neutral-700 transition-colors shadow-md hover:shadow-red-500/20 rounded-2xl p-7 border border-neutral-700/60"
                                >
                                    <div className="h-40 w-full bg-neutral-700 rounded-xl mb-4 flex items-center justify-center text-neutral-400">
                                        Imagem
                                    </div>
                                    <h3 className="text-lg font-semibold text-white">Carro {i + 1}</h3>
                                    <p className="text-neutral-400 text-sm">Descrição breve aqui</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}