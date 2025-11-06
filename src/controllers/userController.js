import bcrypt from 'bcrypt';
import { crearUsuario, buscarUsuarioPorCorreo } from '../models/userModel.js';

export const registrarUsuario = (req, res) => {
    const { nombre, correo, contraseña } = req.body;

    if (!nombre || !correo || !contraseña) {
        return res.status(400).json({ mensaje: 'Faltan campos requeridos' });
    }

    // Verificar si el usuario ya existe
    buscarUsuarioPorCorreo(correo, (err, usuarioExistente) => {
        if (err) return res.status(500).json({ mensaje: 'Error en la base de datos', error: err });
        if (usuarioExistente) {
            return res.status(400).json({ mensaje: 'El correo ya está registrado' });
        }

        // Encriptar la contraseña
        bcrypt.hash(contraseña, 10, (err, hash) => {
            if (err) return res.status(500).json({ mensaje: 'Error al encriptar la contraseña' });

            // Guardar usuario
            crearUsuario(nombre, correo, hash, (err, result) => {
                if (err) return res.status(500).json({ mensaje: 'Error al registrar usuario', error: err });
                res.status(201).json({ mensaje: 'Usuario registrado correctamente ✅' });
            });
        });
    });
};
