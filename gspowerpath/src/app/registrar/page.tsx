"use client";

import { useState } from 'react';
import { useRouter } from "next/navigation";
import { registrar } from '@/app/api/user/route';

export default function Registrar() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const router = useRouter();

    const handleRegistrar = async () => {
        try {
            // Validações básicas antes do envio
            if (!nome || !email || !senha) {
                alert("Por favor, preencha todos os campos.");
                return;
            }

            // Faz o registro do usuário no backend
            await registrar({ nome, email, senha });

            alert("Conta registrada com sucesso! Você será redirecionado para o login.");
            router.push("/login");
        } catch (error) {
            console.error("Erro ao registrar:", error);
            alert("Erro ao registrar a conta. Tente novamente.");
        }
    };

    return (
        <div className="centered-container">
            <div className="page-container">
                <h1 className="page-title">Registrar</h1>
                <input
                    type="text"
                    placeholder="Nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="page-input"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="page-input"
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    className="page-input"
                />
                <button onClick={handleRegistrar} className="page-button">
                    Registrar
                </button>
                <p className="mt-4 text-center">
                    Já tem uma conta?{" "}
                    <a
                        href="/login"
                        className="text-teal-600 hover:underline"
                    >
                        Faça login aqui
                    </a>
                </p>
            </div>
        </div>
    );
}