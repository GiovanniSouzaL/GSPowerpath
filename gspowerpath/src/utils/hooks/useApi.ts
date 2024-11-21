import { Usuario } from '@/types/types';


export const useApi = () => {
    const baseUrl = 'http://localhost:8080';
  
    const fetchApi = async (endpoint: string, options?: RequestInit) => {
      const response = await fetch(`${baseUrl}${endpoint}`, options);
      if (!response.ok) {
        throw new Error(`Erro na API: ${response.statusText}`);
      }
      return response.json();
    };
  
    const createUser = (user: Usuario) =>
      fetchApi('/usuario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
  
    const getUser = (id: number) =>
      fetchApi(`/usuario/${id}`);
  
    const updateUser = (id: number, user: Usuario) =>
      fetchApi(`/usuario/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });
  
    const deleteUser = (id: number) =>
      fetchApi(`/usuario/${id}`, { method: 'DELETE' });
  
    const updateUserPoints = (id: number) =>
      fetchApi(`/usuario/${id}/pontos`, { method: 'POST' });
  
    return {
      createUser,
      getUser,
      updateUser,
      deleteUser,
      updateUserPoints,
    };
  };
  