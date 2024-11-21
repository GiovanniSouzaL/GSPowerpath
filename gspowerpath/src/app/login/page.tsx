'use client';

import { useState } from 'react';
import { useApi } from '@/utils/hooks/useApi';
import { Usuario } from '@/types/types';

export default function CreateUserPage() {
  const [formData, setFormData] = useState<Usuario>({ nome: '', email: '', senha: '' });
  const [message, setMessage] = useState<string | null>(null);
  const { createUser } = useApi();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUser(formData);
      setMessage('Usuário criado com sucesso!');
    } catch {
      setMessage('Erro ao criar usuário.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 shadow-md rounded-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Criar Usuário</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="nome"
            placeholder="Nome"
            className="w-full border rounded-md px-3 py-2"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border rounded-md px-3 py-2"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="senha"
            placeholder="Senha"
            className="w-full border rounded-md px-3 py-2"
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Criar
          </button>
        </form>
        {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
      </div>
    </div>
  );
}
