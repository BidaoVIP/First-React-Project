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
        <div className="min-h-screen bg-white">
            <nav className="fixed w-full text-white z-50 bg-blue-700 ">
                <div className="py-4 flex justify-between">
                    
                    <div className="flex items-center">
                        <span className="ml-3 font-bold">logo dessa prr</span>
                    </div>

                    <div className="flex gap-8 text-lg">
                        <Link href="/garagem" className="hover:text-gray-300 transition">
                            Garagem
                        </Link>
                        <Link href="/favoritos" className="hover:text-gray-300 transition">
                            Favoritos
                        </Link>
                        <Link href="/sobre" className="hover:text-gray-300 transition">
                            Sobre nós
                        </Link>
                    </div>

                    <div className="flex items-center mr-3">
                        {user ? (
                            <button onClick={handleLogout} className="hover:opacity-80 transition">
                                <img
                                    src="/perfil.jpg"
                                    alt="Perfil"
                                    className="h-10 w-10 rounded-full border-2 border-white object-cover"
                                />
                            </button>
                        ) : (
                            <Link href="/login" className="hover:text-gray-300">
                                Entrar
                            </Link>
                        )}
                    </div>
                    
                </div>
            </nav>
        </div>
    );
}