"use client";

import Link from "next/link";
import { useState } from "react";
import { InputMask } from '@react-input/mask';
import {useRouter} from 'next/navigation'

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function Register() {
    const [form, setForm] = useState({ name: "", email: "", password: "", phone: "" });
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if(!form.name || !form.email || !form.password || !form.phone){
            alert("Preencha todos os campos")
            return;
        }

        const response = await fetch("/api/users", {
            method: "POST",
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify({
                name: form.name,
                email: form.email,
                password: form.password,
                phone: form.phone,
            })
        })

        const result = await response.json();
        alert(result.message || result.error)
        router.push("./")
    };

    return (
        <div className="flex flex-col  min-h-screen bg-gray-900 text-white">
            <div className="p-4 w-full">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/">Início</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage className="text-green-500">Cadastro</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            </div>
            <div className="flex-1 flex items-center justify-center">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-[90%] max-w-sm">
                <div className="flex flex-col">
                    <label htmlFor="name" className="text-green-300 mb-1">Nome</label>
                    <input
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full p-2 bg-transparent rounded border text-white border-green-300 focus:ring-2 focus:ring-green-400"
                        required
                    />
                </div>
            
                

                <div className="flex flex-col">
                    <label htmlFor="email" className="text-green-300 mb-1">Email</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full p-2 bg-transparent rounded border text-white border-green-300 focus:ring-2 focus:ring-green-400"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="password" className="text-green-300 mb-1">Senha</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full p-2 bg-transparent rounded border text-white border-green-300 focus:ring-2 focus:ring-green-400"
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="phone" className="text-green-300 mb-1">Telefone</label>
                    <InputMask
                        id="phone"
                        name="phone"
                        mask="(__)_____-____"
                        replacement={{ _: /\d/ }}
                        value={form.phone}
                        onChange={handleChange}
                        className="w-full p-2 mt-1 rounded bg-transparent border border-green-300 text-white  focus:ring-2 focus:ring-green-400"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-500 transition duration-300"
                >
                    ENTRAR
                </button>
                
            </form>
            </div>
        </div>
    )
}
