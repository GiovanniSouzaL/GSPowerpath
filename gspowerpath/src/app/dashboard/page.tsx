import { atualizarPontos } from '@/app/api/pontos/route';
import { useAuth } from '@/utils/hooks/useApi';

export default function Dashboard() {
    const { idUsuario } = useAuth();

    const handleAtualizarPontos = async () => {
        try {
            await atualizarPontos(idUsuario!);
            alert('Pontos atualizados com sucesso!');
        } catch (error) {
            console.error('Erro ao atualizar pontos:', error); // Usar o error aqui
            alert('Erro ao atualizar pontos');
        }
    };

    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={handleAtualizarPontos}>Atualizar Pontos</button>
        </div>
    );
}
