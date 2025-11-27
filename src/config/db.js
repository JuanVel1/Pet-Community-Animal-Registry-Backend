import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

let db;

function connectWithRetry() {
    db = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT
    });

    db.connect(err => {
        if (err) {
            console.error("Error conectando a MySQL. Reintentando en 5 segundos...\n", err.message);
            setTimeout(connectWithRetry, 5000);
        } else {
            console.log("Conectado correctamente a MySQL.");
        }
    });

    // Si la conexión se cae, vuelve a intentar
    db.on('error', err => {
        console.error("MySQL error:", err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'ECONNRESET') {
            console.log("Reconectando...");
            connectWithRetry();
        } else {
            throw err;
        }
    });
}

connectWithRetry();

export { db };
