import { Router } from 'express';
import * as controller from '../controller/auth.controller.js';
import { autenticar } from '../middlewares/auth.js';

const router = Router();

router.post('/cadastro', controller.cadastrar);
router.post('/login', controller.login);
router.get('/eu', autenticar, controller.eu); // dados de quem está logado

export default router;