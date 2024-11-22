const API_URL = 'http://localhost:8080';

export const atualizarPontos = async (idUsuario: number) => {
    const response = await fetch(`${API_URL}/usuario/${idUsuario}/pontos`, {
        method: 'POST',
    });
    if (!response.ok) throw new Error('Erro ao atualizar pontos');
    return await response.json();
};
