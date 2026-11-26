// Regras de negócio da autenticação: validar, criptografar senha, gerar token.
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config");
const usuarios = require("../repositories/usuarioRepository");
const ErroHttp = require("../utils/ErroHttp");
const { TIPOS_VALIDOS, emailValido } = require("../utils/validacao");

async function cadastrar({ nome, email, senha, tipo }) {
    if (!nome || !nome.trim()) throw new ErroHttp(400, "Informe o nome.");
    if (!emailValido(email)) throw new ErroHttp(400, "Informe um e-mail válido.");
    if (!senha || senha.length < 6) throw new ErroHttp(400, "A senha precisa ter ao menos 6 caracteres.");
    if (!TIPOS_VALIDOS.includes(tipo)) throw new ErroHttp(400, "Tipo de usuário inválido.");

    email = email.trim().toLowerCase();
    if (await usuarios.buscarPorEmail(email)) throw new ErroHttp(409, "Este e-mail já está cadastrado.");

    const senhaHash = await bcrypt.hash(senha, 10);
    const id = await usuarios.criar({ nome: nome.trim(), email, senhaHash, tipo });

    // Mesmo formato do modo simulado: { id, nome, email, tipo }
    return { id, nome: nome.trim(), email, tipo };
}

async function login({ email, senha }) {
    if (!emailValido(email) || !senha) throw new ErroHttp(400, "Informe e-mail e senha.");

    const usuario = await usuarios.buscarPorEmail(email.trim().toLowerCase());
    // Mesma mensagem para e-mail errado e senha errada: não revela quais e-mails existem.
    const ok = usuario && (await bcrypt.compare(senha, usuario.senha_hash));
    if (!ok) throw new ErroHttp(401, "E-mail ou senha incorretos.");

    const token = jwt.sign({ id: usuario.id, tipo: usuario.tipo }, config.jwtSecret, {
        expiresIn: config.jwtExpiraEm
    });

    // Mesmo formato do modo simulado: { token, usuario: { id, nome, email, tipo } }
    return {
        token,
        usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email, tipo: usuario.tipo }
    };
}

async function dadosDoUsuario(id) {
    const usuario = await usuarios.buscarPorId(id);
    if (!usuario) throw new ErroHttp(401, "Sessão inválida.");
    return usuario;
}

module.exports = { cadastrar, login, dadosDoUsuario };
