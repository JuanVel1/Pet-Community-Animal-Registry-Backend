import {
    crearMascota,
    obtenerMascotasPorUsuario,
    obtenerMascotaPorId,
    actualizarMascota,
    eliminarMascota
} from '../models/petModel.js';

// Helper to map DB pet to Frontend Pet
const mapPetToFrontend = (pet) => ({
    id: pet.id,
    name: pet.nombre,
    breed: pet.raza,
    photoUrl: pet.foto_url,
    status: pet.estado,
    contact: pet.contacto,
    userId: pet.user_id
});

export const registrarMascota = (req, res) => {
    // Frontend sends English keys
    const { name, breed, status, contact, photoUrl } = req.body;
    const user_id = req.user.id;
    // Use uploaded file if present, otherwise use the URL string from body
    const foto_url = req.file ? req.file.filename : (photoUrl || null);

    // Map to Spanish for DB
    const nombre = name;
    const raza = breed;
    const estado = status;
    const contacto = contact;

    if (!nombre || !raza) {
        return res.status(400).json({ mensaje: 'Name and breed are required' });
    }

    crearMascota(nombre, raza, foto_url, estado, contacto, user_id, (err, result) => {
        if (err) return res.status(500).json({ mensaje: 'Error registering pet', error: err });

        // Return created Pet object
        res.status(201).json({
            id: result.insertId,
            name,
            breed,
            photoUrl: foto_url,
            status,
            contact,
            userId: user_id
        });
    });
};

export const listarMascotas = (req, res) => {
    const user_id = req.user.id;
    obtenerMascotasPorUsuario(user_id, (err, mascotas) => {
        if (err) return res.status(500).json({ mensaje: 'Error fetching pets', error: err });
        // Map all pets to English keys
        const mappedPets = mascotas.map(mapPetToFrontend);
        res.json(mappedPets);
    });
};

export const obtenerMascota = (req, res) => {
    const { id } = req.params;
    const user_id = req.user.id;
    obtenerMascotaPorId(id, user_id, (err, mascota) => {
        if (err) return res.status(500).json({ mensaje: 'Error fetching pet', error: err });
        if (!mascota) return res.status(404).json({ mensaje: 'Pet not found' });
        res.json(mapPetToFrontend(mascota));
    });
};

export const editarMascota = (req, res) => {
    const { id } = req.params;
    const user_id = req.user.id;

    // Frontend sends English keys
    const { name, breed, status, contact, photoUrl } = req.body;

    // Use uploaded file if present, otherwise use the URL string from body
    const foto_url = req.file ? req.file.filename : (photoUrl || null);

    // Map to Spanish for DB
    const data = {
        nombre: name,
        raza: breed,
        estado: status,
        contacto: contact,
        foto_url: foto_url // This might need handling if photo is not updated
    };

    actualizarMascota(id, data, user_id, (err, result) => {
        if (err) return res.status(500).json({ mensaje: 'Error updating pet', error: err });

        // Return updated Pet object (constructing it from input data)
        res.json({
            id: parseInt(id),
            name,
            breed,
            photoUrl: foto_url, // This might be null if not updated
            status,
            contact,
            userId: user_id
        });
    });
};

export const borrarMascota = (req, res) => {
    const { id } = req.params;
    const user_id = req.user.id;
    eliminarMascota(id, user_id, (err, result) => {
        if (err) return res.status(500).json({ mensaje: 'Error deleting pet', error: err });
        res.json({ mensaje: 'Pet deleted successfully' });
    });
};
