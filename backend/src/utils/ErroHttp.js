// Erro com código HTTP. O middleware de erros transforma em { erro: "mensagem" },
// que é exatamente o formato que o api.js do front lê (conteudo.erro).
class ErroHttp extends Error {
    constructor(status, mensagem) {
        super(mensagem);
        this.status = status;
    }
}
module.exports = ErroHttp;
