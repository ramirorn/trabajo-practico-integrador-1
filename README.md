# 📝 **Trabajo Práctico Integrador I — Sistema de Blog con Autenticación**

Bienvenido al repositorio del **Sistema de Gestión de Blog Personal con Autenticación**, desarrollado como parte del **Trabajo Práctico Integrador I**.
Este proyecto implementa un backend completo utilizando **Node.js, Express, Sequelize, MySQL, JWT y cookies seguras**, siguiendo todos los criterios solicitados en la consigna.

---

## 🚀 **Objetivo del Proyecto**

Construir desde cero un sistema completo de blog personal que integre:

- 🔐 Autenticación y autorización con **JWT + Cookies httpOnly**
- 🧂 Seguridad mediante **bcrypt**
- 🗄️ Modelos relacionados con **Sequelize**
- 🧪 Validaciones completas con **express-validator**
- 🔄 CRUD completos con **eliminación lógica y en cascada**
- 🏷️ Gestión de etiquetas (Tags) con relación **N:M**

---

## 📁 **Estructura del Proyecto**

```
src/
│── config/
│ └── database.js
│
│── controllers/
│ ├── article.controllers.js
│ ├── articleTag.controllers.js
│ ├── auth.controllers.js
│ ├── profile.controllers.js
│ ├── tag.controllers.js
│ └── user.controllers.js
│
│── helpers/
│ ├── bcrypt.helper.js
│ └── jwt.helper.js
│
│── middlewares/
│ ├── admin.middleware.js
│ ├── auth.middleware.js
│ ├── ownerOrAdmin.middleware.js
│ └── validations/
│ └── validator.js
│
│── models/
│ ├── article.model.js
│ ├── articleTag.model.js
│ ├── profile.model.js
│ ├── tag.model.js
│ └── user.model.js
│
│── routes/
│ ├── article.routes.js
│ ├── articleTag.routes.js
│ ├── auth.routes.js
│ ├── profile.routes.js
│ ├── tag.routes.js
│ └── user.routes.js
│
└── app.js
```

---

## Configuración de Base de Datos

Este proyecto utiliza Sequelize como ORM para gestionar la conexión con la base de datos.

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
DB_NAME=nombre_de_tu_base_de_datos
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_HOST=localhost
DB_DIALECT=mysql
```

### Conexión

La configuración de la base de datos se encuentra en `src/config/database.js` y utiliza las siguientes variables de entorno:

- `DB_NAME`: Nombre de la base de datos
- `DB_USER`: Usuario de la base de datos
- `DB_PASSWORD`: Contraseña del usuario
- `DB_HOST`: Host del servidor (por defecto: localhost)
- `DB_DIALECT`: Dialecto de la base de datos (mysql, postgres, sqlite, etc.)

### Inicialización

La función `startDB()` realiza lo siguiente:

- Autentica la conexión con la base de datos
- Sincroniza los modelos con la base de datos
- **Nota**: `sync({ force: true })` elimina y recrea las tablas en cada inicio. Para producción, considera usar migraciones.

---

## 📦 **Instalación y Ejecución**

Para instalar y ejecutar el proyecto, sigue estos pasos:

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tu_usuario/blog_personal_tp_integrador.git
   cd blog_personal_tp_integrador
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Configura las variables de entorno en un archivo `.env` siguiendo el ejemplo de `.env.example`.

4. Inicia la base de datos y aplica las migraciones (si corresponde):

   Si usas SQLite (sin configuración adicional):

   ```bash
   npm run db:dev
   ```

   Si usas otro dialecto, asegúrate de tener la base de datos creada y configura las variables de entorno adecuadamente.

5. Ejecuta el proyecto:
   ```bash
   npm start
   ```

El servidor debería estar corriendo en `http://localhost:3000`.

---

## 📚 **Documentación de Endpoints**

### Autenticación

- `POST /api/auth/register`: Registrar un nuevo usuario
- `POST /api/auth/login`: Iniciar sesión
- `POST /api/auth/logout`: Cerrar sesión

### Usuarios

- `GET /api/users`: Obtener todos los usuarios
- `GET /api/users/:id`: Obtener un usuario por ID
- `PUT /api/users/:id`: Actualizar un usuario por ID
- `DELETE /api/users/:id`: Eliminar un usuario por ID

### Blogs

- `GET /api/blogs`: Obtener todos los blogs
- `GET /api/blogs/:id`: Obtener un blog por ID
- `POST /api/blogs`: Crear un nuevo blog
- `PUT /api/blogs/:id`: Actualizar un blog por ID
- `DELETE /api/blogs/:id`: Eliminar un blog por ID

### Tags

- `GET /api/tags`: Obtener todas las etiquetas
- `GET /api/tags/:id`: Obtener una etiqueta por ID
- `POST /api/tags`: Crear una nueva etiqueta
- `PUT /api/tags/:id`: Actualizar una etiqueta por ID
- `DELETE /api/tags/:id`: Eliminar una etiqueta por ID

---

## 🛠️ **Tecnologías Utilizadas**

- **Node.js**: Entorno de ejecución para JavaScript en el servidor
- **Express**: Framework para aplicaciones web en Node.js
- **Sequelize**: ORM para Node.js y bases de datos SQL
- **MySQL**: Sistema de gestión de bases de datos
- **JWT**: Autenticación basada en tokens
- **bcrypt**: Cifrado de contraseñas
- **express-validator**: Validación y sanitización de datos en Express
- **cookie-parser**: Parseo de cookies en solicitudes HTTP
- **dotenv**: Carga de variables de entorno desde un archivo `.env`
- **morgan**: Middleware de registro de solicitudes HTTP
- **cors**: Middleware para habilitar CORS

---

## 📌 **Notas Adicionales**

- Asegúrate de tener instalada la versión correcta de Node.js y MySQL.
- Para desarrollo, se recomienda usar una base de datos SQLite por su simplicidad. Para producción, configura una base de datos MySQL o PostgreSQL.
- Las migraciones y seeds de Sequelize no están incluidas. Se recomienda crear un script de migración para la estructura inicial de la base de datos.
- La documentación de los endpoints está disponible en el código, pero se recomienda usar herramientas como Postman o Insomnia para probar la API.

---
