import { Router } from 'express';
import authRoutes from './auth.routes.js';
import usuarioRoutes from './usuarios.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/usuarios', usuarioRoutes);

export default router;