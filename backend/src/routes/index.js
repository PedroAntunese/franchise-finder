import { Router } from 'express';
import authRoutes from './auth.routes.js';
import usuarioRoutes from './usuarios.routes.js';

const router = Router();

// Usada pelo Docker e pelo deploy para saber se a API está no ar
router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

router.use('/auth', authRoutes);
router.use('/usuarios', usuarioRoutes);

export default router;