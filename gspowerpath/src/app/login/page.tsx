"use client";

import { useState } from 'react';
import { useRouter } from "next/navigation";
import { login } from '@/app/api/login/route';
import { useApi } from '@/utils/hooks/useApi';

export default function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const { login: apiLogin } = useApi();
    const router = useRouter();

    const handleLogin = async () => {
        try {
            const usuario = await login(email, senha); // Verifica as credenciais
            apiLogin("mock-token", usuario.idUsuario); // Simula um token
            alert("Login realizado com sucesso!");
            router.push("/dashboard"); // Redireciona para o Dashboard
        } catch (error) {
            if (error instanceof Error) {
                alert("Email ou senha incorretos. Tente novamente."); // Mensagem amigável
            } else {
                alert("Erro inesperado. Tente novamente mais tarde."); // Mensagem genérica
            }
        }
    };

    return (
        <div className="centered-container">
            <div className="page-container">
                <h1 className="page-title">Login</h1>
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
                <button onClick={handleLogin} className="page-button">
                    Entrar
                </button>
                <p className="mt-4 text-center">
                    Não tem uma conta?{" "}
                    <a
                        href="/registrar"
                        className="text-green-600 hover:underline"
                    >
                        Registre-se aqui
                    </a>
                </p>
            </div>
        </div>
    );
}