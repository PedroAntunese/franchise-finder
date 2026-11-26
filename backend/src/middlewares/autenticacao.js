// Protege rotas. O front manda "Authorization: Bearer <token>" (ver api.js).
// Um 401 aqui faz o front apagar a sessão e pedir login de novo.
const jwt = require("jsonwebtoken");
const config = require("../config");
const ErroHttp = require("../utils/ErroHttp");

function autenticacao(req, res, next) {
    const cabecalho = req.headers.authorization || "";
    const [tipo, token] = cabecalho.split(" ");
    if (tipo !== "Bearer" || !token) return next(new ErroHttp(401, "Faça login para continuar."));

    try {
        req.usuario = jwt.verify(token, config.jwtSecret); // { id, tipo, iat, exp }
        next();
    } catch {
        next(new ErroHttp(401, "Sessão expirada. Faça login novamente."));
    }
}

module.exports = autenticacao;
