// Recebe a requisição, chama o service e devolve a resposta. Sem regra de negócio.
const auth = require("../services/authService");

async function cadastro(req, res, next) {
    try {
        res.status(201).json(await auth.cadastrar(req.body));
    } catch (erro) { next(erro); }
}

async function login(req, res, next) {
    try {
        res.json(await auth.login(req.body));
    } catch (erro) { next(erro); }
}

async function eu(req, res, next) {
    try {
        res.json(await auth.dadosDoUsuario(req.usuario.id));
    } catch (erro) { next(erro); }
}

module.exports = { cadastro, login, eu };
