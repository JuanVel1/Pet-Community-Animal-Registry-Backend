import { body, validationResult } from 'express-validator';

// Middleware para mostrar errores en formato uniforme
export const validarCampos = (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({
            mensaje: 'Error de validación',
            errores: errores.array().map(err => ({
                campo: err.param,
                mensaje: err.msg
            }))
        });
    }
    next();
};

// Validaciones para registro
export const validarRegistro = [
    body('nombre').isString().notEmpty().withMessage('El nombre es requerido'),
    body('correo').isEmail().withMessage('El correo debe tener formato válido'),
    body('contraseña').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    validarCampos
];

// Validaciones para login
export const validarLogin = [
    body('correo').isEmail().withMessage('El correo debe tener formato válido'),
    body('contraseña').notEmpty().withMessage('La contraseña es requerida'),
    validarCampos
];


// Validaciones para CRUD de mascotas
export const validarMascota = [
    body('nombre').isString().notEmpty().withMessage('El nombre de la mascota es obligatorio'),
    body('raza').isString().notEmpty().withMessage('La raza es obligatoria'),
    body('foto_url').optional().isURL().withMessage('La URL de la foto no es válida'),
    body('estado').optional().isString().withMessage('El estado debe ser texto'),
    body('contacto').optional().isString().withMessage('El contacto debe ser texto'),
    validarCampos
];

// Validaciones para vacunaciones
export const validarVacunacion = [
    body('pet_id').isInt().withMessage('El ID de la mascota es obligatorio y debe ser un número'),
    body('vacuna').isString().notEmpty().withMessage('El nombre de la vacuna es obligatorio'),
    body('fecha_aplicacion').isISO8601().withMessage('La fecha de aplicación debe tener formato válido (YYYY-MM-DD)'),
    body('proxima_dosis').optional().isISO8601().withMessage('La próxima dosis debe tener formato válido (YYYY-MM-DD)'),
    validarCampos
];