export default function NotFound() {
    return (
      <div className="notfound-container">
        <h1 className="notfound-title">404</h1>
        <p className="notfound-message">Pagina não encontrada</p>
        <p className="notfound-description">
          Desculpa, a pagina que você está procurando não existe.
        </p>
        <a href="/" className="notfound-link">
          INICIO
        </a>
      </div>
    );
  }
  