export function limparDoc(valor) {
  return String(valor ?? '').replace(/\D/g, '');
}

export function cnpjValido(valor) {
  const cnpj = limparDoc(valor);
  if (cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) return false;

  const calc = (tam) => {
    const pesos =
      tam === 12
        ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
        : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    let soma = 0;
    for (let i = 0; i < tam; i++) soma += Number(cnpj[i]) * pesos[i];
    const resto = soma % 11;
    return resto < 2 ? 0 : 11 - resto;
  };

  return calc(12) === Number(cnpj[12]) && calc(13) === Number(cnpj[13]);
}