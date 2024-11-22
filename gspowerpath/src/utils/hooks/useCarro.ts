import { useState, useCallback } from "react";
import { Carro } from "@/types/types";
import {
    listarCarros,
    inserirCarro,
    alterarCarro as alterarCarroApi,
    atualizarPontosApi,
    recarregarBateriaApi,
} from "@/app/api/carro/route";

export const useCarros = () => {
    const [carros, setCarros] = useState<Carro[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [economiaFinanceira, setEconomiaFinanceira] = useState<number | null>(null);
    const [emissaoCO2, setEmissaoCO2] = useState<number | null>(null);

    // Buscar carros filtrados pelo ID do usuário
    const fetchCarros = useCallback(async (idUsuario: number) => {
        try {
            const data = await listarCarros();
            const carrosFiltrados = data.filter((carro) => carro.idUsuario === idUsuario);
            console.log("Carros carregados:", carrosFiltrados);
            setCarros(carrosFiltrados);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Erro desconhecido ao listar carros do usuário";
            console.error("Erro ao buscar carros:", message);
            setError(message);
        }
    }, []);

    // Adicionar novo carro
    const adicionarCarro = async (carro: Omit<Carro, "idCarro">) => {
        try {
            const novoCarro = await inserirCarro(carro);
            setCarros((prev) => (prev ? [...prev, novoCarro] : [novoCarro]));
        } catch (err) {
            console.error("Erro ao adicionar carro:", err);
            throw err;
        }
    };

    // Alterar carro existente
    const alterarCarro = async (idCarro: number, carro: Carro) => {
        try {
            const carroAtualizado = await alterarCarroApi(idCarro, carro);
            setCarros((prev) =>
                prev
                    ? prev.map((c) => (c.idCarro === idCarro ? carroAtualizado : c))
                    : null
            );
        } catch (err) {
            console.error("Erro ao alterar carro:", err);
            throw err;
        }
    };

    // Adicionar bateria ao carro
    const adicionarBateria = async (idCarro: number, quantidade: number) => {
        try {
            const carroAtualizado = await recarregarBateriaApi(idCarro, quantidade);
            setCarros((prev) =>
                prev
                    ? prev.map((c) => (c.idCarro === idCarro ? carroAtualizado : c))
                    : null
            );
            alert(`Bateria do carro atualizada com sucesso! Nova recarga: ${carroAtualizado.recarga}`);
        } catch (err) {
            console.error("Erro ao adicionar bateria:", err);
            throw err;
        }
    };

    // Atualizar pontos do usuário
    const atualizarPontos = async (idUsuario: number) => {
        try {
            await atualizarPontosApi(idUsuario);
            alert("Pontos atualizados com sucesso!");
        } catch (err) {
            console.error("Erro ao atualizar pontos:", err);
            throw err;
        }
    };

    // Calcular economia financeira
    const calcularEconomia = (distancia: number, precoCombustivel: number, precoEletricidade: number) => {
        const consumoCombustao = 12; // Km/L, média de veículos a combustão
        const consumoEletrico = 0.15; // KWh/Km, média de veículos elétricos

        const custoCombustao = (distancia / consumoCombustao) * precoCombustivel;
        const custoEletrico = distancia * consumoEletrico * precoEletricidade;

        const economia = custoCombustao - custoEletrico;
        setEconomiaFinanceira(economia);

        return economia;
    };

    // Calcular emissões de CO2 evitadas
    const calcularEmissaoCO2 = (distancia: number) => {
        const emissaoCombustaoPorKm = 120; // gramas de CO₂ por km (média de veículos a combustão)
        const emissaoEletricoPorKm = 0; // veículos elétricos não emitem diretamente

        const emissaoEvitada = distancia * (emissaoCombustaoPorKm - emissaoEletricoPorKm);
        setEmissaoCO2(emissaoEvitada);

        return emissaoEvitada;
    };

    return {
        carros,
        error,
        fetchCarros,
        adicionarCarro,
        alterarCarro,
        atualizarPontos,
        adicionarBateria,
        economiaFinanceira,
        emissaoCO2,
        calcularEconomia,
        calcularEmissaoCO2,
    };
};
