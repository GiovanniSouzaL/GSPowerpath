import Image from "next/image";
import { Integrante } from "@/types/types";

function TeamCard({ integrante }: { integrante: Integrante }) {
  return (
    <div className="team-card">
      <Image
        src={integrante.foto}
        alt={`Foto de ${integrante.nome}`}
        width={120}
        height={120}
        className="team-image"
      />
      <h2 className="team-name">{integrante.nome}</h2>
      <p className="team-info">RM: {integrante.rm}</p>
      <p className="team-info">Turma: {integrante.turma}</p>
      <div className="team-links">
        <a href={integrante.github} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        {" | "}
        <a href={integrante.linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
      </div>
    </div>
  );
}

export default TeamCard;
