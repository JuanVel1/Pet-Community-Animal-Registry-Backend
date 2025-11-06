import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';

// config
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.get('/', (req, res) => {
    res.send('Backend de pets funcionando correctamente 🐾');
});
app.use('/api', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
