const API_URL = "http://localhost:8080/carro";

import { Carro } from "@/types/types";

/**
 * Lista todos os carros do backend.
 */
export const listarCarros = async (): Promise<Carro[]> => {
    const response = await fetch(API_URL, {
        method: "GET",
    });

    if (!response.ok) {
        throw new Error("Erro ao listar carros");
    }

    return await response.json();
};

/**
 * Insere um novo carro no backend.
 */
export const inserirCarro = async (carro: Omit<Carro, "idCarro">): Promise<Carro> => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(carro),
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "Erro ao inserir carro");
    }

    return await response.json();
};

/**
 * Altera um carro existente no backend.
 */
export const alterarCarro = async (idCarro: number, carro: Carro): Promise<Carro> => {
    const response = await fetch(`${API_URL}/${idCarro}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(carro),
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "Erro ao alterar carro");
    }

    return await response.json();
};

/**
 * Atualiza os pontos do usuário no backend.
 */
export const atualizarPontosApi = async (idUsuario: number): Promise<void> => {
    const response = await fetch(`${API_URL}/${idUsuario}/pontos`, {
        method: "POST",
    });

    if (!response.ok) {
        throw new Error("Erro ao atualizar pontos");
    }
};

/**
 * Recarrega a bateria do carro no backend.
 */
export const recarregarBateriaApi = async (
    idCarro: number,
    quantidade: number
): Promise<Carro> => {
    const response = await fetch(`${API_URL}/${idCarro}/recarga`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recarga: quantidade }),
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "Erro ao recarregar a bateria do carro");
    }

    return await response.json();
};
