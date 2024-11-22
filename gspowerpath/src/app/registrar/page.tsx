"use client";

import { useState } from 'react';
import { registrar } from '@/app/api/user/route';

export default function Registrar() {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const handleRegistrar = async () => {
        try {
            await registrar({ nome, email, senha });
            alert("Usuário registrado com sucesso!");
        } catch (error) {
            console.error("Erro ao registrar usuário:", error);
            alert("Erro ao registrar usuário");
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
            </div>
        </div>
    );
}