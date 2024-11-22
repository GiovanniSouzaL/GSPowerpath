const API_URL = 'http://localhost:8080';

export const login = async (email: string, senha: string) => {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
    });
    if (!response.ok) throw new Error('Erro ao fazer login');
    return await response.json();
};
