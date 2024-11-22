"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { editarConta, excluirConta } from "@/app/api/user/route";
import { useApi } from "@/utils/hooks/useApi";

export default function Conta() {
    const { idUsuario, logout } = useApi();
    const router = useRouter();
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    useEffect(() => {
        if (!idUsuario) {
            router.push("/login");
            return;
        }

        // Busca os dados do usuário autenticado
        fetch(`http://localhost:8080/usuario/${idUsuario}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Erro ao buscar usuário");
                }
                return response.json();
            })
            .then((data) => {
                setNome(data.nome || "");
                setEmail(data.email || "");
            })
            .catch((error) =>
                console.error("Erro ao carregar os dados do usuário:", error)
            );
    }, [idUsuario, router]);

    const handleEditar = async () => {
        try {
            await editarConta(idUsuario!, { nome, email, senha });
            alert("Conta atualizada com sucesso!");
        } catch (error) {
            console.error("Erro ao atualizar conta:", error);
            alert("Erro ao atualizar conta");
        }
    };

    const handleExcluir = async () => {
        try {
            await excluirConta(idUsuario!);
            logout();
            alert("Conta excluída com sucesso!");
            router.push("/login");
        } catch (error) {
            console.error("Erro ao excluir conta:", error);
            alert("Erro ao excluir conta");
        }
    };

    return (
        <div className="centered-container">
            <div className="page-container">
                <h1 className="page-title">Minha Conta</h1>
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
                <button onClick={handleEditar} className="page-button">
                    Salvar Alterações
                </button>
                <button
                    onClick={handleExcluir}
                    className="page-button-secondary mt-4 bg-red-500 hover:bg-red-600"
                >
                    Excluir Conta
                </button>
            </div>
        </div>
    );
}