import * as repo from '../repositories/usuario.repository.js';
import AppError from '../utils/AppError.js';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const listar = () => repo.listar();

export async function buscarPorId(id) {
  const usuario = await repo.buscarPorId(id);
  if (!usuario) throw new AppError('Usuário não encontrado', 404);
  return usuario;
}

export async function atualizar(id, { nome, email }) {
  nome = typeof nome === 'string' ? nome.trim() : '';
  email = typeof email === 'string' ? email.trim().toLowerCase() : '';

  if (!nome || !email) throw new AppError('Nome e email são obrigatórios', 400);
  if (!EMAIL_REGEX.test(email)) throw new AppError('Email inválido', 400);

  try {
    const ok = await repo.atualizar(id, { nome, email });
    if (!ok) throw new AppError('Usuário não encontrado', 404);
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') throw new AppError('Email já cadastrado', 409);
    throw err;
  }
  return { id: Number(id), nome, email };
}

export async function remover(id) {
  const ok = await repo.remover(id);
  if (!ok) throw new AppError('Usuário não encontrado', 404);
}