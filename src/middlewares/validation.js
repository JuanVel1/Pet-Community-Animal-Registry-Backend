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
    body('name').isString().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    validarCampos
];

// Validaciones para login
export const validarLogin = [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required'),
    validarCampos
];


// Validaciones para CRUD de mascotas
export const validarMascota = [
    body('name').isString().notEmpty().withMessage('Name is required'),
    body('breed').isString().notEmpty().withMessage('Breed is required'),
    body('photoUrl').optional().isString().withMessage('Photo URL must be text'),
    body('status').optional().isString().withMessage('Status must be text'),
    body('contact').optional().isString().withMessage('Contact must be text'),
    validarCampos
];

// Validaciones para vacunaciones
export const validarVacunacion = [
    body('pet_id').isInt().withMessage('Pet ID is required and must be a number'),
    body('vacuna').isString().notEmpty().withMessage('Vaccine name is required'),
    body('fecha_aplicacion').isISO8601().withMessage('Application date must be valid (YYYY-MM-DD)'),
    body('proxima_dosis').optional().isISO8601().withMessage('Next dose date must be valid (YYYY-MM-DD)'),
    validarCampos
];