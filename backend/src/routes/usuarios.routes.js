import { Router } from 'express';
import * as controller from '../controller/usuario.controller.js';
import { autenticar, apenasProprio } from '../middlewares/auth.js';

const router = Router();

router.use(autenticar); // tudo abaixo exige login

router.get('/', controller.listar);
router.get('/:id', controller.buscarPorId);
router.put('/:id', apenasProprio, controller.atualizar);
router.delete('/:id', apenasProprio, controller.remover);

export default router;