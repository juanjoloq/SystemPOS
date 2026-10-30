# Sistema de Gestión de Ventas

Sistema web para el registro y administración de ventas en pequeños negocios. Permite gestionar productos, categorías y usuarios, registrar ventas, consultar su historial y mantener trazabilidad de las operaciones mediante un módulo de auditoría.

El proyecto está desarrollado con una arquitectura por capas en el backend y una interfaz SPA en React, priorizando la separación de responsabilidades, mantenibilidad y seguridad de la información.

## Características principales

- **Autenticación:** inicio de sesión mediante JWT.
- **Control de acceso:** gestión de permisos mediante roles de administrador y empleado.
- **Usuarios:** CRUD, activación y desactivación de cuentas.
- **Categorías:** administración de categorías de productos.
- **Productos:** gestión de productos, precios, categorías y estados.
- **Registro de ventas:** interfaz POS para registrar ventas de forma rápida.
- **Historial de ventas:** consulta, visualización y seguimiento de operaciones.
- **Edición de ventas:** modificaciones permitidas durante los primeros 10 minutos, registrando el motivo.
- **Anulación de ventas:** operación controlada según los permisos del usuario.
- **Auditoría:** registro de acciones importantes realizadas dentro del sistema.
- **Paginación y búsqueda:** consultas optimizadas para los diferentes módulos.

## Tecnologías utilizadas

### Frontend

- React 19
- Vite
- Tailwind CSS v4
- React Router DOM
- Axios
- TanStack Query
- React Hook Form
- SweetAlert2

### Backend

- Node.js
- Express 5
- MongoDB
- Mongoose 9
- JSON Web Token (JWT)
- Bcrypt
- Express Validator
- Helmet
- Morgan
- CORS
- Dotenv

### Infraestructura

- Docker
- Docker Compose
- MongoDB Atlas
- Git / GitHub

## Arquitectura

El backend utiliza una arquitectura por capas que permite separar las responsabilidades y mantener la lógica de negocio independiente de las peticiones HTTP.

```text
ventas-app/
│
├── backend/
│   └── src/
│       ├── config/
│       ├── constants/
│       ├── controllers/
│       ├── middlewares/
│       ├── models/
│       ├── routes/
│       ├── seeders/
│       ├── services/
│       ├── utils/
│       ├── validators/
│       ├── app.js
│       └── server.js
│
├── frontend/
│   └── src/
│       ├── api/
│       ├── assets/
│       ├── components/
│       ├── context/
│       ├── hooks/
│       ├── layouts/
│       ├── pages/
│       ├── routes/
│       ├── services/
│       ├── App.jsx
│       └── main.jsx
│
├── docker-compose.yml
├── .gitignore
└── README.md
```

### Responsabilidades del backend

| Capa | Responsabilidad |
|---|---|
| Controllers | Gestionar las peticiones HTTP. |
| Services | Contener la lógica de negocio. |
| Models | Definir los esquemas de MongoDB. |
| Routes | Definir los endpoints de la API. |
| Validators | Validar los datos recibidos. |
| Middlewares | Gestionar autenticación, permisos y errores. |
| Utils | Funciones reutilizables. |
| Seeders | Inicialización de datos. |

## Modelo de datos

El sistema utiliza MongoDB y cuenta con cinco colecciones principales:

- **Usuarios:** información de acceso, roles y estado.
- **Categorías:** clasificación de productos.
- **Productos:** catálogo de productos y precios.
- **Ventas:** registro de transacciones y detalle de productos vendidos.
- **Auditorías:** historial de acciones realizadas en el sistema.

El detalle de cada venta se almacena como un documento embebido, conservando el nombre y precio de los productos al momento de la transacción. Esto permite mantener la integridad del historial aunque los productos cambien posteriormente.

## Reglas de negocio

- Existen dos roles: `ADMIN` y `EMPLEADO`.
- Los usuarios no se eliminan físicamente, se desactivan.
- Las categorías y productos utilizan eliminación lógica.
- Las ventas conservan su información histórica.
- Los empleados pueden editar o cancelar ventas durante los primeros 10 minutos.
- Después de ese período, únicamente el administrador puede anular una venta.
- Las modificaciones y anulaciones registran su respectivo motivo.
- Las operaciones importantes generan registros de auditoría.

## Instalación y configuración

### Requisitos previos

- Node.js
- npm
- MongoDB Atlas
- Docker y Docker Compose (para ejecución mediante contenedores).

### 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd ventas-app
```

### 2. Configurar las variables de entorno

Crear los archivos `.env` utilizando los ejemplos proporcionados.

Backend:

```bash
cp backend/.env.example backend/.env
```

Frontend:

```bash
cp frontend/.env.example frontend/.env
```

Configurar las variables correspondientes.

**Backend (`backend/.env`):**

```env
PORT=3000
MONGODB_URI=
JWT_SECRET=
JWT_EXPIRES_IN=1d
```

**Frontend (`frontend/.env`):**

```env
VITE_API_URL=http://localhost:3000/api
```

Es necesario proporcionar una conexión válida de MongoDB Atlas y configurar un secreto seguro para JWT.

### 3. Instalar dependencias

Backend:

```bash
cd backend
npm install
```

Frontend:

```bash
cd ../frontend
npm install
```

### 4. Ejecutar el proyecto

Iniciar el backend:

```bash
cd backend
npm run dev
```

Iniciar el frontend en otra terminal:

```bash
cd frontend
npm run dev
```

El frontend estará disponible en la dirección local proporcionada por Vite.

## Ejecución con Docker

El proyecto incluye Dockerfiles multietapa para el frontend y backend, además de Docker Compose para administrar ambos servicios.

La configuración incluye un `healthcheck` para el backend, de manera que el frontend espere a que el servicio esté saludable antes de iniciar.

Para construir y levantar los contenedores:

```bash
docker compose up --build -d
```

Consultar el estado de los servicios:

```bash
docker compose ps
```

Consultar los registros:

```bash
docker compose logs -f
```

Detener los servicios:

```bash
docker compose down
```

La base de datos permanece alojada en MongoDB Atlas y no requiere un contenedor adicional.

## Seguridad

El proyecto implementa diferentes mecanismos para proteger la información:

- Autenticación mediante JWT.
- Contraseñas protegidas mediante bcrypt.
- Autorización basada en roles.
- Validación centralizada de datos.
- Protección mediante Helmet.
- Variables sensibles gestionadas mediante archivos de entorno.
- Manejo centralizado de errores.
- Auditoría de operaciones importantes.

## Estado del proyecto

Los módulos principales del sistema se encuentran implementados:

| Módulo | Estado |
|---|:---:|
| Autenticación | ✅ |
| Usuarios | ✅ |
| Categorías | ✅ |
| Productos | ✅ |
| Registro de ventas | ✅ |
| Historial de ventas | ✅ |
| Auditoría | ✅ |
| Dockerización | ✅ |

## Mejoras futuras

Algunas funcionalidades que podrían incorporarse en futuras versiones:

- Gestión de inventario y stock.
- Administración de clientes.
- Métodos de pago.
- Reportes avanzados.
- Exportación de información a Excel y PDF.
- Impresión de tickets.
- Gestión de múltiples sucursales.

## Documentación

Para consultar las decisiones técnicas, reglas de negocio, convenciones de desarrollo y documentación detallada de la arquitectura, revisar el documento de contexto del proyecto incluido en el repositorio.

## Autor

Desarrollado como proyecto de aplicación práctica de tecnologías de desarrollo web, arquitectura backend y contenedorización.

---

**Tecnologías:** React · Node.js · Express · MongoDB · Docker