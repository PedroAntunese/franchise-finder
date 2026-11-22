export const somenteDigitos = (v) => (v || "").replace(/\D/g, "");

const aplicar = (v, padrao, limite) => {
  const d = somenteDigitos(v).slice(0, limite);
  let i = 0;
  return padrao.replace(/#/g, () => d[i++] ?? "").replace(/[^\d]+$/, "");
};

const MASCARAS = {
  cep: (v) => aplicar(v, "#####-###", 8),
  cnpj: (v) => aplicar(v, "##.###.###/####-##", 14),
  cpf: (v) => aplicar(v, "###.###.###-##", 11),
  idade: (v) => somenteDigitos(v).slice(0, 3),
  estado: (v) => v.replace(/[^a-zA-Z]/g, "").slice(0, 2).toUpperCase(),
};

export function aplicarMascara(nome, valor) {
  return MASCARAS[nome] ? MASCARAS[nome](valor) : valor;
}