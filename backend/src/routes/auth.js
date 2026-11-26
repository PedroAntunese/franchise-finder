const { Router } = require("express");
const controller = require("../controller/authController");
const autenticacao = require("../middlewares/autenticacao");

const rotas = Router();
rotas.post("/login", controller.login);
rotas.post("/cadastro", controller.cadastro);
rotas.get("/eu", autenticacao, controller.eu); // exemplo de rota protegida
module.exports = rotas;
