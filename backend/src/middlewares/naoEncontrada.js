import AppError from '../utils/AppError.js';

// Rota que não existe: responde JSON { erro } como o resto da API (o front sempre lê JSON).
export default function naoEncontrada(req, res, next) {
  next(new AppError('Rota não encontrada', 404));
}
