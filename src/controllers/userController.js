import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { crearUsuario, buscarUsuarioPorCorreo } from '../models/userModel.js';

export const registrarUsuario = (req, res) => {
    const { nombre, correo, contraseña } = req.body;

    if (!nombre || !correo || !contraseña) {
        return res.status(400).json({ mensaje: 'Faltan campos requeridos' });
    }

    buscarUsuarioPorCorreo(correo, (err, usuarioExistente) => {
        if (err) return res.status(500).json({ mensaje: 'Error en la base de datos', error: err });
        if (usuarioExistente) {
            return res.status(400).json({ mensaje: 'El correo ya está registrado' });
        }

        bcrypt.hash(contraseña, 10, (err, hash) => {
            if (err) return res.status(500).json({ mensaje: 'Error al encriptar la contraseña' });

            crearUsuario(nombre, correo, hash, (err, result) => {
                if (err) return res.status(500).json({ mensaje: 'Error al registrar usuario', error: err });
                res.status(201).json({ mensaje: 'Usuario registrado correctamente ✅' });
            });
        });
    });
};

export const loginUsuario = (req, res) => {
    const { correo, contraseña } = req.body;

    if (!correo || !contraseña) {
        return res.status(400).json({ mensaje: 'Correo y contraseña son requeridos' });
    }

    buscarUsuarioPorCorreo(correo, (err, usuario) => {
        if (err) return res.status(500).json({ mensaje: 'Error en la base de datos', error: err });
        if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

        bcrypt.compare(contraseña, usuario.contraseña_hash, (err, coincide) => {
            if (err) return res.status(500).json({ mensaje: 'Error al verificar contraseña' });
            if (!coincide) return res.status(401).json({ mensaje: 'Contraseña incorrecta' });

            const token = jwt.sign(
                { id: usuario.id, correo: usuario.correo },
                process.env.JWT_SECRET,
                { expiresIn: '2h' }
            );

            res.json({
                mensaje: 'Inicio de sesión exitoso',
                token,
                usuario: {
                    id: usuario.id,
                    nombre: usuario.nombre,
                    correo: usuario.correo
                }
            });
        });
    });
};