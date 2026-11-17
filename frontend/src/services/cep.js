import { somenteDigitos } from "../utils/mascaras";

export async function buscarCep(cep) {
  const limpo = somenteDigitos(cep);
  const resposta = await fetch(`https://viacep.com.br/ws/${limpo}/json/`);
  if (!resposta.ok) throw new Error("Não foi possível consultar o CEP.");
  const dados = await resposta.json();
  if (dados.erro) throw new Error("CEP não encontrado.");
  return {
    rua: dados.logradouro || "",
    bairro: dados.bairro || "",
    cidade: dados.localidade || "",
    estado: dados.uf || "",
  };
}