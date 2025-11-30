import { db } from '../config/db.js';

export const crearUsuario = (nombre, correo, contraseña_hash, callback) => {
    const sql = 'INSERT INTO users (nombre, correo, password_hash) VALUES (?, ?, ?)';
    db.query(sql, [nombre, correo, contraseña_hash], (err, result) => {
        if (err) return callback(err, null);
        callback(null, result);
    });
};

export const buscarUsuarioPorCorreo = (correo, callback) => {
    const sql = 'SELECT * FROM users WHERE correo = ?';
    db.query(sql, [correo], (err, result) => {
        if (err) return callback(err, null);
        callback(null, result[0]);
    });
};
