const ErroHttp = require("../utils/ErroHttp");

function naoEncontrada(req, res, next) {
    next(new ErroHttp(404, "Rota não encontrada."));
}

// Sempre responde JSON { erro } — o api.js do front faz resposta.json() e lê conteudo.erro.
function tratarErros(erro, req, res, next) {
    if (erro instanceof ErroHttp) return res.status(erro.status).json({ erro: erro.message });
    if (erro.type === "entity.parse.failed") return res.status(400).json({ erro: "JSON inválido." });
    console.error(erro);
    res.status(500).json({ erro: "Erro interno do servidor." });
}

module.exports = { naoEncontrada, tratarErros };
