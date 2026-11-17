import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import CampoTexto from "../components/CampoTexto";
import CamposEndereco from "../components/CamposEndereco";
import { cadastrarFranquia } from "../services/franquia";
import { validarFranquia } from "../utils/validacaoFranquia";
import { aplicarMascara, somenteDigitos } from "../utils/mascaras";
import "../styles/global.css";

const INICIAL = {
  cnpj: "", nomeFantasia: "", dataFundacao: "", email: "", senha: "", confirmar: "",
  cep: "", rua: "", bairro: "", complemento: "", numero: "", cidade: "", estado: "",
};

export default function CadastroFranquia() {
  const navigate = useNavigate();
  const [valores, setValores] = useState(INICIAL);
  const [erros, setErros] = useState({});
  const [aviso, setAviso] = useState({ texto: "", ok: false });
  const [enviando, setEnviando] = useState(false);

  const mudar = (e) => {
    const { name, value } = e.target;
    setValores((atual) => ({ ...atual, [name]: aplicarMascara(name, value) }));
  };

  const preencher = (endereco) => setValores((atual) => ({ ...atual, ...endereco }));

  async function enviar(e) {
    e.preventDefault();
    setAviso({ texto: "", ok: false });
    const novos = validarFranquia(valores);
    setErros(novos);
    if (Object.keys(novos).length) return;

    setEnviando(true);
    try {
      const { confirmar, ...dados } = valores;
      await cadastrarFranquia({
        ...dados,
        cnpj: somenteDigitos(dados.cnpj),
        cep: somenteDigitos(dados.cep),
      });
      setAviso({ texto: "Franquia cadastrada! Redirecionando para o login...", ok: true });
      setTimeout(() => navigate("/login?perfil=franqueador"), 1200);
    } catch (err) {
      setAviso({ texto: err.message, ok: false });
      setEnviando(false);
    }
  }

  return (
    <AuthLayout>
      <Link className="voltar" to="/">← Voltar</Link>
      <span className="etiqueta-perfil">Franqueador</span>
      <h1>Cadastro da franquia (matriz)</h1>
      <p className="sub">Informe os dados da empresa para cadastrar a sua franquia.</p>

      {aviso.texto && (
        <div className={`aviso visivel${aviso.ok ? " ok" : ""}`} role="alert">{aviso.texto}</div>
      )}
      <form onSubmit={enviar} noValidate>
        <CampoTexto id="cnpj" label="CNPJ" placeholder="00.000.000/0000-00"
          value={valores.cnpj} onChange={mudar} erro={erros.cnpj} />
        <CampoTexto id="nomeFantasia" label="Nome fantasia" autoComplete="organization"
          value={valores.nomeFantasia} onChange={mudar} erro={erros.nomeFantasia} />
        <CampoTexto id="dataFundacao" label="Data de fundação" type="date"
          value={valores.dataFundacao} onChange={mudar} erro={erros.dataFundacao} />
        <CampoTexto id="email" label="E-mail" type="email" placeholder="empresa@exemplo.com"
          autoComplete="email" value={valores.email} onChange={mudar} erro={erros.email} />
        <CampoTexto id="senha" label="Senha" senha autoComplete="new-password"
          value={valores.senha} onChange={mudar} erro={erros.senha} />
        <CampoTexto id="confirmar" label="Confirmar senha" senha autoComplete="new-password"
          value={valores.confirmar} onChange={mudar} erro={erros.confirmar} />

        <h2 className="grupo-titulo">Endereço da matriz</h2>
        <CamposEndereco valores={valores} erros={erros} onChange={mudar} onPreencher={preencher} />

        <button className="btn btn-primario btn-bloco" type="submit" disabled={enviando}>
          {enviando ? "Cadastrando..." : "Cadastrar franquia"}
        </button>
      </form>
    </AuthLayout>
  );
}