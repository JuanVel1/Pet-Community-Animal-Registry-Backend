import { Router } from 'express';
import { registrarUsuario, loginUsuario } from '../controllers/userController.js';
import { validarRegistro, validarLogin } from '../middlewares/validation.js';

const router = Router();

router.post('/register', validarRegistro, registrarUsuario);
router.post('/login', validarLogin, loginUsuario);

export default router;
