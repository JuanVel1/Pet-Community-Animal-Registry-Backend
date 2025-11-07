import {
    crearVacunacion,
    obtenerVacunacionesPorMascota,
    obtenerVacunacionPorId,
    actualizarVacunacion,
    eliminarVacunacion
} from '../models/vaccineModel.js';
import { obtenerMascotaPorId } from '../models/petModel.js';

export const registrarVacunacion = (req, res) => {
    const { pet_id, vacuna, fecha_aplicacion, proxima_dosis } = req.body;
    const user_id = req.user.id;

    // Verificar que la mascota pertenece al usuario autenticado
    obtenerMascotaPorId(pet_id, user_id, (err, mascota) => {
        if (err) return res.status(500).json({ mensaje: 'Error al verificar mascota', error: err });
        if (!mascota) return res.status(403).json({ mensaje: 'No puedes registrar vacunaciones para mascotas de otros usuarios' });

        crearVacunacion(pet_id, vacuna, fecha_aplicacion, proxima_dosis, (err, result) => {
            if (err) return res.status(500).json({ mensaje: 'Error al registrar vacunación', error: err });
            res.status(201).json({ mensaje: 'Vacunación registrada correctamente ' });
        });
    });
};

export const listarVacunaciones = (req, res) => {
    const { pet_id } = req.params;
    const user_id = req.user.id;

    obtenerMascotaPorId(pet_id, user_id, (err, mascota) => {
        if (err) return res.status(500).json({ mensaje: 'Error al verificar mascota', error: err });
        if (!mascota) return res.status(403).json({ mensaje: 'No puedes ver vacunaciones de otras mascotas' });

        obtenerVacunacionesPorMascota(pet_id, (err, result) => {
            if (err) return res.status(500).json({ mensaje: 'Error al obtener vacunaciones', error: err });
            res.json(result);
        });
    });
};

export const obtenerVacunacion = (req, res) => {
    const { id } = req.params;
    obtenerVacunacionPorId(id, (err, vacunacion) => {
        if (err) return res.status(500).json({ mensaje: 'Error al buscar vacunación', error: err });
        if (!vacunacion) return res.status(404).json({ mensaje: 'Vacunación no encontrada' });
        res.json(vacunacion);
    });
};

export const editarVacunacion = (req, res) => {
    const { id } = req.params;
    actualizarVacunacion(id, req.body, (err, result) => {
        if (err) return res.status(500).json({ mensaje: 'Error al actualizar vacunación', error: err });
        res.json({ mensaje: 'Vacunación actualizada correctamente ' });
    });
};

export const borrarVacunacion = (req, res) => {
    const { id } = req.params;
    eliminarVacunacion(id, (err, result) => {
        if (err) return res.status(500).json({ mensaje: 'Error al eliminar vacunación', error: err });
        res.json({ mensaje: 'Vacunación eliminada correctamente ' });
    });
};
