import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import CampoTexto from "../components/CampoTexto";
import CamposEndereco from "../components/CamposEndereco";
import usePerfil from "../hooks/usePerfil";
import { cadastrar } from "../services/auth";
import { validarCadastro } from "../utils/validacao";
import { validarResponsavel } from "../utils/validacaoFranquia";
import { aplicarMascara, somenteDigitos } from "../utils/mascaras";
import "../styles/global.css";

const INICIAL = {
  nome: "", sobrenome: "", idade: "", cpf: "", email: "", extra: "", senha: "", confirmar: "",
  cep: "", rua: "", bairro: "", complemento: "", numero: "", cidade: "", estado: "",
  termos: false,
};

export default function Cadastro() {
  const perfil = usePerfil();
  const navigate = useNavigate();
  const ehFranqueador = perfil.id === "franqueador";
  const [valores, setValores] = useState(INICIAL);
  const [erros, setErros] = useState({});
  const [aviso, setAviso] = useState({ texto: "", ok: false });
  const [enviando, setEnviando] = useState(false);

  const mudar = (e) => {
    const { name, type, value, checked } = e.target;
    setValores((atual) => ({
      ...atual,
      [name]: type === "checkbox" ? checked : aplicarMascara(name, value),
    }));
  };

  const preencher = (endereco) => setValores((atual) => ({ ...atual, ...endereco }));

  async function enviar(e) {
    e.preventDefault();
    setAviso({ texto: "", ok: false });
    const novos = ehFranqueador ? validarResponsavel(valores) : validarCadastro(valores, perfil);
    setErros(novos);
    if (Object.keys(novos).length) return;

    setEnviando(true);
    try {
      const v = valores;
      const dados = ehFranqueador
        ? {
            nome: v.nome, sobrenome: v.sobrenome, idade: Number(v.idade), cpf: somenteDigitos(v.cpf),
            email: v.email, senha: v.senha, cep: somenteDigitos(v.cep), rua: v.rua, bairro: v.bairro,
            complemento: v.complemento, numero: v.numero, cidade: v.cidade, estado: v.estado,
          }
        : { nome: v.nome, email: v.email, senha: v.senha, nomeUnidade: v.extra }; // nomeUnidade: só o franqueado preenche
      await cadastrar({ ...dados, perfil: perfil.id });
      setAviso({ texto: "Conta criada! Redirecionando para o login...", ok: true });
      setTimeout(() => navigate(`/login?perfil=${perfil.id}`), 1200);
    } catch (err) {
      setAviso({ texto: err.message, ok: false });
      setEnviando(false);
    }
  }

  return (
    <AuthLayout>
      <Link className="voltar" to="/">← Trocar perfil</Link>
      <span className="etiqueta-perfil">{perfil.nome}</span>
      <h1>Criar conta</h1>
      <p className="sub">
        {ehFranqueador
          ? "Informe os dados do responsável pela franquia."
          : "Preencha os dados abaixo para começar."}
      </p>

      {aviso.texto && (
        <div className={`aviso visivel${aviso.ok ? " ok" : ""}`} role="alert">{aviso.texto}</div>
      )}
      <form onSubmit={enviar} noValidate>
        {ehFranqueador ? (
          <>
            <h2 className="grupo-titulo">Dados pessoais</h2>
            <div className="grupo">
              <CampoTexto id="nome" label="Nome" autoComplete="given-name"
                value={valores.nome} onChange={mudar} erro={erros.nome} />
              <CampoTexto id="sobrenome" label="Sobrenome" autoComplete="family-name"
                value={valores.sobrenome} onChange={mudar} erro={erros.sobrenome} />
            </div>
            <div className="grupo">
              <CampoTexto id="idade" label="Idade"
                value={valores.idade} onChange={mudar} erro={erros.idade} />
              <CampoTexto id="cpf" label="CPF" placeholder="000.000.000-00"
                value={valores.cpf} onChange={mudar} erro={erros.cpf} />
            </div>
          </>
        ) : (
          <CampoTexto id="nome" label="Nome completo" autoComplete="name"
            value={valores.nome} onChange={mudar} erro={erros.nome} />
        )}
        <CampoTexto id="email" label="E-mail" type="email" placeholder="voce@exemplo.com"
          autoComplete="email" value={valores.email} onChange={mudar} erro={erros.email} />
        {!ehFranqueador && perfil.extra && (
          <CampoTexto id="extra" label={perfil.extra}
            value={valores.extra} onChange={mudar} erro={erros.extra} />
        )}
        {ehFranqueador && (
          <>
            <h2 className="grupo-titulo">Endereço</h2>
            <CamposEndereco valores={valores} erros={erros} onChange={mudar} onPreencher={preencher} />
          </>
        )}
        <CampoTexto id="senha" label="Senha" senha autoComplete="new-password"
          value={valores.senha} onChange={mudar} erro={erros.senha} />
        <CampoTexto id="confirmar" label="Confirmar senha" senha autoComplete="new-password"
          value={valores.confirmar} onChange={mudar} erro={erros.confirmar} />

        <label className="check">
          <input type="checkbox" name="termos" checked={valores.termos} onChange={mudar} />
          <span>Li e aceito os <a href="#termos">termos de uso</a> e a <a href="#privacidade">política de privacidade</a>.</span>
        </label>
        {erros.termos && <div className="erro erro-termos">{erros.termos}</div>}

        <button className="btn btn-primario btn-bloco" type="submit" disabled={enviando}>
          {enviando ? "Criando..." : "Criar conta"}
        </button>
      </form>
      <p className="rodape-form">
        Já tem conta? <Link to={`/login?perfil=${perfil.id}`}>Entrar</Link>
      </p>
    </AuthLayout>
  );
}