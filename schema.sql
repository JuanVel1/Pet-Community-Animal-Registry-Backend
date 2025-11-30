CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    correo VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS pets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    raza VARCHAR(255),
    foto_url VARCHAR(500),
    estado VARCHAR(100),
    contacto VARCHAR(255),
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS vaccinations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pet_id INT NOT NULL,
    vacuna VARCHAR(255) NOT NULL,
    fecha_aplicacion DATE NOT NULL,
    proxima_dosis DATE,
    FOREIGN KEY (pet_id) REFERENCES pets(id) ON DELETE CASCADE
);
