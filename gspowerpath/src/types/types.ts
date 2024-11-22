export type ParceiroProps = {
    logo: string;
    name: string;
    description: string;
  };

export type IconType = "charging_station" | "eco" | "route" | "medal" | "community";
export interface CardFuncionalidadeProps {
  titulo: string;
  descricao: string;
  icone: IconType;
}

export type Integrante = {
  rm: string;
  turma: string;
  foto: string;
  github: string;
  linkedin: string;
  nome: string;
};

export interface Usuario {
  idUsuario: number;
  nome: string;
  email: string;
  senha?: string; 
  pontos?: number; 
  status?: string; 
}

export type LoginResponse = {
  token: string;
  idUsuario: number; 
};

export interface Carro {
  idCarro: number; 
  modelo: string; 
  marca: string; 
  ano: number; 
  tipo: string; 
  quantidadeCarbono: number; 
  recarga: number; 
  idUsuario: number; 
}
