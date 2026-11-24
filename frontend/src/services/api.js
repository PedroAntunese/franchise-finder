// Este arquivo roda no NAVEGADOR. Ele concentra o fetch, o envio de JSON e o token.
import { respostaSimulada } from "./api_simulada";

// O back-end roda em outra porta (3001), por isso a URL vem do frontend/.env.
const URL_API = process.env.REACT_APP_API_URL || "http://localhost:3001/api";
// Enquanto o banco não está pronto, REACT_APP_SIMULAR_API=true responde sem chamar o servidor.
const SIMULAR_API = process.env.REACT_APP_SIMULAR_API === "true";

const CHAVE_TOKEN = "franchise_token";
const CHAVE_USUARIO = "franchise_usuario";

export function obterToken() { return localStorage.getItem(CHAVE_TOKEN); }

export function obterUsuario() {
    const texto = localStorage.getItem(CHAVE_USUARIO);
    return texto ? JSON.parse(texto) : null;
}

// O login devolve o token e os dados públicos do usuário; guardamos os dois.
export function salvarSessao(token, usuario) {
    localStorage.setItem(CHAVE_TOKEN, token);
    localStorage.setItem(CHAVE_USUARIO, JSON.stringify(usuario));
}

export function encerrarSessao() {
    localStorage.removeItem(CHAVE_TOKEN);
    localStorage.removeItem(CHAVE_USUARIO);
}

export async function requisicao(url, metodo = "GET", dados = null) {
    if (SIMULAR_API) return respostaSimulada(url, metodo, dados);

    const opcoes = { method: metodo, headers: {} };
    if (dados !== null) {
        opcoes.headers["Content-Type"] = "application/json";
        // Um objeto JavaScript é convertido em texto JSON para viajar no HTTP.
        opcoes.body = JSON.stringify(dados);
    }
    const token = obterToken();
    if (token) opcoes.headers.Authorization = "Bearer " + token;

    let resposta;
    try {
        resposta = await fetch(URL_API + url, opcoes);
    } catch {
        // fetch só lança erro quando nem chega ao servidor (API desligada, rede fora).
        throw new Error("Não foi possível conectar ao servidor.");
    }
    if (resposta.status === 204) return null; // DELETE sem corpo
    const conteudo = await resposta.json();
    if (!resposta.ok) {
        // Token vencido ou inválido: limpamos a sessão para a próxima tela pedir login.
        if (resposta.status === 401 && token && url !== "/auth/login") encerrarSessao();
        throw new Error(conteudo.erro || "Não foi possível concluir a operação.");
    }
    return conteudo; // JSON da resposta já convertido em objeto/array JavaScript
}
