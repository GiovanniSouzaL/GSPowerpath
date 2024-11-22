"use client";

import { useState } from 'react';
import { editarConta, excluirConta } from '@/app/api/user/route';
import { useApi } from '@/utils/hooks/useApi';

export default function Conta() {
    const { idUsuario, logout } = useApi();
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleEditar = async () => {
        try {
            await editarConta(idUsuario!, { nome, email, senha });
            alert('Conta atualizada com sucesso!');
        } catch (error) {
            console.error('Erro ao atualizar conta:', error);
            alert('Erro ao atualizar conta');
        }
    };

    const handleExcluir = async () => {
        try {
            await excluirConta(idUsuario!);
            logout();
            alert('Conta excluída com sucesso!');
        } catch (error) {
            console.error('Erro ao excluir conta:', error);
            alert('Erro ao excluir conta');
        }
    };

    return (
        <div className="conta-container">
            <h1 className="conta-title">Minha Conta</h1>
            <input
                type="text"
                placeholder="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="conta-input"
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="conta-input"
            />
            <input
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="conta-input"
            />
            <button onClick={handleEditar} className="conta-button-save">
                Salvar
            </button>
            <button onClick={handleExcluir} className="conta-button-delete">
                Excluir Conta
            </button>
        </div>
    );
}