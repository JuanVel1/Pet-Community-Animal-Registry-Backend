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
