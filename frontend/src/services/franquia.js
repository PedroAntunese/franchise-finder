const API = process.env.REACT_APP_API_URL || "http://localhost:3001";

export async function cadastrarFranquia(dados) {
  const resposta = await fetch(`${API}/franquias`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  const corpo = await resposta.json().catch(() => ({}));
  if (!resposta.ok) {
    throw new Error(corpo.message || "Não foi possível cadastrar a franquia.");
  }
  return corpo;
}