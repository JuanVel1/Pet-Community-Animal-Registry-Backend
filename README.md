# 🐾 **Pet Community – Backend**

Backend del sistema  **Pet Community** , una plataforma para registrar mascotas de una comunidad, gestionar información de contacto, fotos, y llevar control de vacunación.

Construido con  **Node.js** ,  **Express** ,  **MySQL** ,  **JWT** , **Docker** y expuesto mediante  **Ngrok** .

---

# 📌 **Tecnologías utilizadas**

* Node.js + Express
* MySQL
* JSON Web Token (JWT)
* Multer (subida de imágenes)
* Docker + Docker Compose
* Ngrok
* CORS
* dotenv

---

# 🚀 **URL de producción**

Backend expuesto mediante Ngrok:

<pre class="overflow-visible!" data-start="729" data-end="790"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre!"><span><span>https:</span><span>//nongutturally-paroxysmal-azzie.ngrok-free.dev</span><span>
</span></span></code></div></div></pre>

> ⚠️ Recuerda: esta URL cambia cada vez que se reinicia Ngrok.

---

# 📁 **Estructura del proyecto**

<pre class="overflow-visible!" data-start="895" data-end="1301"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre!"><span><span>src/
 ├── controllers/       </span><span># Lógica de negocio</span><span>
 ├── middlewares/       </span><span># Autenticación, multer, validaciones</span><span>
 ├── models/            </span><span># Consultas SQL</span><span>
 ├── routes/            </span><span># Endpoints REST</span><span>
 ├── config/            </span><span># Conexión MySQL</span><span>
 ├── uploads/
 │    └── pets/         </span><span># Fotos de mascotas</span><span>
 └── app.js             </span><span># Configuración principal del servidor</span><span>
docker-compose.yml
Dockerfile
.</span><span>env</span><span>
README.md
</span></span></code></div></div></pre>

---

# ⚙️ **Instalación y configuración**

## 1️⃣ Clonar el repositorio

<pre class="overflow-visible!" data-start="1375" data-end="1476"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-bash"><span><span>git </span><span>clone</span><span> https://github.com/JuanVel1/Pet-Community-Animal-Registry-Backend.git
</span><span>cd</span><span> pet-community-backend
</span></span></code></div></div></pre>

## 2️⃣ Crear archivo `.env`

Configurar variables de entorno:

<pre class="overflow-visible!" data-start="1540" data-end="1664"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre!"><span><span>DB_HOST</span><span>=db
</span><span>DB_USER</span><span>=petuser
</span><span>DB_PASS</span><span>=petpass
</span><span>DB_NAME</span><span>=pet_registry
</span><span>DB_PORT</span><span>=</span><span>3306</span><span>

</span><span>PORT</span><span>=</span><span>3000</span><span>
</span><span>JWT_SECRET</span><span>=miclavesecreta123
</span></span></code></div></div></pre>

---

# 🐳 **Ejecución con Docker (recomendado)**

## 1️⃣ Construir contenedores

<pre class="overflow-visible!" data-start="1746" data-end="1783"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-bash"><span><span>docker-compose up --build
</span></span></code></div></div></pre>

Esto levantará:

| Servicio                      | (localhost) Puerto |
| ----------------------------- | ------------------ |
| Backend (Node.js)             | 3000               |
| MySQL                         | 3306               |
| Adminer (ver DB en navegador) | 8080               |

## 2️⃣ Acceder a la base de datos en navegador (Adminer)

Acceder a localhost:8080

- Usuario: petuser
- Contraseña:petpass
- base de datos: pet_registry

## 3️⃣ Exponer backend con Ngrok

<pre class="overflow-visible!" data-start="2057" data-end="2084"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-bash"><span><span>ngrok http 3000
</span></span></code></div></div></pre>

Copiar la URL y reemplazarla donde sea necesario.

---

# 🔐 **Autenticación**

El backend utiliza  **JWT** .

Debes enviar el token en cada petición protegida:

<pre class="overflow-visible!" data-start="2246" data-end="2283"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre!"><span><span>Authorization: Bearer <token></span><span>
</span></span></code></div></div></pre>

---

# 📌 **Endpoints disponibles**

---

# 🔑 **Auth**

### 📍 POST `/api/register`

Registra un usuario nuevo.

#### **Body**

<pre class="overflow-visible!" data-start="2412" data-end="2507"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-json"><span><span>{</span><span>
  </span><span>"nombre"</span><span>:</span><span></span><span>"Juan Perez"</span><span>,</span><span>
  </span><span>"email"</span><span>:</span><span></span><span>"juan@example.com"</span><span>,</span><span>
  </span><span>"password"</span><span>:</span><span></span><span>"123456"</span><span>
</span><span>}</span><span>
</span></span></code></div></div></pre>

---

### 📍 POST `/api/login`

Inicia sesión y devuelve JWT.

#### **Body**

<pre class="overflow-visible!" data-start="2584" data-end="2653"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-json"><span><span>{</span><span>
  </span><span>"email"</span><span>:</span><span></span><span>"juan@example.com"</span><span>,</span><span>
  </span><span>"password"</span><span>:</span><span></span><span>"123456"</span><span>
</span><span>}</span><span>
</span></span></code></div></div></pre>

#### **Response**

<pre class="overflow-visible!" data-start="2673" data-end="2725"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-json"><span><span>{</span><span>
  </span><span>"token"</span><span>:</span><span></span><span>"eyJhbGciOiJIUzI1NiIs..."</span><span>
</span><span>}</span><span>
</span></span></code></div></div></pre>

---

# 🐾 **Mascotas (Pets)**

> Requieren `Authorization: Bearer <token>`
>
> Todas soportan foto subida con `multipart/form-data`

---

### 📍 POST `/api/pets`

Crea una mascota.

#### **form-data**

| Campo    | Tipo |
| -------- | ---- |
| nombre   | text |
| raza     | text |
| estado   | text |
| contacto | text |
| foto     | file |

---

### 📍 GET `/api/pets`

Lista todas las mascotas del usuario.

---

### 📍 GET `/api/pets/:id`

Obtiene una mascota específica.

---

### 📍 PUT `/api/pets/:id`

Edita mascota (incluye cambio de foto).

#### **form-data**

Campos opcionales.

---

### 📍 DELETE `/api/pets/:id`

Elimina una mascota.

---

# 💉 **Vacunación**

### 📍 POST `/api/vaccinations`

Registrar vacunación para una mascota.

#### **Body**

<pre class="overflow-visible!" data-start="3464" data-end="3583"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-json"><span><span>{</span><span>
  </span><span>"pet_id"</span><span>:</span><span></span><span>5</span><span>,</span><span>
  </span><span>"vacuna"</span><span>:</span><span></span><span>"Rabia"</span><span>,</span><span>
  </span><span>"fecha_aplicacion"</span><span>:</span><span></span><span>"2025-01-10"</span><span>,</span><span>
  </span><span>"proxima_dosis"</span><span>:</span><span></span><span>"2026-01-10"</span><span>
</span><span>}</span><span>
</span></span></code></div></div></pre>

---

### 📍 GET `/api/vaccinations/:id`

Obtener vacunación por ID.

---

### 📍 GET `/api/vaccinations/pet/:pet_id`

Vacunaciones asociadas a una mascota.

---



# 📮 **Colección de Postman**

Para facilitar las pruebas del backend, se ha creado un **workspace público en Postman** que contiene todas las colecciones necesarias para interactuar con los endpoints del sistema:

* Autenticación (register / login)
* Gestión de mascotas (CRUD + subida de fotos)
* Gestión de vacunaciones
* Rutas protegidas con JWT
* Ejemplos de peticiones con `form-data`, JSON y archivo

Puedes acceder al workspace público aquí:

👉 **Workspace de Postman – Pet Community**

🔗 [https://www.postman.com/maintenance-candidate-61316570/pet-community/overview](https://www.postman.com/maintenance-candidate-61316570/pet-community/overview)

Dentro encontrarás:

### 🧪 **Colecciones disponibles**

* **Auth** – Registro y login de usuarios
* **Pets** – CRUD completo de mascotas
* **Vaccinations** – Gestión de vacunaciones

### ⭐ Recomendaciones

1. Ejecuta primero el endpoint **Login** para obtener el token.
2. Agrega el token a la seccion de authorization, en la opcion "bearer token".
3. Para pruebas de subida de imágenes, usa el endpoint `POST /api/pets` con `form-data`.

---

# 🛠️ **Comandos útiles**

## Instalar dependencias

<pre class="overflow-visible!" data-start="4035" data-end="4058"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-bash"><span><span>npm install
</span></span></code></div></div></pre>

## Ejecutar sin Docker

<pre class="overflow-visible!" data-start="4083" data-end="4104"><div class="contain-inline-size rounded-2xl relative bg-token-sidebar-surface-primary"><div class="sticky top-9"><div class="absolute end-0 bottom-0 flex h-9 items-center pe-2"><div class="bg-token-bg-elevated-secondary text-token-text-secondary flex items-center gap-4 rounded-sm px-2 font-sans text-xs"></div></div></div><div class="overflow-y-auto p-4" dir="ltr"><code class="whitespace-pre! language-bash"><span><span>npm start
</span></span></code></div></div></pre>

---

# 📝 **Notas**

* Si se reinicia Ngrok, debe actualizarse la URL base.
* Las imágenes se almacenan localmente dentro del contenedor.
* JWT es obligatorio para todas las rutas salvo login y registro.

---

# 📄 **Licencia**

Proyecto académico — sin licencia formal.
