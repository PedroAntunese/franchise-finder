<<<<<<< HEAD
import { Router } from 'express';
import * as controller from '../controller/auth.controller.js';

const router = Router();

router.post('/cadastro', controller.cadastrar);
router.post('/login', controller.login);

=======
import { Router } from 'express';
import * as controller from '../controller/auth.controller.js';

const router = Router();

router.post('/cadastro', controller.cadastrar);
router.post('/login', controller.login);

>>>>>>> Branch-Matheus
export default router;