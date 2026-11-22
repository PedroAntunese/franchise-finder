import { useState } from "react";
import CampoTexto from "./CampoTexto";
import { buscarCep } from "../services/cep";
import { somenteDigitos } from "../utils/mascaras";

export default function CamposEndereco({ valores, erros, onChange, onPreencher }) {
  const [buscando, setBuscando] = useState(false);
  const [erroCep, setErroCep] = useState("");

  async function consultar(cep) {
    setBuscando(true);
    setErroCep("");
    try {
      onPreencher(await buscarCep(cep));
    } catch (err) {
      setErroCep(err.message);
    } finally {
      setBuscando(false);
    }
  }

  function mudarCep(e) {
    onChange(e);
    if (somenteDigitos(e.target.value).length === 8) consultar(e.target.value);
  }

  return (
    <>
      <CampoTexto id="cep" label={buscando ? "CEP (buscando...)" : "CEP"} placeholder="00000-000"
        autoComplete="postal-code" value={valores.cep} onChange={mudarCep} erro={erros.cep || erroCep} />
      <CampoTexto id="rua" label="Rua" autoComplete="address-line1"
        value={valores.rua} onChange={onChange} erro={erros.rua} />
      <div className="grupo">
        <CampoTexto id="bairro" label="Bairro"
          value={valores.bairro} onChange={onChange} erro={erros.bairro} />
        <CampoTexto id="complemento" label="Complemento"
          value={valores.complemento} onChange={onChange} erro={erros.complemento} />
      </div>
      <div className="grupo tres">
        <CampoTexto id="numero" label="Número"
          value={valores.numero} onChange={onChange} erro={erros.numero} />
        <CampoTexto id="cidade" label="Cidade" autoComplete="address-level2"
          value={valores.cidade} onChange={onChange} erro={erros.cidade} />
        <CampoTexto id="estado" label="Estado" placeholder="UF" autoComplete="address-level1"
          value={valores.estado} onChange={onChange} erro={erros.estado} />
      </div>
    </>
  );
}