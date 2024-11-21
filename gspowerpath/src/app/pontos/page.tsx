'use client';

import { useApi } from '@/utils/hooks/useApi';

export default function UpdatePointsPage({ params }: { params: { id: string } }) {
  const idUsuario = parseInt(params.id);
  const { updateUserPoints } = useApi();

  const handleUpdatePoints = async () => {
    try {
      await updateUserPoints(idUsuario);
      alert('Pontos atualizados com sucesso!');
    } catch {
      alert('Erro ao atualizar pontos.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 shadow-md rounded-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Atualizar Pontos</h1>
        <button
          onClick={handleUpdatePoints}
          className="w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600"
        >
          Atualizar Pontos
        </button>
      </div>
    </div>
  );
}
