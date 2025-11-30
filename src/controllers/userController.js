import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { crearUsuario, buscarUsuarioPorCorreo } from '../models/userModel.js';

export const registrarUsuario = (req, res) => {
    // Frontend sends English keys
    const { name, email, password } = req.body;

    console.log("Registration request received:", { name, email });

    if (!name || !email || !password) {
        console.log("Missing fields in registration");
        return res.status(400).json({ mensaje: 'Missing required fields' });
    }

    // Map to Spanish for DB functions (if needed) or pass directly
    // userModel functions expect: nombre, correo, password_hash
    const nombre = name;
    const correo = email;
    const contraseña = password;

    buscarUsuarioPorCorreo(correo, (err, usuarioExistente) => {
        if (err) {
            console.error("Database error checking user:", err);
            return res.status(500).json({ mensaje: 'Database error', error: err });
        }
        if (usuarioExistente) {
            console.log("User already exists:", correo);
            return res.status(400).json({ mensaje: 'Email already registered' });
        }

        bcrypt.hash(contraseña, 10, (err, hash) => {
            if (err) {
                console.error("Bcrypt error:", err);
                return res.status(500).json({ mensaje: 'Error encrypting password' });
            }

            crearUsuario(nombre, correo, hash, (err, result) => {
                if (err) {
                    console.error("Error creating user:", err);
                    return res.status(500).json({ mensaje: 'Error registering user', error: err });
                }

                console.log("User created successfully. Result:", result);
                const response = {
                    id: result.insertId,
                    name: nombre,
                    email: correo
                };
                console.log("Sending response:", response);

                // Return the created user object as expected by frontend
                res.status(201).json(response);
            });
        });
    });
};

export const loginUsuario = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ mensaje: 'Email and password are required' });
    }

    const correo = email;
    const contraseña = password;

    buscarUsuarioPorCorreo(correo, (err, usuario) => {
        if (err) return res.status(500).json({ mensaje: 'Database error', error: err });
        if (!usuario) return res.status(404).json({ mensaje: 'User not found' });

        bcrypt.compare(contraseña, usuario.password_hash, (err, coincide) => {
            if (err) return res.status(500).json({ mensaje: 'Error verifying password' });
            if (!coincide) return res.status(401).json({ mensaje: 'Incorrect password' });

            const token = jwt.sign(
                { id: usuario.id, correo: usuario.correo },
                process.env.JWT_SECRET,
                { expiresIn: '2h' }
            );

            res.json({
                mensaje: 'Login successful',
                token,
                user: { // Changed from 'usuario' to 'user'
                    id: usuario.id,
                    name: usuario.nombre, // Mapped from 'nombre' to 'name'
                    email: usuario.correo // Mapped from 'correo' to 'email'
                }
            });
        });
    });
};
