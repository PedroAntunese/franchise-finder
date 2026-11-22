import { limparDoc } from './documentos.js';

export function cpfValido(valor) {
  const cpf = limparDoc(valor);
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

  const calc = (tam) => {
    let soma = 0;
    for (let i = 0; i < tam; i++) soma += Number(cpf[i]) * (tam + 1 - i);
    const resto = (soma * 10) % 11;
    return resto === 10 ? 0 : resto;
  };

  return calc(9) === Number(cpf[9]) && calc(10) === Number(cpf[10]);
}
