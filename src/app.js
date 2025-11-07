import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import petRoutes from './routes/petRoutes.js';
import vaccineRoutes from './routes/vaccineRoutes.js';

// config
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', petRoutes);
app.use('/api', vaccineRoutes);

// Middleware global de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        mensaje: 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
