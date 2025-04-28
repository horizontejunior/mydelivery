"use client"
import { useState } from "react";
import {signIn} from "next-auth/react"
import {useRouter} from "next/navigation";
import Link from "next/link";

export default function Home() {
  
  const router = useRouter();
  const [message, setMessage] = useState("")
  const [form, setForm] = useState({ email: "", password: "" });
 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      username: form.email,
      password: form.password,
    });

    if(res?.ok){
      router.push("/dashboard")
    }else{
      setMessage("Usuário ou senha incorreto");
    }
  
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-extrabold text-green-500 uppercase tracking-wide text-center">
        My Delivery
      </h1>
      <h2 className="text-2xl text-green-500 tracking-wide uppercase text-center">
        - Controle suas entregas -
      </h2>

      <div className="flex flex-col items-center justify-center pt-10 text-yellow-500 mb-8 w-full">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-[90%] max-w-sm">
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

          <button
            type="submit"
            className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-500 transition duration-300"
          >
            ENTRAR
          </button>
        </form>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
        
    
          <Link href="/register" className="uppercase m-2 p-2 text-green-500 hover:underline">
            Crie uma conta aqui
          </Link>
      </div>
    </div>
  );
}
