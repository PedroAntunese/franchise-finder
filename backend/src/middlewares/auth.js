import jwt from 'jsonwebtoken';
import AppError from '../utils/AppError.js';

// Exige um token válido no header: Authorization: Bearer <token>
export function autenticar(req, res, next) {
  const [tipo, token] = (req.headers.authorization || '').split(' ');
  if (tipo !== 'Bearer' || !token) throw new AppError('Token não informado', 401);

  try {
    req.usuario = jwt.verify(token, process.env.JWT_SECRET); // { id, email }
  } catch {
    throw new AppError('Token inválido ou expirado', 401);
  }
  next();
}

// Cada usuário só pode alterar/excluir a própria conta
export function apenasProprio(req, res, next) {
  if (Number(req.params.id) !== req.usuario.id) {
    throw new AppError('Sem permissão para esta ação', 403);
  }
  next();
}

// Uso: router.get('/x', autenticar, autorizar('franquia'), controller.x)
export function autorizar(...tiposPermitidos) {
  return (req, res, next) => {
    if (!tiposPermitidos.includes(req.usuario.tipo)) {
      throw new AppError('Sem permissão para esta ação', 403);
    }
    next();
  };
}