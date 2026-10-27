import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import CampoTexto from "../components/CampoTexto";
import usePerfil from "../hooks/usePerfil";
import { cadastrar } from "../services/auth";
import { validarCadastro } from "../utils/validacao";
import "../styles/Cadastro.css";

const INICIAL = { nome: "", email: "", extra: "", senha: "", confirmar: "", termos: false };

export default function Cadastro() {
  const perfil = usePerfil();
  const navigate = useNavigate();
  const [valores, setValores] = useState(INICIAL);
  const [erros, setErros] = useState({});
  const [aviso, setAviso] = useState({ texto: "", ok: false });
  const [enviando, setEnviando] = useState(false);

  const mudar = (e) => {
    const { name, type, value, checked } = e.target;
    setValores({ ...valores, [name]: type === "checkbox" ? checked : value });
  };

  async function enviar(e) {
    e.preventDefault();
    setAviso({ texto: "", ok: false });
    const novos = validarCadastro(valores, perfil);
    setErros(novos);
    if (Object.keys(novos).length) return;

    setEnviando(true);
    try {
      const { confirmar, termos, ...dados } = valores;
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
      <p className="sub">Preencha os dados abaixo para começar.</p>

      {aviso.texto && (
        <div className={`aviso visivel${aviso.ok ? " ok" : ""}`} role="alert">{aviso.texto}</div>
      )}
      <form onSubmit={enviar} noValidate>
        <CampoTexto id="nome" label="Nome completo" autoComplete="name"
          value={valores.nome} onChange={mudar} erro={erros.nome} />
        <CampoTexto id="email" label="E-mail" type="email" placeholder="voce@exemplo.com"
          autoComplete="email" value={valores.email} onChange={mudar} erro={erros.email} />
        {perfil.extra && (
          <CampoTexto id="extra" label={perfil.extra}
            value={valores.extra} onChange={mudar} erro={erros.extra} />
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
