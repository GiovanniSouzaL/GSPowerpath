import Link from "next/link";
import { FaHome, FaList, FaAddressCard } from "react-icons/fa";

function Cabecalho() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link href="/">PowerPath</Link>
        </div>
        <nav className="nav">
          <Link href="/" className="nav-link">
            <FaHome /> Início
          </Link>
          <Link href="/funcionalidades" className="nav-link">
            <FaList /> Funcionalidades
          </Link>
          <Link href="/dashboard" className="nav-link">
            <FaAddressCard /> Dashboard
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Cabecalho;
