import { FaChargingStation, FaLeaf, FaRoute, FaMedal, FaUsers } from "react-icons/fa";
import { CardFuncionalidadeProps, IconType } from "@/types/types";

function CardFuncionalidade({ titulo, descricao, icone }: CardFuncionalidadeProps) {
  const iconMap: Record<IconType, JSX.Element> = {
    charging_station: <FaChargingStation />,
    eco: <FaLeaf />,
    route: <FaRoute />,
    medal: <FaMedal />,
    community: <FaUsers />,
  };

  const IconElement = iconMap[icone];

  return (
    <div className="card-funcionalidade">
      <div className="icon">{IconElement}</div>
      <h3 className="card-title">{titulo}</h3>
      <p className="card-description">{descricao}</p>
    </div>
  );
}

export default CardFuncionalidade;
