import { Link } from "react-router-dom";
import Icone from "./Icone";
import "../styles/AppHeader.css";

const MENU = [
  { id: "inicio", rotulo: "Início", rota: "/feed" },
  { id: "rede", rotulo: "Rede", rota: "/rede" },
  { id: "franquias", rotulo: "Franquias", rota: "/franquia" },
  { id: "mensagens", rotulo: "Mensagens", rota: "/mensagens" },
  { id: "avisos", rotulo: "Avisos", rota: "/avisos", badge: 3 },
];

// Cabeçalho azul das telas internas. `ativo` destaca o item do menu;
// `children` é renderizado dentro da faixa azul, abaixo do menu.
export default function AppHeader({ ativo, children }) {
  return (
    <header className="fq-header">
      <div className="fq-header-inner">
        <Link to="/feed" className="fq-logo">
          <span className="fq-logo-star" aria-hidden="true">✦</span>
          <span>
            Franchise<em>Finder</em>
          </span>
        </Link>

        <label className="fq-search">
          <Icone nome="busca" tamanho={16} />
          <input type="search" placeholder="Buscar marcas" aria-label="Buscar marcas" />
        </label>

        <nav className="fq-nav">
          {MENU.map((item) => (
            <Link
              key={item.id}
              to={item.rota}
              className={`fq-nav-item${ativo === item.id ? " ativo" : ""}`}
            >
              <span className="fq-nav-icon">
                <Icone nome={item.id} />
                {item.badge && <span className="fq-badge">{item.badge}</span>}
              </span>
              {item.rotulo}
            </Link>
          ))}

          <span className="fq-nav-divider" aria-hidden="true" />

          <Link to="/perfil" className="fq-nav-item">
            <span className="fq-avatar-mini">MP</span>
            Eu
          </Link>
        </nav>
      </div>

      {children && <div className="fq-header-extra">{children}</div>}
    </header>
  );
}
