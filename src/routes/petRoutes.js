import { Router } from 'express';
import {
  registrarMascota,
  listarMascotas,
  obtenerMascota,
  editarMascota,
  borrarMascota
} from '../controllers/petController.js';
import { verificarToken } from '../middlewares/authMiddleware.js';
import { validarMascota } from '../middlewares/validation.js';

const router = Router();

// Todas las rutas protegidas por JWT
router.post('/pets', verificarToken, validarMascota, registrarMascota);
router.get('/pets', verificarToken, listarMascotas);
router.get('/pets/:id', verificarToken, obtenerMascota);
router.put('/pets/:id', verificarToken, validarMascota, editarMascota);
router.delete('/pets/:id', verificarToken, borrarMascota);

export default router;
