const API_URL = 'http://localhost:8080';

export const registrar = async (usuario: { nome: string, email: string, senha: string }) => {
    const response = await fetch(`${API_URL}/usuario`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuario),
    });
    if (!response.ok) throw new Error('Erro ao registrar usuário');
    return await response.json();
};

export const editarConta = async (idUsuario: number, usuario: { nome: string, email: string, senha: string }) => {
    const response = await fetch(`${API_URL}/usuario/${idUsuario}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuario),
    });
    if (!response.ok) throw new Error('Erro ao atualizar conta');
    return await response.json();
};

export const excluirConta = async (idUsuario: number) => {
    const response = await fetch(`${API_URL}/usuario/${idUsuario}`, {
        method: 'DELETE',
    });
    if (!response.ok) throw new Error('Erro ao excluir conta');
    return;
};
