import {
    crearMascota,
    obtenerMascotasPorUsuario,
    obtenerMascotaPorId,
    actualizarMascota,
    eliminarMascota
} from '../models/petModel.js';

export const registrarMascota = (req, res) => {
    const { nombre, raza, foto_url, estado, contacto } = req.body;
    const user_id = req.user.id;

    if (!nombre || !raza) {
        return res.status(400).json({ mensaje: 'Nombre y raza son obligatorios' });
    }

    crearMascota(nombre, raza, foto_url, estado, contacto, user_id, (err, result) => {
        if (err) return res.status(500).json({ mensaje: 'Error al registrar mascota', error: err });
        res.status(201).json({ mensaje: 'Mascota registrada correctamente ' });
    });
};

export const listarMascotas = (req, res) => {
    const user_id = req.user.id;
    obtenerMascotasPorUsuario(user_id, (err, mascotas) => {
        if (err) return res.status(500).json({ mensaje: 'Error al obtener mascotas', error: err });
        res.json(mascotas);
    });
};

export const obtenerMascota = (req, res) => {
    const { id } = req.params;
    const user_id = req.user.id;
    obtenerMascotaPorId(id, user_id, (err, mascota) => {
        if (err) return res.status(500).json({ mensaje: 'Error al buscar mascota', error: err });
        if (!mascota) return res.status(404).json({ mensaje: 'Mascota no encontrada' });
        res.json(mascota);
    });
};

export const editarMascota = (req, res) => {
    const { id } = req.params;
    const user_id = req.user.id;
    actualizarMascota(id, req.body, user_id, (err, result) => {
        if (err) return res.status(500).json({ mensaje: 'Error al actualizar mascota', error: err });
        res.json({ mensaje: 'Mascota actualizada correctamente 🐕' });
    });
};

export const borrarMascota = (req, res) => {
    const { id } = req.params;
    const user_id = req.user.id;
    eliminarMascota(id, user_id, (err, result) => {
        if (err) return res.status(500).json({ mensaje: 'Error al eliminar mascota', error: err });
        res.json({ mensaje: 'Mascota eliminada correctamente' });
    });
};
