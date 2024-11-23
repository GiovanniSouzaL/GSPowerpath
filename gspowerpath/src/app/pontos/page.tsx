"use client";

import { useState, useEffect, useCallback } from "react";
import { useApi } from "@/utils/hooks/useApi";
import { useCarros } from "@/utils/hooks/useCarro";

export default function PontosPage() {
    const { idUsuario } = useApi();
    const { carros, fetchCarros } = useCarros();

    const [pontos, setPontos] = useState<number>(0);
    const [conquistas, setConquistas] = useState<string[]>([]);
    const [ranking, setRanking] = useState<number>(0);

    const calcularPontos = useCallback(() => {
        if (!carros || carros.length === 0) {
            setPontos(0); // Define 0 pontos se não houver carros
            return;
        }

        // Calcula os pontos com base na recarga dos carros
        const totalPontos = carros.reduce((acc, carro) => acc + carro.recarga * 50, 0);
        setPontos(totalPontos);
    }, [carros]);

    useEffect(() => {
        if (idUsuario) {
            fetchCarros(idUsuario);
            calcularPontos();
            carregarConquistas();
            carregarRanking();
        }
    }, [idUsuario, fetchCarros, calcularPontos]);

    const carregarConquistas = () => {
        // Simulação de conquistas obtidas
        setConquistas([
            "Viaje 100 km sem emissões",
            "Primeira Recarga Sustentável",
            "Economize 500 reais em combustíveis",
        ]);
    };

    const carregarRanking = () => {
        // Simulação de posição no ranking
        setRanking(15); // Usuário está na posição 15
    };

    return (
        <div className="pontos-container mt-16">
            <h1 className="pontos-title">Seus Pontos e Conquistas</h1>

            {/* Seção de Pontos */}
            <section className="pontos-section">
                <h2 className="pontos-section-title">Seus Pontos</h2>
                <p className="pontos-value">{pontos} pontos</p>
            </section>

            {/* Seção de Carros */}
            <section className="pontos-section">
                <h2 className="pontos-section-title">Seus Carros</h2>
                {carros && carros.length > 0 ? (
                    carros.map((carro) => (
                        <div key={carro.idCarro} className="pontos-card">
                            <p className="pontos-card-title">
                                {carro.modelo} - {carro.marca} - Recarga: {carro.recarga} KW/h
                            </p>
                        </div>
                    ))
                ) : (
                    <p>Você não possui carros cadastrados.</p>
                )}
            </section>

            {/* Seção de Conquistas */}
            <section className="pontos-section">
                <h2 className="pontos-section-title">Conquistas</h2>
                {conquistas && conquistas.length > 0 ? (
                    <ul className="pontos-list">
                        {conquistas.map((conquista, index) => (
                            <li key={index} className="pontos-list-item">
                                🏆 {conquista}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Você ainda não possui conquistas. Continue acumulando pontos!</p>
                )}
            </section>

            {/* Ranking de Sustentabilidade */}
            <section className="pontos-section">
                <h2 className="pontos-section-title">Ranking de Sustentabilidade</h2>
                <p className="pontos-ranking">
                    Sua posição no ranking: <span className="pontos-ranking-value">{ranking}º</span>
                </p>
                <p>Continue economizando e evitando emissões para melhorar sua posição!</p>
            </section>
        </div>
    );
}
    