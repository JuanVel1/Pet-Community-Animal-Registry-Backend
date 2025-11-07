import { Router } from 'express';
import {
    registrarVacunacion,
    listarVacunaciones,
    obtenerVacunacion,
    editarVacunacion,
    borrarVacunacion
} from '../controllers/vaccineController.js';
import { verificarToken } from '../middlewares/authMiddleware.js';
import { validarVacunacion } from '../middlewares/validation.js';

const router = Router();

router.post('/vaccinations', verificarToken, validarVacunacion, registrarVacunacion);
router.get('/vaccinations/pet/:pet_id', verificarToken, listarVacunaciones);
router.get('/vaccination/:id', verificarToken, obtenerVacunacion);
router.put('/vaccination/:id', verificarToken, validarVacunacion, editarVacunacion);
router.delete('/vaccination/:id', verificarToken, borrarVacunacion);

export default router;
