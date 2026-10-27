// Troque pela URL do seu backend (ou defina REACT_APP_API_URL no .env)
const API = process.env.REACT_APP_API_URL || "http://localhost:3001";

async function post(rota, dados) {
  // Descomente quando o backend estiver pronto:
  // const r = await fetch(`${API}${rota}`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(dados),
  // });
  // if (!r.ok) throw new Error((await r.json()).mensagem || "Erro ao enviar.");
  // return r.json();
  return new Promise((ok) => setTimeout(() => ok({ ok: true }), 600)); // simulação
}

export const login = (dados) => post("/auth/login", dados);
export const cadastrar = (dados) => post("/auth/cadastro", dados);
