import { FaGithub, FaUsers } from "react-icons/fa";
import Link from "next/link";

function Rodape() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>&copy; {new Date().getFullYear()} PowerPath. Todos os direitos reservados.</p>
        <div className="social-links">
          <a href="https://github.com/GiovanniSouzaL/GSPowerpath" target="_blank" rel="noopener noreferrer">
            <FaGithub className="social-icon" /> GitHub do Projeto
          </a>
          <Link href="/integrantes" className="social-icon">
            <FaUsers className="social-icon" /> Equipe
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Rodape;
