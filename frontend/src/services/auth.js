// Chamadas de login e cadastro usadas pelas telas pages/Login.jsx e pages/Cadastro.jsx.
// O fetch, o JSON e o token ficam em api.js; aqui só montamos o que cada rota espera.
// Com REACT_APP_SIMULAR_API=true, requisicao() responde sem chamar o back-end.
import { requisicao, salvarSessao } from "./api";

// O perfil escolhido na Home vira o "tipo" de conta do back-end.
// O back-end ainda não tem o tipo "investidor": a API real responde "Tipo de conta inválido".
const TIPOS = { franqueador: "franquia", franqueado: "franqueado", investidor: "investidor" };

export async function login(dados) {
    const resposta = await requisicao("/auth/login", "POST", { email: dados.email.trim(), senha: dados.senha });
    // O servidor entrega um JWT somente depois de verificar o hash da senha.
    salvarSessao(resposta.token, resposta.usuario);
    return resposta;
}

export async function cadastrar(dados) {
    const { perfil, ...resto } = dados;
    return requisicao("/auth/cadastro", "POST", { ...resto, tipo: TIPOS[perfil] });
}
