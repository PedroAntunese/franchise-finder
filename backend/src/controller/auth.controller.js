import * as service from '../services/auth.service.js';

export async function cadastrar(req, res) {
  res.status(201).json(await service.cadastrar(req.body ?? {}));
}

export async function login(req, res) {
  res.json(await service.login(req.body ?? {}));
}