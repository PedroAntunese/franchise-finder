// Chamadas de login e cadastro usadas pelas telas pages/Login.jsx e pages/Cadastro.jsx.
// O fetch, o JSON e o token ficam em api.js; aqui só montamos o que cada rota espera.
// Com REACT_APP_SIMULAR_API=true, requisicao() responde sem chamar o back-end.
import { requisicao, salvarSessao } from "./api";

export async function login(dados) {
    const resposta = await requisicao("/auth/login", "POST", { email: dados.email.trim(), senha: dados.senha });
    // O servidor só entrega o token depois de conferir a senha.
    salvarSessao(resposta.token, resposta.usuario);
    return resposta;
}

// O perfil escolhido na tela inicial (franqueador, franqueado ou investidor)
// vai para o back-end como o "tipo" da conta.
export async function cadastrar(dados) {
    const { perfil, ...resto } = dados;
    return requisicao("/auth/cadastro", "POST", { ...resto, tipo: perfil });
}
