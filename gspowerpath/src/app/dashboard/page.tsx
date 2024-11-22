"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { atualizarPontos } from '@/app/api/pontos/route';
import { useApi } from '@/utils/hooks/useApi';
import { Usuario } from "@/types/types";

export default function Dashboard() {
    const { idUsuario } = useApi();
    const router = useRouter();
    const [userInfo, setUserInfo] = useState<Usuario | null>(null);

    useEffect(() => {
        if (!idUsuario) {
            router.push("/login");
        } else {
            fetch(`http://localhost:8080/usuario/${idUsuario}`)
                .then((response) => response.json())
                .then((data) => setUserInfo(data))
                .catch((error) =>
                    console.error("Erro ao carregar os dados do usuário:", error)
                );
        }
    }, [idUsuario, router]);

    const handleAtualizarPontos = async () => {
        try {
            await atualizarPontos(idUsuario!);
            alert("Pontos atualizados com sucesso!");
        } catch (error) {
            console.error("Erro ao atualizar pontos:", error);
            alert("Erro ao atualizar pontos");
        }
    };

    if (!idUsuario) return null;

    return (
        <div className="centered-container">
            <div className="page-container">
                <h1 className="page-title">Painel de Controle</h1>
                {userInfo ? (
                    <div className="mb-6">
                        <p>
                            <strong>Nome:</strong> {userInfo.nome}
                        </p>
                        <p>
                            <strong>Email:</strong> {userInfo.email}
                        </p>
                        <p>
                            <strong>Pontos:</strong> {userInfo.pontos || 0}
                        </p>
                        <p>
                            <strong>Status:</strong> {userInfo.status || "N/A"}
                        </p>
                    </div>
                ) : (
                    <p>Carregando informações...</p>
                )}
                <button
                    onClick={handleAtualizarPontos}
                    className="page-button"
                >
                    Atualizar Pontos
                </button>
            </div>
        </div>
    );
}