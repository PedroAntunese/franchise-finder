// Respostas falsas usadas enquanto o banco de dados não está pronto.
// Liga com REACT_APP_SIMULAR_API=true no frontend/.env. Nada aqui é gravado.
// O formato imita o do back-end, assim as telas não mudam quando a API real entrar.
export async function respostaSimulada(url, metodo, dados) {
    if (url === "/auth/login" && metodo === "POST") {
        return {
            token: "token-simulado",
            usuario: { id: 1, nome: "Usuário Teste", email: dados.email, tipo: "franquia" }
        };
    }
    if (url === "/auth/cadastro" && metodo === "POST") {
        return { id: 1, nome: dados.nome, email: dados.email, tipo: dados.tipo };
    }
    throw new Error("A rota " + metodo + " " + url + " ainda não existe no modo simulado.");
}
