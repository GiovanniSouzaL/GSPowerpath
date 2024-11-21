import Image from "next/image";
import { ParceiroProps } from "@/types/types";

function ParceiroCard({ logo, name, description }: ParceiroProps) {
  return (
    <div className="partner-card">
      <Image src={logo} alt={`${name} logo`} width={100} height={100} />
      <h4>{name}</h4>
      <p>{description}</p>
    </div>
  );
}

export default ParceiroCard;
