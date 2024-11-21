"use client";

import CardFuncionalidade from "@/components/CardFuncionalidade/CardFuncionalidade";
import { useRouter } from "next/navigation";

const funcionalidades = [
  {
    titulo: "Localização de Pontos de Recarga",
    descricao: "Encontre pontos de recarga próximos e veja informações sobre disponibilidade, custo e tipo de carregador.",
    icone: "charging_station",
  },
  {
    titulo: "Economia e Impacto Ambiental",
    descricao: "Veja o quanto você economiza e as emissões de CO₂ evitadas ao usar um veículo elétrico.",
    icone: "eco",
  },
  {
    titulo: "Planejamento de Rotas",
    descricao: "Planeje viagens com paradas estratégicas para recarga, considerando o nível da bateria e tempo de viagem.",
    icone: "route",
  },
  {
    titulo: "Gamificação",
    descricao: "Participe de desafios, ganhe recompensas e suba no ranking de sustentabilidade.",
    icone: "medal",
  },
  {
    titulo: "Comunidade",
    descricao: "Compartilhe experiências e obtenha dicas de outros usuários de veículos elétricos.",
    icone: "community",
  },
];

function FuncionalidadesPage() {
  const router = useRouter();

  const handleNavigateToLogin = () => {
    router.push("/login");
  };

  return (
    <div className="funcionalidades-container">
      <h1 className="page-title">Funcionalidades do PowerPath</h1>
      <div className="funcionalidades-grid">
        {funcionalidades.map((func, index) => (
          <CardFuncionalidade
            key={index}
            titulo={func.titulo}
            descricao={func.descricao}
            icone={func.icone as "charging_station" | "eco" | "route" | "medal" | "community"}
          />
        ))}
      </div>
      <button onClick={handleNavigateToLogin} className="btn-primary">
        Entrar na Conta
      </button>
    </div>
  );
}

export default FuncionalidadesPage;