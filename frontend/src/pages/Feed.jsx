import React, { useState } from "react";
import { Link } from "react-router-dom";
import AppHeader from "../components/AppHeader";
import BannerCafe from "../components/BannerCafe";
import Icone from "../components/Icone";
import "../styles/Feed.css";

// Dados fixos por enquanto — depois vêm da API
const usuario = {
  nome: "Matheus Prado",
  primeiroNome: "Matheus",
  iniciais: "MP",
  perfil: "Investidor",
  cidade: "Sorocaba, SP",
  marcasSalvas: 12,
  visitas: 32,
  interesse: { segmentos: "Alimentação e Pets", faixa: "R$ 80 a 150 mil" },
};

const posts = [
  {
    id: 1,
    marca: "Café Delícia",
    logo: "Café",
    tempo: "2h",
    local: "Sorocaba, Av.SP",
    numeros: [
      { rotulo: "Investimento", valor: "R$ 95 mil" },
      { rotulo: "Retorno", valor: "18 a 24 meses" },
      { rotulo: "Unidades", valor: "142" },
    ],
    curtidas: 48,
    comentarios: 6,
    texto:
      "Estamos abrindo novas unidades no interior de São Paulo. Conheça o modelo de negócio e converse com quem já opera.",
    rota: "/franquia",
  },
];

const emAlta = [
  { nome: "Pão Dourado", segmento: "Alimentação", icone: "alimentacao" },
  { nome: "Barba Real", segmento: "Beleza", icone: "beleza" },
  { nome: "PetMais", segmento: "Pets", icone: "pets" },
];

function saudacao() {
  const hora = new Date().getHours();
  if (hora < 12) return "Bom dia";
  if (hora < 18) return "Boa tarde";
  return "Boa noite";
}

function Post({ post }) {
  const [curtido, setCurtido] = useState(false);
  const [salvo, setSalvo] = useState(false);

  return (
    <article className="fd-card fq-card">
      <header className="fd-post-topo">
        <div className="fd-post-logo">{post.logo}</div>
        <div className="fd-post-info">
          <div className="fd-post-nome">
            <strong>{post.marca}</strong>
            <span className="fq-tag">Franqueador</span>
          </div>
          <small>
            {post.tempo} · {post.local}
          </small>
        </div>
        <button type="button" className="fd-icone-btn" aria-label="Mais opções">
          <Icone nome="mais" />
        </button>
      </header>

      <BannerCafe altura={172} />

      <dl className="fd-numeros">
        {post.numeros.map((n) => (
          <div key={n.rotulo}>
            <dt>{n.rotulo}</dt>
            <dd>{n.valor}</dd>
          </div>
        ))}
      </dl>

      <div className="fd-interacoes">
        <button
          type="button"
          className={`fd-icone-btn${curtido ? " curtido" : ""}`}
          aria-pressed={curtido}
          aria-label="Curtir"
          onClick={() => setCurtido(!curtido)}
        >
          <Icone nome="curtir" />
          {post.curtidas + (curtido ? 1 : 0)}
        </button>
        <button type="button" className="fd-icone-btn" aria-label="Comentários">
          <Icone nome="comentar" />
          {post.comentarios}
        </button>
        <button
          type="button"
          className={`fd-icone-btn${salvo ? " salvo" : ""}`}
          aria-pressed={salvo}
          aria-label="Salvar"
          onClick={() => setSalvo(!salvo)}
        >
          <Icone nome="salvar" />
        </button>
      </div>

      <p className="fd-texto">{post.texto}</p>

      <div className="fd-rodape-post">
        <Link to={post.rota} className="fd-btn-detalhes">
          Ver Detalhes
        </Link>
      </div>
    </article>
  );
}

export default function Feed() {
  const [aba, setAba] = useState("para-voce");

  return (
    <div className="fq-page">
      <AppHeader ativo="inicio">
        <div className="fd-boas-vindas">
          <p>
            {saudacao()}, {usuario.primeiroNome}
          </p>
          <h1>Franquias para você em Sorocaba e região</h1>
        </div>
      </AppHeader>

      <div className="fd-abas" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={aba === "para-voce"}
          className={aba === "para-voce" ? "ativa" : ""}
          onClick={() => setAba("para-voce")}
        >
          Para Você
        </button>
        <span className="fd-abas-divisor" aria-hidden="true" />
        <button
          type="button"
          role="tab"
          aria-selected={aba === "explorar"}
          className={aba === "explorar" ? "ativa" : ""}
          onClick={() => setAba("explorar")}
        >
          Explorar
        </button>
      </div>

      <main className="fd-main">
        <aside className="fd-coluna">
          <section className="fq-card fd-perfil">
            <div className="fd-perfil-capa">
              <span aria-hidden="true">✦</span>
            </div>
            <div className="fd-perfil-corpo">
              <span className="fd-perfil-avatar">{usuario.iniciais}</span>
              <strong>{usuario.nome}</strong>
              <small>{usuario.perfil}</small>
              <small>{usuario.cidade}</small>

              <dl className="fd-perfil-numeros">
                <div>
                  <dt>Marcas salvas</dt>
                  <dd>{usuario.marcasSalvas}</dd>
                </div>
                <div>
                  <dt>Visitas</dt>
                  <dd>{usuario.visitas}</dd>
                </div>
              </dl>
            </div>
          </section>

          <section className="fq-card fd-box">
            <h2>Seu interesse</h2>
            <p>{usuario.interesse.segmentos}</p>
            <p>{usuario.interesse.faixa}</p>
          </section>
        </aside>

        <section className="fd-feed" aria-label="Publicações">
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </section>

        <aside className="fd-coluna">
          <section className="fq-card fd-box">
            <h2>Franquias em alta</h2>
            <ul className="fd-em-alta">
              {emAlta.map((f) => (
                <li key={f.nome}>
                  <span className="fd-em-alta-icone">
                    <Icone nome={f.icone} tamanho={16} />
                  </span>
                  <div>
                    <Link to="/franquia">{f.nome}</Link>
                    <small>{f.segmento}</small>
                  </div>
                </li>
              ))}
            </ul>
            <Link to="/franquias" className="fd-ver-todas">
              Ver todas
            </Link>
          </section>

          <footer className="fd-rodape">
            <nav>
              <Link to="/sobre">Sobre</Link> · <Link to="/ajuda">Ajuda</Link> ·{" "}
              <Link to="/privacidade">Privacidade</Link>
            </nav>
            <p>Franchise Finder © {new Date().getFullYear()}</p>
          </footer>
        </aside>
      </main>
    </div>
  );
}
