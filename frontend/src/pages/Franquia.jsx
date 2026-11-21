import React from "react";
import { Link } from "react-router-dom";
import "../styles/Franquia.css";

const franquia = {
  nome: "Café Delícia",
  logo: "Café",
  categoria: "Alimentação",
  cidade: "Sorocaba, SP",
  desde: 2014,
  numeros: [
    { rotulo: "Investimento total", valor: "R$ 95 mil" },
    { rotulo: "Taxa de franquia", valor: "R$ 25 mil" },
    { rotulo: "Retorno", valor: "18 a 24 meses" },
    { rotulo: "Faturamento médio", valor: "R$ 68 mil/mês" },
    { rotulo: "Unidades", valor: "142" },
    { rotulo: "Contrato", valor: "5 anos" },
  ],
  sobre:
    "Rede de cafeterias fundada em 2014, com foco em café especial e atendimento próximo. Modelo enxuto, de 60 m², com suporte de implantação e treinamento contínuo.",
  incluso: [
    "Treinamento completo",
    "Projeto da loja",
    "Suporte de marketing",
    "Sistema de gestão",
  ],
  contato: { nome: "Carla Mendes", iniciais: "CM", cargo: "Expansão" },
  unidades: ["Sorocaba · Av. SP", "Votorantim · Centro", "Itu · Shopping"],
};

const menu = [
  { rotulo: "Início", icone: "inicio", rota: "/inicio" },
  { rotulo: "Rede", icone: "rede", rota: "/rede" },
  { rotulo: "Franquias", icone: "franquias", rota: "/franquia", ativo: true },
  { rotulo: "Mensagens", icone: "mensagens", rota: "/mensagens" },
  { rotulo: "Avisos", icone: "avisos", rota: "/avisos", badge: 3 },
];

function Icone({ nome }) {
  const props = {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };

  switch (nome) {
    case "inicio":
      return (
        <svg {...props}>
          <path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />
        </svg>
      );
    case "rede":
      return (
        <svg {...props}>
          <circle cx="9" cy="8" r="3.5" />
          <path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" />
          <path d="M16 4.6a3.5 3.5 0 0 1 0 6.8M18 14.3c2.1.7 3.5 2.8 3.5 5.7" />
        </svg>
      );
    case "franquias":
      return (
        <svg {...props}>
          <path d="M4 9l1.5-5h13L20 9" />
          <path d="M4 9a2.7 2.7 0 0 0 5.3 0 2.7 2.7 0 0 0 5.4 0A2.7 2.7 0 0 0 20 9" />
          <path d="M5 12v8h14v-8M10 20v-5h4v5" />
        </svg>
      );
    case "mensagens":
      return (
        <svg {...props}>
          <path d="M4 4h16v12H8l-4 4z" />
          <path d="M8 9h8M8 12h5" />
        </svg>
      );
    case "avisos":
      return (
        <svg {...props}>
          <path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15z" />
          <path d="M10 21h4" />
        </svg>
      );
    case "busca":
      return (
        <svg {...props} width={16} height={16} strokeWidth={2.5}>
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-4-4" />
        </svg>
      );
    case "salvar":
      return (
        <svg {...props} width={18} height={18}>
          <path d="M6 3h12v18l-6-4-6 4z" />
        </svg>
      );
    case "check":
      return (
        <svg {...props} width={16} height={16}>
          <circle cx="12" cy="12" r="9" />
          <path d="M8 12l3 3 5-6" />
        </svg>
      );
    default:
      return null;
  }
}

function Banner() {
  return (
    <svg
      className="fq-banner"
      viewBox="0 0 486 158"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <rect width="486" height="158" fill="#4a3426" />
      <rect y="0" width="486" height="55" fill="#3d2a1e" />
      <rect y="108" width="486" height="50" fill="#7a5236" />
      <rect x="22" y="12" width="72" height="68" fill="#e2d2b3" />
      <rect x="376" y="12" width="72" height="68" fill="#e2d2b3" />
      <circle cx="182" cy="31" r="11" fill="#f2c96b" />
      <circle cx="242" cy="34" r="11" fill="#f2c96b" />
      <circle cx="303" cy="27" r="11" fill="#f2c96b" />
      <rect x="268" y="78" width="196" height="30" fill="#8e5e3e" />
      <circle cx="352" cy="56" r="14" fill="#f1cda8" />
      <rect x="340" y="71" width="26" height="36" rx="3" fill="#f4f4f4" />
      <circle cx="109" cy="92" r="13" fill="#e8b98e" />
      <rect x="96" y="106" width="27" height="28" rx="3" fill="#c0603c" />
      <circle cx="170" cy="96" r="13" fill="#c98b62" />
      <rect x="157" y="109" width="27" height="29" rx="3" fill="#4a7095" />
    </svg>
  );
}

export default function Franquia() {
  return (
    <div className="fq-page">
      <header className="fq-header">
        <div className="fq-header-inner">
          <Link to="/inicio" className="fq-logo">
            <span className="fq-logo-star" aria-hidden="true">✦</span>
            <span>
              Franchise<em>Finder</em>
            </span>
          </Link>

          <label className="fq-search">
            <Icone nome="busca" />
            <input type="search" placeholder="Buscar marcas" aria-label="Buscar marcas" />
          </label>

          <nav className="fq-nav">
            {menu.map((item) => (
              <Link
                key={item.rotulo}
                to={item.rota}
                className={`fq-nav-item${item.ativo ? " ativo" : ""}`}
              >
                <span className="fq-nav-icon">
                  <Icone nome={item.icone} />
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
      </header>

      <main className="fq-main">
        <article className="fq-card fq-detalhe">
          <Banner />

          <div className="fq-topo">
            <div className="fq-logo-marca">{franquia.logo}</div>

            <div className="fq-titulo">
              <h1>{franquia.nome}</h1>
              <span className="fq-tag">Franqueador</span>
            </div>
            <p className="fq-subtitulo">
              {franquia.categoria} · {franquia.cidade} · desde {franquia.desde}
            </p>

            <div className="fq-acoes">
              <button type="button" className="fq-btn fq-btn-primario">
                Tenho interesse
              </button>
              <button type="button" className="fq-btn fq-btn-secundario">
                Conversar
              </button>
              <button type="button" className="fq-btn-icone" aria-label="Salvar franquia">
                <Icone nome="salvar" />
              </button>
            </div>
          </div>

          <dl className="fq-numeros">
            {franquia.numeros.map((n) => (
              <div key={n.rotulo} className="fq-numero">
                <dt>{n.rotulo}</dt>
                <dd>{n.valor}</dd>
              </div>
            ))}
          </dl>

          <section className="fq-secao">
            <h2>Sobre a franquia</h2>
            <p>{franquia.sobre}</p>
          </section>

          <section className="fq-secao">
            <h2>O que está incluso</h2>
            <ul className="fq-incluso">
              {franquia.incluso.map((item) => (
                <li key={item}>
                  <Icone nome="check" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </article>

        <aside className="fq-lateral">
          <section className="fq-card fq-box">
            <h2>Fale com a marca</h2>
            <div className="fq-contato">
              <span className="fq-avatar">{franquia.contato.iniciais}</span>
              <div>
                <strong>{franquia.contato.nome}</strong>
                <small>{franquia.contato.cargo}</small>
              </div>
            </div>
            <button type="button" className="fq-btn fq-btn-primario fq-btn-bloco">
              Enviar mensagem
            </button>
          </section>

          <section className="fq-card fq-box">
            <h2>Unidades próximas</h2>
            <ul className="fq-unidades">
              {franquia.unidades.map((u) => (
                <li key={u}>{u}</li>
              ))}
            </ul>
          </section>
        </aside>
      </main>
    </div>
  );
}
