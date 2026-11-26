// Junta todas as rotas sob /api. Novas áreas (franquias, mensagens...) entram aqui.
const { Router } = require("express");
const auth = require("./auth");

const rotas = Router();
rotas.get("/saude", (req, res) => res.json({ ok: true }));
rotas.use("/auth", auth);
// rotas.use("/franquias", autenticacao, franquias);

module.exports = rotas;
