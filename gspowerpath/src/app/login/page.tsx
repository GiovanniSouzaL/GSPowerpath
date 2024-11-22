"use client";

import { useState } from 'react';
import { login } from '@/app/api/login/route';
import { useApi } from '@/utils/hooks/useApi';

export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const { login: apiLogin } = useApi();

    const handleLogin = async () => {
        try {
            const data = await login(email, senha);
            apiLogin(data.token, data.idUsuario);
            alert('Login realizado com sucesso!');
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            alert('Erro ao fazer login');
        }
    };

    return (
        <div className="login-container">
            <h1 className="login-title">Login</h1>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="login-input"
            />
            <input
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="login-input"
            />
            <button onClick={handleLogin} className="login-button">
                Entrar
            </button>
        </div>
    );
}