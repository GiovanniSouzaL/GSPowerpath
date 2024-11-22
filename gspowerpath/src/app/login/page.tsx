"use client";

import { useState } from 'react';
import { useRouter } from "next/navigation";
import { login } from '@/app/api/login/route';
import { useApi } from '@/utils/hooks/useApi';

export default function Login() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const { login: apiLogin } = useApi();
    const router = useRouter();

    const handleLogin = async () => {
        try {
            const data = await login(email, senha);
            apiLogin(data.token, data.idUsuario);
            alert("Login realizado com sucesso!");
            router.push("/dashboard"); // Redireciona para o Dashboard
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            alert("Erro ao fazer login");
        }
    };

    return (
        <div className="centered-container">
            <div className="page-container">
                <h1 className="page-title">Login</h1>
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
                <button onClick={handleLogin} className="page-button">
                    Entrar
                </button>
                <p className="mt-4 text-center">
                    Não tem uma conta?{" "}
                    <a
                        href="/registrar"
                        className="text-teal-600 hover:underline"
                    >
                        Registre-se aqui
                    </a>
                </p>
            </div>
        </div>
    );
}