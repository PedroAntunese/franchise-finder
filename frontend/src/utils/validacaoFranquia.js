import { somenteDigitos } from "./mascaras";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function cnpjValido(valor) {
  const n = somenteDigitos(valor);
  if (n.length !== 14 || /^(\d)\1+$/.test(n)) return false;
  const digito = (base) => {
    let soma = 0;
    let peso = base.length - 7;
    for (const d of base) {
      soma += Number(d) * peso--;
      if (peso < 2) peso = 9;
    }
    const resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
  };
  const base = n.slice(0, 12);
  const d1 = digito(base);
  const d2 = digito(base + d1);
  return n === base + d1 + d2;
}

export function cpfValido(valor) {
  const n = somenteDigitos(valor);
  if (n.length !== 11 || /^(\d)\1+$/.test(n)) return false;
  const digito = (base) => {
    let soma = 0;
    for (let i = 0; i < base.length; i++) soma += Number(base[i]) * (base.length + 1 - i);
    const resto = (soma * 10) % 11;
    return resto === 10 ? 0 : resto;
  };
  const base = n.slice(0, 9);
  const d1 = digito(base);
  const d2 = digito(base + d1);
  return n === base + d1 + d2;
}

function validarEndereco(v) {
  const e = {};
  if (somenteDigitos(v.cep).length !== 8) e.cep = "Informe um CEP válido.";
  if (!v.rua.trim()) e.rua = "Informe a rua.";
  if (!v.bairro.trim()) e.bairro = "Informe o bairro.";
  if (!v.numero.trim()) e.numero = "Informe o número.";
  if (!v.cidade.trim()) e.cidade = "Informe a cidade.";
  if (v.estado.length !== 2) e.estado = "Use a sigla (UF).";
  return e;
}

function validarAcesso(v) {
  const e = {};
  if (!EMAIL.test(v.email.trim())) e.email = "Informe um e-mail válido.";
  if (v.senha.length < 8) e.senha = "A senha deve ter pelo menos 8 caracteres.";
  if (v.confirmar !== v.senha) e.confirmar = "As senhas não conferem.";
  return e;
}

export function validarFranquia(v) {
  const e = { ...validarAcesso(v), ...validarEndereco(v) };
  if (!cnpjValido(v.cnpj)) e.cnpj = "Informe um CNPJ válido.";
  if (!v.nomeFantasia.trim()) e.nomeFantasia = "Informe o nome fantasia.";
  if (!v.dataFundacao) e.dataFundacao = "Informe a data de fundação.";
  else if (new Date(v.dataFundacao) > new Date()) e.dataFundacao = "A data não pode ser futura.";
  return e;
}

export function validarResponsavel(v) {
  const e = { ...validarAcesso(v), ...validarEndereco(v) };
  const idade = Number(v.idade);
  if (!v.nome.trim()) e.nome = "Informe o nome.";
  if (!v.sobrenome.trim()) e.sobrenome = "Informe o sobrenome.";
  if (!idade || idade < 18 || idade > 120) e.idade = "Informe uma idade válida (18+).";
  if (!cpfValido(v.cpf)) e.cpf = "Informe um CPF válido.";
  if (!v.termos) e.termos = "É preciso aceitar os termos para continuar.";
  return e;
}