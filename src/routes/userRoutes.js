import { Router } from 'express';
import { registrarUsuario } from '../controllers/userController.js';

const router = Router();

router.post('/register', registrarUsuario);

export default router;
