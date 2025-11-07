import { db } from '../config/db.js';


export const crearMascota = (nombre, raza, foto_url, estado, contacto, user_id, callback) => {
    const sql = `INSERT INTO pets (nombre, raza, foto_url, estado, contacto, user_id)
               VALUES (?, ?, ?, ?, ?, ?)`;
    db.query(sql, [nombre, raza, foto_url, estado, contacto, user_id], (err, result) => {
        if (err) return callback(err);
        callback(null, result);
    });
};

export const obtenerMascotasPorUsuario = (user_id, callback) => {
    const sql = 'SELECT * FROM pets WHERE user_id = ?';
    db.query(sql, [user_id], (err, result) => {
        if (err) return callback(err);
        callback(null, result);
    });
};

// Obtener una mascota específica
export const obtenerMascotaPorId = (id, user_id, callback) => {
    const sql = 'SELECT * FROM pets WHERE id = ? AND user_id = ?';
    db.query(sql, [id, user_id], (err, result) => {
        if (err) return callback(err);
        callback(null, result[0]);
    });
};

export const actualizarMascota = (id, data, user_id, callback) => {
    const { nombre, raza, foto_url, estado, contacto } = data;
    const sql = `UPDATE pets SET nombre=?, raza=?, foto_url=?, estado=?, contacto=? 
               WHERE id=? AND user_id=?`;
    db.query(sql, [nombre, raza, foto_url, estado, contacto, id, user_id], (err, result) => {
        if (err) return callback(err);
        callback(null, result);
    });
};

export const eliminarMascota = (id, user_id, callback) => {
    const sql = 'DELETE FROM pets WHERE id = ? AND user_id = ?';
    db.query(sql, [id, user_id], (err, result) => {
        if (err) return callback(err);
        callback(null, result);
    });
};
