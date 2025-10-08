"use client"
import { supabase } from "@/supabaseClient";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";


export default function Garagem() {
    const router = useRouter();
    const [ user, setUser] = useState<any>(null);

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
            <nav className="fixed w-full text-white z-50 bg-blue-700">
                <div className="max-w-6xl mx-auto py-3 flex bg-amber-600">



                    <div className="flex gap-x-6">
                        {user ? (
                            <>
                                <Link href="/dashboard" className="hover:text-gray-300">
                                    Sobre nós
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="hover:text-red-400 transition"
                                >
                                    Sair
                                </button>
                            </>
                        ) : (
                            <>
                                <Link href="/login" className="hover:text-gray-300">
                                    Login
                                </Link>
                                <Link href="/signup" className="hover:text-gray-300">
                                    Criar conta
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
}