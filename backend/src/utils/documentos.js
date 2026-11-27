// Deixa só os números: "529.982.247-25" vira "52998224725".
export function limparDoc(valor) {
  return String(valor ?? '').replace(/\D/g, '');
}
