import { db } from '../config/db.js';

export const crearVacunacion = (pet_id, vacuna, fecha_aplicacion, proxima_dosis, callback) => {
    const sql = `INSERT INTO vaccinations (pet_id, vacuna, fecha_aplicacion, proxima_dosis)
               VALUES (?, ?, ?, ?)`;
    db.query(sql, [pet_id, vacuna, fecha_aplicacion, proxima_dosis], (err, result) => {
        if (err) return callback(err);
        callback(null, result);
    });
};

export const obtenerVacunacionesPorMascota = (pet_id, callback) => {
    const sql = `SELECT * FROM vaccinations WHERE pet_id = ?`;
    db.query(sql, [pet_id], (err, result) => {
        if (err) return callback(err);
        callback(null, result);
    });
};

export const obtenerVacunacionPorId = (id, callback) => {
    const sql = `SELECT * FROM vaccinations WHERE id = ?`;
    db.query(sql, [id], (err, result) => {
        if (err) return callback(err);
        callback(null, result[0]);
    });
};

export const actualizarVacunacion = (id, data, callback) => {
    const { vacuna, fecha_aplicacion, proxima_dosis } = data;
    const sql = `UPDATE vaccinations SET vacuna=?, fecha_aplicacion=?, proxima_dosis=? WHERE id=?`;
    db.query(sql, [vacuna, fecha_aplicacion, proxima_dosis, id], (err, result) => {
        if (err) return callback(err);
        callback(null, result);
    });
};

export const eliminarVacunacion = (id, callback) => {
    const sql = `DELETE FROM vaccinations WHERE id = ?`;
    db.query(sql, [id], (err, result) => {
        if (err) return callback(err);
        callback(null, result);
    });
};
