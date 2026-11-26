// Ponto de entrada do back-end. Sobe o Express na porta 3001 (a que o front espera).
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "..", ".env") });
const express = require("express");
const cors = require("cors");
const config = require("./config");
const rotas = require("./routes");
const { naoEncontrada, tratarErros } = require("./middlewares/erros");

const app = express();

app.use(cors({ origin: config.frontendUrl }));
app.use(express.json());

app.use("/api", rotas);

app.use(naoEncontrada);
app.use(tratarErros);

app.listen(config.porta, () => {
    console.log("API rodando em http://localhost:" + config.porta + "/api");
});
