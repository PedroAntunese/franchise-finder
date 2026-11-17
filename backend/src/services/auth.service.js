import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as repo from '../repositories/usuario.repository.js';
import AppError from '../utils/AppError.js';
import { cnpjValido, limparDoc } from '../utils/cpf.js';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TIPOS_PUBLICOS = ['franquia', 'franqueado']; // só estes podem se cadastrar sozinhos

const texto = (v) => (typeof v === 'string' ? v.trim() : '');

export async function cadastrar(dados) {
  const tipo = dados.tipo;
  const nome = texto(dados.nome);
  const email = texto(dados.email).toLowerCase();
  const senha = dados.senha;

  if (!TIPOS_PUBLICOS.includes(tipo)) throw new AppError('Tipo de conta inválido', 400);
  if (!nome || !email || typeof senha !== 'string' || !senha) {
    throw new AppError('Nome, email e senha são obrigatórios', 400);
  }
  if (!EMAIL_REGEX.test(email)) throw new AppError('Email inválido', 400);
  if (senha.length < 6) throw new AppError('A senha deve ter ao menos 6 caracteres', 400);

  // Dados específicos de cada tipo
  let perfil;

  if (tipo === 'franquia') {
    const cnpj = limparDoc(dados.cnpj);
    const nomeFantasia = texto(dados.nomeFantasia);
    if (!cnpjValido(cnpj)) throw new AppError('CNPJ inválido', 400);
    if (!nomeFantasia) throw new AppError('Nome fantasia é obrigatório', 400);
    perfil = { cnpj, nomeFantasia };
  } else if (dados.tipoPessoa === 'PF') {
    const cpf = limparDoc(dados.cpf);
    if (!cpfValido(cpf)) throw new AppError('CPF inválido', 400);
    perfil = { tipoPessoa: 'PF', cpf };
  } else if (dados.tipoPessoa === 'PJ') {
    const cnpj = limparDoc(dados.cnpj);
    const razaoSocial = texto(dados.razaoSocial);
    if (!cnpjValido(cnpj)) throw new AppError('CNPJ inválido', 400);
    if (!razaoSocial) throw new AppError('Razão social é obrigatória', 400);
    perfil = { tipoPessoa: 'PJ', cnpj, razaoSocial };
  } else {
    throw new AppError('Informe se é pessoa física ou jurídica', 400);
  }

  const senhaHash = await bcrypt.hash(senha, 10);

  try {
    return await repo.criarComPerfil({ nome, email, senhaHash, tipo }, perfil);
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      const msg = err.sqlMessage || '';
      const campo = msg.includes('cpf') ? 'CPF' : msg.includes('cnpj') ? 'CNPJ' : 'Email';
      throw new AppError(`${campo} já cadastrado`, 409);
    }
    throw err;
  }
}

export async function login({ email, senha }) {
  email = typeof email === 'string' ? email.trim().toLowerCase() : '';
  if (!email || typeof senha !== 'string' || !senha) {
    throw new AppError('Email e senha são obrigatórios', 400);
  }

  const usuario = await repo.buscarPorEmail(email);
  const senhaCorreta = usuario && (await bcrypt.compare(senha, usuario.senha_hash));

  // Mesma mensagem para email inexistente e senha errada (não revela quais emails existem)
  if (!senhaCorreta) throw new AppError('Email ou senha inválidos', 401);

  const token = jwt.sign(
    { id: usuario.id, email: usuario.email, tipo: usuario.tipo },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES || '1d' }
  );

  return {
    token,
    usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email, tipo: usuario.tipo },
  };
}