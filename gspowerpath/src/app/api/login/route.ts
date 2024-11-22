import { Usuario } from "@/types/types";

const API_URL = "http://localhost:8080";

export const login = async (email: string, senha: string): Promise<Usuario> => {
    const response = await fetch(`${API_URL}/usuario`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
        throw new Error("Erro ao buscar usuários");
    }

    const usuarios: Usuario[] = await response.json();

    // Verificar se o email e senha correspondem a algum usuário
    const usuario = usuarios.find(
        (u) => u.email === email && u.senha === senha
    );

    if (!usuario) {
        throw new Error("Credenciais inválidas");
    }

    return usuario; // Retorna o usuário autenticado
};
