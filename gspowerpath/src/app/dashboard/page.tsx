"use client";

import { useEffect, useState } from "react";
import { useCarros } from "@/utils/hooks/useCarro";
import { useApi } from "@/utils/hooks/useApi";
import { Carro } from "@/types/types";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const { idUsuario } = useApi();
    const {
        carros,
        fetchCarros,
        adicionarCarro,
        alterarCarro,
        calcularEconomia,
        calcularEmissaoCO2,
        economiaFinanceira,
        emissaoCO2,
        atualizarPontos,
    } = useCarros();
    const router = useRouter();

    const [novoCarro, setNovoCarro] = useState<Omit<Carro, "idCarro">>({
        modelo: "",
        marca: "",
        ano: 0,
        tipo: "",
        quantidadeCarbono: 0,
        recarga: 0,
        idUsuario: idUsuario!,
    });

    const [distancia, setDistancia] = useState<number>(0);
    const [carroSelecionado, setCarroSelecionado] = useState<Carro | null>(null);
    const [carroEditando, setCarroEditando] = useState<Carro | null>(null);

    useEffect(() => {
        if (idUsuario) {
            fetchCarros(idUsuario);
        }
    }, [idUsuario, fetchCarros]);

    const handleAdicionarCarro = async () => {
        try {
            if (!novoCarro.modelo || !novoCarro.marca || !novoCarro.ano || !novoCarro.tipo) {
                alert("Preencha todos os campos obrigatórios.");
                return;
            }

            await adicionarCarro(novoCarro);
            alert("Carro inserido com sucesso!");
            setNovoCarro({
                modelo: "",
                marca: "",
                ano: 0,
                tipo: "",
                quantidadeCarbono: 0,
                recarga: 0,
                idUsuario: idUsuario!,
            });
        } catch (error) {
            console.error("Erro ao adicionar carro:", error);
            alert(
                error instanceof Error
                    ? `Erro ao adicionar carro: ${error.message}`
                    : "Erro desconhecido ao adicionar carro."
            );
        }
    };

    const handleSalvarEdicao = async () => {
        if (!carroEditando) return;

        try {
            if (!carroEditando.modelo || !carroEditando.marca || !carroEditando.ano || !carroEditando.tipo) {
                alert("Preencha todos os campos obrigatórios.");
                return;
            }

            await alterarCarro(carroEditando.idCarro!, carroEditando);
            alert("Carro atualizado com sucesso!");
            setCarroEditando(null);
        } catch (error) {
            console.error("Erro ao salvar alterações:", error);
            alert(
                error instanceof Error
                    ? `Erro ao salvar alterações: ${error.message}`
                    : "Erro desconhecido ao salvar alterações."
            );
        }
    };

    const handleCalcularImpacto = () => {
        if (!carroSelecionado) {
            alert("Selecione um carro para calcular o impacto.");
            return;
        }

        if (distancia <= 0) {
            alert("Insira uma distância válida.");
            return;
        }

        calcularEconomia(distancia, 0, 0.9); // Eletricidade em R$/KW/h
        calcularEmissaoCO2(distancia);
    };

    const handleAtualizarPontos = async () => {
        if (!carroSelecionado) {
            alert("Selecione um carro para atualizar os pontos.");
            return;
        }

        if (carroSelecionado.recarga > 1) {
            try {
                await atualizarPontos(carroSelecionado.idCarro!);
                alert("Pontos atualizados com sucesso!");
            } catch (error) {
                console.error("Erro ao atualizar pontos:", error);
                alert(
                    error instanceof Error
                        ? `Erro ao atualizar pontos: ${error.message}`
                        : "Erro desconhecido ao atualizar pontos."
                );
            }
        } else {
            alert("O carro não tem recarga suficiente para atualizar os pontos.");
        }
    };

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">Gerenciar Carros e Impacto Ambiental</h1>

            {/* Botão para Página Conta */}
            <div className="mb-6">
                <button
                    onClick={() => router.push("/conta")}
                    className="dashboard-button bg-blue-500 hover:bg-blue-600"
                >
                    Ir para Minha Conta
                </button>
            </div>

            {/* Adicionar Novo Carro */}
            <section className="dashboard-section">
                <h2 className="dashboard-section-title">Adicionar Novo Carro</h2>
                <input
                    type="text"
                    placeholder="Modelo"
                    value={novoCarro.modelo}
                    onChange={(e) => setNovoCarro({ ...novoCarro, modelo: e.target.value })}
                    className="dashboard-input"
                />
                <input
                    type="text"
                    placeholder="Marca"
                    value={novoCarro.marca}
                    onChange={(e) => setNovoCarro({ ...novoCarro, marca: e.target.value })}
                    className="dashboard-input"
                />
                <input
                    type="number"
                    placeholder="Ano"
                    value={novoCarro.ano || ""}
                    onChange={(e) =>
                        setNovoCarro({ ...novoCarro, ano: e.target.value ? parseInt(e.target.value) : 0 })
                    }
                    className="dashboard-input"
                />
                <input
                    type="text"
                    placeholder="Tipo (Ex: Hibrido)"
                    value={novoCarro.tipo}
                    onChange={(e) => setNovoCarro({ ...novoCarro, tipo: e.target.value })}
                    className="dashboard-input"
                />
                <input
                    type="number"
                    placeholder="Recarga Inicial (KW/h)"
                    value={novoCarro.recarga || ""}
                    onChange={(e) =>
                        setNovoCarro({ ...novoCarro, recarga: e.target.value ? parseFloat(e.target.value) : 0 })
                    }
                    className="dashboard-input"
                />
                <button onClick={handleAdicionarCarro} className="dashboard-button">
                    Adicionar Carro
                </button>
            </section>

            {/* Impacto Ambiental */}
            <section className="dashboard-section">
                <h2 className="dashboard-section-title">Impacto Ambiental</h2>
                <select
                    className="dashboard-input"
                    onChange={(e) => {
                        const carroId = parseInt(e.target.value);
                        const carro = carros?.find((c) => c.idCarro === carroId) || null;
                        setCarroSelecionado(carro);
                    }}
                >
                    <option value="">Selecione um carro</option>
                    {carros &&
                        carros.map((carro) => (
                            <option key={carro.idCarro} value={carro.idCarro}>
                                {carro.modelo} - {carro.marca}
                            </option>
                        ))}
                </select>
                <input
                    type="number"
                    placeholder="Distância percorrida (Km)"
                    value={distancia || ""}
                    onChange={(e) => setDistancia(parseFloat(e.target.value))}
                    className="dashboard-input"
                />
                <button
                    onClick={handleCalcularImpacto}
                    className="dashboard-button bg-green-500 hover:bg-green-600"
                >
                    Calcular Impacto
                </button>
                <button
                    onClick={handleAtualizarPontos}
                    className="dashboard-button bg-yellow-500 hover:bg-yellow-600 ml-4"
                >
                    Atualizar Pontos
                </button>
            </section>

            {/* Resultados */}
            <section className="dashboard-section">
                <h2 className="dashboard-section-title">Resultados</h2>
                <p>Economia Financeira: R$ {economiaFinanceira?.toFixed(2) || "0.00"}</p>
                <p>Redução de Emissões de CO₂: {emissaoCO2?.toFixed(2) || "0"} g</p>
            </section>

            {/* Lista de Carros */}
            <section className="dashboard-section">
                <h2 className="dashboard-section-title">Carros</h2>
                {carros && carros.length > 0 ? (
                    carros.map((carro) => (
                        <div key={carro.idCarro} className="dashboard-card">
                            <p className="dashboard-card-title">
                                {carro.modelo} - {carro.marca} - {carro.ano} - {carro.tipo} - Recarga:{" "}
                                {carro.recarga} KW/h
                            </p>
                            <div className="dashboard-card-actions">
                                <button
                                    className="dashboard-button-secondary"
                                    onClick={() => setCarroEditando(carro)}
                                >
                                    Editar
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Nenhum carro encontrado.</p>
                )}
            </section>

            {/* Modal de Edição */}
            {carroEditando && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Editar Carro</h2>
                        <input
                            type="text"
                            placeholder="Modelo"
                            value={carroEditando.modelo}
                            onChange={(e) =>
                                setCarroEditando({ ...carroEditando, modelo: e.target.value })
                            }
                            className="dashboard-input"
                        />
                        <input
                            type="text"
                            placeholder="Marca"
                            value={carroEditando.marca}
                            onChange={(e) =>
                                setCarroEditando({ ...carroEditando, marca: e.target.value })
                            }
                            className="dashboard-input"
                        />
                        <input
                            type="number"
                            placeholder="Ano"
                            value={carroEditando.ano || ""}
                            onChange={(e) =>
                                setCarroEditando({
                                    ...carroEditando,
                                    ano: e.target.value ? parseInt(e.target.value) : 0,
                                })
                            }
                            className="dashboard-input"
                        />
                        <input
                            type="text"
                            placeholder="Tipo (Ex: Hibrido)"
                            value={carroEditando.tipo}
                            onChange={(e) =>
                                setCarroEditando({ ...carroEditando, tipo: e.target.value })
                            }
                            className="dashboard-input"
                        />
                        <input
                            type="number"
                            placeholder="Recarga (KW/h)"
                            value={carroEditando.recarga || ""}
                            onChange={(e) =>
                                setCarroEditando({
                                    ...carroEditando,
                                    recarga: e.target.value ? parseFloat(e.target.value) : 0,
                                })
                            }
                            className="dashboard-input"
                        />
                        <button onClick={handleSalvarEdicao} className="dashboard-button">
                            Salvar Alterações
                        </button>
                        <button
                            onClick={() => setCarroEditando(null)}
                            className="dashboard-button-secondary"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
