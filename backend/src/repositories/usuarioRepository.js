// Única camada que conversa com o banco. Só SQL aqui, nenhuma regra de negócio.
const pool = require("../database/conexao");

async function buscarPorEmail(email) {
    const [linhas] = await pool.query(
        "SELECT id, nome, email, senha_hash, tipo FROM usuarios WHERE email = ?",
        [email]
    );
    return linhas[0] || null;
}

async function buscarPorId(id) {
    const [linhas] = await pool.query(
        "SELECT id, nome, email, tipo FROM usuarios WHERE id = ?",
        [id]
    );
    return linhas[0] || null;
}

async function criar({ nome, email, senhaHash, tipo }) {
    const [resultado] = await pool.query(
        "INSERT INTO usuarios (nome, email, senha_hash, tipo) VALUES (?, ?, ?, ?)",
        [nome, email, senhaHash, tipo]
    );
    return resultado.insertId;
}

module.exports = { buscarPorEmail, buscarPorId, criar };
