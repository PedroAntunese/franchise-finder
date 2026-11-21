import React from "react";
import AppHeader from "../components/AppHeader";
import BannerCafe from "../components/BannerCafe";
import Icone from "../components/Icone";
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

export default function Franquia() {
  return (
    <div className="fq-page">
      <AppHeader ativo="franquias" />

      <main className="fq-main">
        <article className="fq-card fq-detalhe">
          <BannerCafe />

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
                <Icone nome="salvar" tamanho={18} />
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
                  <Icone nome="check" tamanho={16} />
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
