import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import CampoTexto from "../components/CampoTexto";
import usePerfil from "../hooks/usePerfil";
import { login } from "../services/auth";
import { validarLogin } from "../utils/validacao";
import "../styles/global.css";

export default function Login() {
  const perfil = usePerfil();
  const navigate = useNavigate();
  const [valores, setValores] = useState({ email: "", senha: "" });
  const [erros, setErros] = useState({});
  const [aviso, setAviso] = useState("");
  const [enviando, setEnviando] = useState(false);

  const mudar = (e) => setValores({ ...valores, [e.target.name]: e.target.value });

  async function enviar(e) {
    e.preventDefault();
    setAviso("");
    const novos = validarLogin(valores);
    setErros(novos);
    if (Object.keys(novos).length) return;

    setEnviando(true);
    try {
      await login({ ...valores, perfil: perfil.id });
      navigate("/feed"); // por enquanto todos os perfis vão para o mesmo Feed
    } catch (err) {
      setAviso(err.message);
      setEnviando(false);
    }
  }

  return (
    <AuthLayout>
      <Link className="voltar" to="/">← Trocar perfil</Link>
      <span className="etiqueta-perfil">{perfil.nome}</span>
      <h1>Entrar na sua conta</h1>
      <p className="sub">Use seu e-mail e senha para continuar.</p>

      {aviso && <div className="aviso visivel" role="alert">{aviso}</div>}
      <form onSubmit={enviar} noValidate>
        <CampoTexto id="email" label="E-mail" type="email" placeholder="voce@exemplo.com"
          autoComplete="email" value={valores.email} onChange={mudar} erro={erros.email} />
        <CampoTexto id="senha" label="Senha" senha autoComplete="current-password"
          value={valores.senha} onChange={mudar} erro={erros.senha} />
        <div className="linha">
          <label className="lembrar"><input type="checkbox" /> Manter conectado</label>
          <Link to={`/esqueci-senha?perfil=${perfil.id}`}>Esqueci a senha</Link>
        </div>
        <button className="btn btn-primario btn-bloco" type="submit" disabled={enviando}>
          {enviando ? "Entrando..." : "Entrar"}
        </button>
      </form>
      <p className="rodape-form">
        Ainda não tem conta? <Link to={`/cadastro?perfil=${perfil.id}`}>Criar conta</Link>
      </p>
    </AuthLayout>
  );
}
