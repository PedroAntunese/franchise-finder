import * as service from '../services/usuario.service.js';

export async function listar(req, res) {
  res.json(await service.listar());
}

export async function buscarPorId(req, res) {
  res.json(await service.buscarPorId(req.params.id));
}

export async function atualizar(req, res) {
  res.json(await service.atualizar(req.params.id, req.body ?? {}));
}

export async function remover(req, res) {
  await service.remover(req.params.id);
  res.status(204).send();
}