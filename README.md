# Sistema de Gestión de Ventas

> **Versión:** 1.5
>
> Documento oficial del proyecto.
>
> Este archivo centraliza todas las decisiones de arquitectura, reglas de negocio, estructura del sistema, convenciones de desarrollo y estado actual del proyecto. Su propósito es mantener un único contexto durante todo el desarrollo y servir como guía para cualquier persona que participe en el proyecto.

---

# Tabla de Contenido

1. Introducción
2. Objetivos del Proyecto
3. Filosofía del Proyecto
4. Stack Tecnológico
5. Arquitectura General
6. Arquitectura Backend
7. Arquitectura Frontend
8. Convenciones del Proyecto
9. Flujo General del Sistema
10. Autenticación
11. Roles y Permisos
12. Modelos
13. Reglas de Negocio
14. Módulo de Usuarios
15. Módulo de Categorías
16. Módulo de Productos
17. Módulo de Ventas
18. Módulo de Auditoría
19. API REST
20. Estructura de Carpetas
21. Utilidades
22. Middlewares
23. Validators
24. Manejo de Errores
25. Flujo de Registro de Ventas
26. Flujo de Auditoría
27. Estado Actual del Proyecto
28. Roadmap
29. Mejoras Futuras
30. Decisiones Técnicas

---

# 1. Introducción

El Sistema de Gestión de Ventas es una aplicación web desarrollada para facilitar el registro y administración de ventas en pequeños negocios.

El sistema está diseñado bajo una arquitectura escalable que permite incorporar nuevas funcionalidades sin modificar la estructura principal del proyecto.

La prioridad del sistema no es ofrecer la mayor cantidad de funciones posibles, sino proporcionar un proceso de venta rápido, sencillo y seguro, manteniendo siempre la integridad de la información y la trazabilidad de todas las acciones realizadas por los usuarios.

Desde su diseño inicial se priorizó la separación de responsabilidades, la reutilización del código y la facilidad de mantenimiento, permitiendo que el proyecto pueda evolucionar durante los próximos años sin requerir reestructuraciones importantes.

---

# 2. Objetivos del Proyecto

## Objetivo General

Desarrollar un sistema web moderno para el registro y administración de ventas que permita controlar la operación diaria de un negocio mediante una interfaz sencilla y una arquitectura preparada para futuras ampliaciones.

---

## Objetivos Específicos

- Registrar ventas de forma rápida.
- Administrar usuarios mediante roles.
- Administrar categorías de productos.
- Administrar productos.
- Consultar el historial de ventas.
- Mantener un historial permanente de todas las operaciones.
- Registrar automáticamente las acciones importantes mediante auditoría.
- Garantizar la integridad de la información.
- Mantener una arquitectura limpia y escalable.

---

# 3. Filosofía del Proyecto

Durante todo el desarrollo deberán respetarse los siguientes principios.

## Simplicidad

La interfaz debe requerir el menor número posible de acciones para registrar una venta.

El usuario final debe concentrarse únicamente en vender.

---

## Escalabilidad

Cada módulo deberá desarrollarse pensando en futuras funcionalidades sin afectar las implementaciones existentes.

Agregar nuevas características no deberá implicar rediseñar la base de datos.

---

## Separación de Responsabilidades

Cada capa del sistema tendrá una única responsabilidad.

- Controllers reciben solicitudes HTTP.
- Services contienen la lógica del negocio.
- Models representan la base de datos.
- Validators validan la información.
- Middlewares procesan las solicitudes.
- Utils contienen funciones reutilizables.

---

## Reutilización

Todo código que pueda utilizarse en más de un lugar deberá abstraerse en utilidades o servicios reutilizables.

Debe evitarse la duplicación de lógica.

---

## Integridad de la Información

El sistema prioriza conservar el historial antes que eliminar información.

Por esta razón:

- No se eliminan usuarios.
- No se eliminan categorías.
- No se eliminan productos.
- Las ventas nunca se eliminan.
- Las ventas anuladas permanecen almacenadas.
- La auditoría nunca se modifica.

---

## Trazabilidad

Toda acción importante realizada por un usuario debe poder consultarse posteriormente.

Cada operación relevante genera automáticamente un registro en el módulo de Auditoría.

---

## Escalabilidad del Backend

Toda la lógica del negocio reside en el backend.

El frontend únicamente consume la API.

Esto permite desarrollar posteriormente:

- Aplicación móvil.
- Panel administrativo.
- Integraciones externas.
- API pública.
- Nuevos clientes.

Sin modificar la lógica existente.

---

# 4. Stack Tecnológico

## Backend

El backend está desarrollado con Node.js y Express utilizando una arquitectura por capas.

Tecnologías utilizadas:

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- bcrypt
- express-validator
- Helmet
- CORS
- Morgan
- Dotenv

---

## Frontend

El frontend se desarrolla como una SPA utilizando React.

Tecnologías:

- React 19
- Vite
- React Router DOM
- Axios
- Bootstrap

---

## Base de Datos

Motor:

- MongoDB Atlas

ODM:

- Mongoose

La elección de MongoDB responde a la flexibilidad necesaria para almacenar documentos embebidos, especialmente el detalle histórico de las ventas.

---

## Control de Versiones

- Git
- GitHub

---

## Contenedores

Docker se utiliza únicamente para:

- Backend
- Frontend

MongoDB permanecerá alojado en MongoDB Atlas.

---

# 5. Arquitectura General

El sistema se divide en módulos independientes.

```

Sistema de Gestión de Ventas

├── Autenticación
├── Dashboard
├── Usuarios
├── Categorías
├── Productos
├── Ventas
├── Historial
└── Auditoría

```

Cada módulo es independiente y se comunica únicamente mediante la capa de servicios.

No existen dependencias directas entre módulos fuera de sus relaciones de negocio.

---

# Flujo General

```

Usuario

↓

Login

↓

JWT

↓

Dashboard

↓

Selecciona módulo

↓

Controller

↓

Validator

↓

Service

↓

Model

↓

MongoDB

↓

Respuesta

↓

Frontend

```

---

# 6. Arquitectura Backend

El backend sigue una arquitectura por capas.

```

backend/

src/

├── config/
│
├── constants/
│
├── controllers/
│
├── middlewares/
│
├── models/
│
├── routes/
│
├── seeders/
│
├── services/
│
├── utils/
│
├── validators/
│
├── app.js
│
└── server.js

```

---

## Config

Contiene toda la configuración del proyecto.

Ejemplos:

- Variables de entorno.
- Conexión a MongoDB.

---

## Constants

Contiene constantes reutilizables por todo el sistema.

Ejemplo:

- Módulos de Auditoría.
- Acciones de Auditoría.
- Enumeraciones del sistema.

Evita el uso de cadenas de texto repetidas.

---

## Controllers

Los controllers representan la capa HTTP.

Su única responsabilidad es:

- Recibir la petición.
- Llamar al Service.
- Retornar la respuesta.
- Delegar el manejo de errores.

Los controllers nunca contienen lógica de negocio.

---

## Services

Es la capa más importante del backend.

Aquí reside toda la lógica del sistema.

Ejemplos:

- Validaciones de negocio.
- Consultas.
- Relaciones entre modelos.
- Creación.
- Actualización.
- Cálculos.
- Auditoría.
- Reglas del sistema.

Toda regla del negocio debe implementarse aquí.

---

## Models

Representan las colecciones de MongoDB.

Cada modelo implementa:

- Schema.
- Validaciones.
- Índices.
- Métodos.
- Hooks.
- toJSON().
- timestamps.

---

## Routes

Definen los endpoints públicos de la API.

No contienen lógica.

Únicamente:

- Middlewares.
- Validators.
- Controllers.

---

## Validators

Toda validación de entrada se realiza mediante Express Validator.

Cada módulo posee su propio archivo de validaciones.

Esto mantiene las rutas limpias y facilita el mantenimiento.

---

## Middlewares

Procesan las solicitudes antes de llegar a los controllers.

Actualmente existen:

- validarJWT
- validarRoles
- validarCampos
- manejo global de errores

---

## Utils

Funciones reutilizables.

Actualmente incluyen:

- ApiError
- generarJWT
- normalizarTexto
- buildPagination
- buildPaginationResponse

Todas las utilidades son independientes del negocio.

---

## Seeders

Permiten inicializar datos del sistema.

Actualmente implementan:

- Creación automática del usuario administrador.

Si el administrador ya existe, el seeder no realiza ninguna acción.

---

# 7. Arquitectura Frontend

El frontend seguirá una arquitectura modular para facilitar el crecimiento del proyecto.

```

frontend/

src/

├── api/
├── assets/
├── components/
├── hooks/
├── layouts/
├── pages/
├── routes/
├── services/
├── utils/
├── App.jsx
└── main.jsx

```

Cada módulo del backend tendrá su representación correspondiente en el frontend.

Esto facilita mantener una estructura consistente entre ambas aplicaciones.

---
# 8. Convenciones del Proyecto

Todas las decisiones de desarrollo deberán seguir las siguientes convenciones.

Estas reglas buscan mantener un código consistente, legible y fácil de mantener independientemente del tamaño que alcance el proyecto.

---

## Idioma

Todo el proyecto se desarrolla en español.

Incluye:

- Variables
- Funciones
- Modelos
- Servicios
- Controllers
- Validators
- Middlewares
- Comentarios
- Mensajes de error
- Mensajes de éxito

Ejemplo:

```javascript
crearProductoService()

listarVentasService()

obtenerUsuarioService()
```

---

## Nombres de Archivos

Los archivos utilizan nombres descriptivos.

Ejemplos:

```
usuario.service.js

producto.controller.js

venta.validator.js

auditoria.route.js
```

---

## Nombres de Funciones

Las funciones deben comenzar con un verbo.

Ejemplos correctos

```
crearUsuario()

listarProductos()

obtenerVenta()

actualizarCategoria()

cambiarEstadoProducto()

registrarAuditoria()
```

Ejemplos incorrectos

```
usuario()

producto()

ventas()

categoria()
```

---

## Controllers

Los controllers únicamente reciben la petición HTTP.

Nunca contienen lógica de negocio.

Ejemplo

```javascript
export const crearProducto = async (req, res, next) => {
    try {

        const data = await crearProductoService(req.body);

        res.status(201).json(data);

    } catch (error) {

        next(error);

    }
};
```

Toda la lógica pertenece al Service.

---

## Services

Toda la lógica del negocio vive aquí.

Ejemplos

- Consultas
- Validaciones
- Cálculos
- Relaciones
- Auditoría
- Reglas del sistema

Si una regla cambia, únicamente debe modificarse el Service.

---

## Validators

Toda entrada debe validarse antes de llegar al Service.

No se realizan validaciones de formato dentro de los Services salvo reglas propias del negocio.

---

## Middlewares

Los middlewares únicamente realizan procesos transversales.

Ejemplos

- Autenticación
- Roles
- Validación
- Manejo de errores

Nunca deben contener lógica del negocio.

---

## Respuestas de la API

Todas las respuestas mantienen la misma estructura.

Respuesta exitosa

```json
{
    "ok": true,
    "message": "Producto creado correctamente.",
    "producto": {}
}
```

Respuesta con listado

```json
{
    "ok": true,
    "productos": [],
    "pagination": {}
}
```

Respuesta con error

```json
{
    "ok": false,
    "message": "Producto no encontrado."
}
```

Esto permite que el frontend tenga un comportamiento consistente.

---

## Eliminación Física

No se realizan eliminaciones físicas.

Todos los módulos utilizan eliminación lógica mediante el campo:

```
activo
```

Excepto las ventas.

Las ventas utilizan el estado:

```
ACTIVA

ANULADA
```

---

## Normalización

Antes de almacenar nombres se normaliza el texto.

Ejemplo

```
hamburguesa

Hamburguesa

HAMBURGUESA
```

Todos se almacenan como

```
HAMBURGUESA
```

Esto evita registros duplicados.

---

## Paginación

Todos los listados utilizan paginación.

Se implementa mediante:

```
buildPagination()

buildPaginationResponse()
```

Parámetros estándar

```
?page=1

?limit=10
```

---

## Búsquedas

Las búsquedas utilizan expresiones regulares.

Ejemplo

```
GET /productos?search=pollo
```

No distinguen mayúsculas.

---

## Ordenamiento

Los listados deben mantener un orden consistente.

Actualmente

Usuarios

```
Más recientes primero.
```

Categorías

```
Orden alfabético.
```

Productos

```
Orden alfabético.
```

Ventas

```
Más recientes primero.
```

Auditoría

```
Más reciente primero.
```

---

# 9. Flujo General del Sistema

El flujo principal del sistema es el siguiente.

```
Login

↓

Validar credenciales

↓

Generar JWT

↓

Acceso al Dashboard

↓

Seleccionar módulo

↓

Enviar petición

↓

Validar datos

↓

Validar permisos

↓

Ejecutar lógica

↓

Guardar cambios

↓

Registrar auditoría

↓

Responder al Frontend
```

Toda operación importante finaliza registrando una auditoría.

---

# 10. Autenticación

El sistema utiliza autenticación basada en JWT.

Después del inicio de sesión se genera un token firmado.

Este token deberá enviarse en todas las solicitudes protegidas.

Formato

```
Authorization

Bearer TOKEN
```

---

## Login

Proceso

```
Usuario

↓

Validar existencia

↓

Validar contraseña

↓

Generar JWT

↓

Retornar usuario + token
```

---

## Middleware validarJWT

Responsabilidades

- Verificar existencia del token.
- Validar formato.
- Verificar firma.
- Buscar usuario.
- Verificar que el usuario siga activo.
- Adjuntar el usuario autenticado a la petición.

Después del middleware estará disponible

```javascript
req.usuario
```

---

## Seguridad

No se almacena información sensible dentro del JWT.

Únicamente se almacena

```
uid
```

Toda la información del usuario se consulta nuevamente en la base de datos.

Esto permite desactivar usuarios sin necesidad de invalidar manualmente los tokens.

---

# 11. Roles y Permisos

Actualmente existen dos roles.

```
ADMIN

EMPLEADO
```

---

## ADMIN

Tiene acceso completo.

Puede

- Crear usuarios.
- Editar usuarios.
- Activar usuarios.
- Desactivar usuarios.
- Administrar categorías.
- Administrar productos.
- Registrar ventas.
- Editar ventas.
- Anular ventas.
- Consultar auditoría.

---

## EMPLEADO

Puede

- Registrar ventas.
- Consultar ventas.

No puede administrar información del sistema.

---

## Middleware validarRoles

Este middleware recibe uno o varios roles permitidos.

Ejemplo

```javascript
validarRoles("ADMIN")
```

o

```javascript
validarRoles(
    "ADMIN",
    "EMPLEADO"
)
```

Si el usuario autenticado no pertenece a alguno de los roles permitidos, la solicitud es rechazada.

---

# 12. Modelos

El sistema está compuesto por cinco modelos principales.

```
Usuario

Categoría

Producto

Venta

Auditoría
```

Cada modelo representa una colección independiente de MongoDB.

Las relaciones se implementan únicamente cuando son necesarias.

La mayor parte del sistema prioriza documentos autocontenidos para mantener el histórico de la información.

Los siguientes apartados documentan cada modelo en detalle.

---

# 12. Modelos

Cada modelo representa una colección independiente dentro de MongoDB.

Todos utilizan Mongoose como ODM y siguen las siguientes convenciones:

- Uso de `timestamps`.
- Método `toJSON()` para ocultar información innecesaria.
- Validaciones desde el Schema.
- Índices para optimizar búsquedas.
- Hooks cuando son necesarios.
- Eliminación lógica cuando aplica.

---

# Modelo Usuario

Representa los usuarios autorizados para ingresar al sistema.

## Responsabilidades

- Autenticación.
- Autorización.
- Identificación del usuario que realiza operaciones.
- Registro en Auditoría.

---

## Campos

| Campo | Tipo | Descripción |
|--------|------|-------------|
| nombre | String | Nombre completo |
| usuario | String | Nombre de usuario normalizado |
| password | String | Contraseña encriptada |
| rol | String | ADMIN o EMPLEADO |
| activo | Boolean | Eliminación lógica |
| createdAt | Date | Fecha de creación |
| updatedAt | Date | Última modificación |

---

## Reglas

- El usuario debe ser único.
- Se normaliza antes de almacenarse.
- La contraseña nunca se devuelve.
- La contraseña siempre se almacena utilizando bcrypt.
- No existen eliminaciones físicas.
- Un usuario desactivado no puede iniciar sesión.

---

# Modelo Categoría

Permite organizar los productos.

Ejemplos

```
BEBIDAS

HAMBURGUESAS

PERROS

ADICIONES

POSTRES
```

---

## Campos

| Campo | Tipo |
|--------|------|
| nombre | String |
| activo | Boolean |
| createdAt | Date |
| updatedAt | Date |

---

## Reglas

- El nombre debe ser único.
- Se normaliza antes de almacenarse.
- No se elimina físicamente.
- Puede activarse o desactivarse.

---

# Modelo Producto

Representa cada producto disponible para la venta.

---

## Campos

| Campo | Tipo |
|--------|------|
| nombre | String |
| categoria | ObjectId |
| precio | Number |
| activo | Boolean |
| createdAt | Date |
| updatedAt | Date |

---

## Relaciones

```
Producto

↓

Categoría
```

---

## Reglas

- Debe pertenecer a una categoría existente.
- La categoría debe estar activa.
- El precio debe ser mayor que cero.
- No existen productos duplicados dentro de la misma categoría.
- El nombre se normaliza antes de almacenarse.
- Puede activarse o desactivarse.

---

## Decisiones de Diseño

### No existe descripción

El sistema busca registrar ventas de forma rápida.

Agregar descripciones no aporta valor al proceso de venta y aumenta el mantenimiento de la información.

Por este motivo el modelo únicamente almacena los datos necesarios.

---

### No existe stock

El sistema actual no administra inventario.

El control de existencias implica procesos adicionales como:

- Compras.
- Ajustes.
- Entradas.
- Salidas.
- Kardex.
- Proveedores.

Ese módulo podrá incorporarse en futuras versiones sin modificar el funcionamiento de las ventas.

---

# Modelo Venta

Es el núcleo del sistema.

Cada venta almacena una fotografía completa de la transacción realizada.

Esto garantiza que el historial nunca cambie aunque posteriormente se modifiquen productos o categorías.

---

## Campos principales

| Campo | Tipo |
|--------|------|
| productos | Array |
| total | Number |
| estado | String |
| creadoPor | ObjectId |
| actualizadoPor | ObjectId |
| anuladoPor | ObjectId |
| motivoModificacion | String |
| motivoAnulacion | String |
| fechaAnulacion | Date |
| createdAt | Date |
| updatedAt | Date |

---

## Estados

```
ACTIVA

ANULADA
```

No existen otros estados.

---

## Detalle de Venta

Cada producto vendido se almacena completamente dentro de la venta.

```
Venta

↓

DetalleVenta
```

---

Cada elemento del detalle contiene

| Campo | Tipo |
|--------|------|
| productoId | ObjectId |
| nombre | String |
| categoria | Object |
| precioUnitario | Number |
| cantidad | Number |
| subtotal | Number |

---

## Categoría embebida

Dentro del detalle se almacena

```json
{
    "categoria": {
        "id": "...",
        "nombre": "BEBIDAS"
    }
}
```

Esto evita consultas adicionales cuando se consulte el historial.

---

## ¿Por qué guardar toda esta información?

Supongamos la siguiente venta.

```
COCA COLA

2 unidades

3.500
```

Una semana después ocurre lo siguiente.

- El producto cambia de nombre.
- Cambia de categoría.
- Cambia de precio.

Si únicamente se almacenara el ObjectId del producto, el historial mostraría información incorrecta.

Por esta razón el detalle almacena:

- Nombre.
- Categoría.
- Precio.
- Cantidad.
- Subtotal.

La venta conserva exactamente la información existente en el momento de realizar la transacción.

Este comportamiento hace que el historial sea completamente inmutable.

---

## Total

El total nunca llega desde el frontend.

Siempre es calculado por el backend.

Esto evita manipulaciones del cliente.

---

# Modelo Auditoría

Permite registrar automáticamente todas las acciones importantes realizadas por los usuarios.

El usuario nunca interactúa directamente con este módulo.

Toda la información es generada por el sistema.

---

## Campos

| Campo | Tipo |
|--------|------|
| usuario | Object |
| modulo | String |
| accion | String |
| descripcion | String |
| motivo | String |
| createdAt | Date |
| updatedAt | Date |

---

## Usuario embebido

Se almacena

```json
{
    "usuario": {
        "id": "...",
        "nombre": "Administrador"
    }
}
```

Esto evita perder información si posteriormente cambia el nombre del usuario.

---

## Módulos registrados

```
USUARIOS

CATEGORÍAS

PRODUCTOS

VENTAS
```

---

## Acciones registradas

```
CREAR

ACTUALIZAR

CAMBIAR ESTADO

ANULAR
```

---

## Decisiones de Diseño

### No existe endpoint POST

La auditoría únicamente puede ser creada por el propio sistema.

Ningún usuario puede registrar auditorías manualmente.

Esto garantiza la confiabilidad del historial.

---

### No se modifica

Una auditoría representa un hecho ocurrido.

Modificarla implicaría alterar el historial del sistema.

Por esta razón nunca puede editarse ni eliminarse.

---

# Relaciones entre Modelos

```
Usuario
   │
   ├──────────────┐
   │              │
   ▼              ▼
Venta         Auditoría


Categoría
    │
    ▼
Producto
    │
    ▼
DetalleVenta
    │
    ▼
Venta
```

---

# Principios de Persistencia

El sistema sigue las siguientes reglas para conservar la información.

| Modelo | Eliminación Física |
|---------|-------------------|
| Usuario | ❌ |
| Categoría | ❌ |
| Producto | ❌ |
| Venta | ❌ |
| Auditoría | ❌ |

Toda la información permanece almacenada para conservar la trazabilidad completa del sistema.

---
# 13. Reglas de Negocio

Las siguientes reglas representan el comportamiento oficial del sistema.

Todas deben implementarse en la capa **Service** y nunca en los Controllers.

---

# Reglas Generales

## Eliminación lógica

Ninguna entidad del sistema se elimina físicamente.

Se busca preservar el historial completo de la información.

Aplica para:

- Usuarios
- Categorías
- Productos

Las ventas y auditorías nunca podrán eliminarse.

---

## Normalización de texto

Antes de almacenar nombres se normaliza el texto mediante la utilidad:

```
normalizarTexto()
```

Ejemplos

```
hamburguesa

Hamburguesa

HAMBURGUESA
```

Todos serán almacenados como

```
HAMBURGUESA
```

Con esto se evita la creación de registros duplicados por diferencias de escritura.

---

## Paginación

Todos los módulos que listan información deben utilizar:

```
buildPagination()

buildPaginationResponse()
```

Esto garantiza una respuesta uniforme en toda la API.

---

## Validaciones

Toda la información recibida desde el frontend debe pasar por:

1. Validator
2. Middleware validarCampos
3. Service

Nunca debe confiarse en la información enviada por el cliente.

---

## Auditoría

Toda operación importante deberá generar automáticamente un registro en Auditoría.

Esta responsabilidad pertenece exclusivamente al backend.

---

# Reglas del Módulo Usuarios

## Crear usuario

Debe cumplirse:

- Nombre obligatorio.
- Usuario obligatorio.
- Contraseña obligatoria.
- Rol obligatorio.

---

## Usuario único

No pueden existir dos usuarios con el mismo nombre de usuario.

La comparación se realiza utilizando el usuario normalizado.

---

## Contraseña

Las contraseñas nunca se almacenan en texto plano.

Siempre se utiliza:

```
bcrypt
```

---

## Inicio de sesión

Un usuario únicamente puede iniciar sesión si:

- Existe.
- Está activo.
- La contraseña coincide.

---

## Cambio de estado

Los usuarios no se eliminan.

Únicamente pueden:

- Activarse.
- Desactivarse.

---

## Auditoría

Se registra automáticamente:

- Crear usuario.
- Actualizar usuario.
- Cambiar estado.

---

# Reglas del Módulo Categorías

## Nombre único

No pueden existir categorías con el mismo nombre.

---

## Activación

Las categorías pueden activarse o desactivarse.

No existe eliminación física.

---

## Productos asociados

Una categoría inactiva impide registrar productos nuevos en ella.

Además, los productos pertenecientes a esa categoría no podrán venderse mientras permanezca inactiva.

---

## Auditoría

Se registra automáticamente:

- Crear categoría.
- Actualizar categoría.
- Cambiar estado.

---

# Reglas del Módulo Productos

## Categoría obligatoria

Todo producto debe pertenecer a una categoría válida.

---

## Categoría activa

No puede crearse ni actualizarse un producto utilizando una categoría inactiva.

---

## Precio

El precio debe ser mayor que cero.

No se permiten:

```
0

-1

-50
```

---

## Duplicados

No pueden existir dos productos con el mismo nombre dentro de una misma categoría.

Sí pueden existir productos con el mismo nombre en categorías diferentes.

Ejemplo válido

```
BEBIDAS

COCA COLA
```

```
PROMOCIONES

COCA COLA
```

---

## Estado

Los productos únicamente pueden:

- Activarse.
- Desactivarse.

---

## Producto inactivo

Un producto inactivo no puede incluirse en nuevas ventas.

---

## Sin descripción

El modelo no almacena descripciones.

Esta decisión simplifica el mantenimiento y evita información innecesaria.

---

## Sin stock

El sistema no controla existencias.

El inventario será un módulo independiente en futuras versiones.

---

## Auditoría

Se registra automáticamente:

- Crear producto.
- Actualizar producto.
- Cambiar estado.

---

# Reglas del Módulo Ventas

Las ventas representan el módulo más importante del sistema.

Toda la lógica de negocio se concentra aquí.

---

## Sin clientes

La primera versión del sistema no administra clientes.

Las ventas únicamente registran:

- Productos.
- Cantidades.
- Totales.
- Usuario que realizó la venta.

El modelo fue diseñado para permitir incorporar clientes en una futura versión sin modificar el historial existente.

---

## Productos repetidos

No se permite registrar el mismo producto dos veces dentro de una misma venta.

Ejemplo incorrecto

```
COCA COLA

Cantidad 1
```

```
COCA COLA

Cantidad 3
```

Debe enviarse como

```
COCA COLA

Cantidad 4
```

---

## Productos activos

Solo pueden venderse productos activos.

---

## Categorías activas

Si la categoría está inactiva ninguno de sus productos podrá venderse.

---

## Precio histórico

El precio utilizado corresponde al precio del producto en el momento de realizar la venta.

Aunque posteriormente cambie el precio del producto, la venta conservará el valor original.

---

## Histórico del producto

Cada venta almacena:

- Nombre.
- Categoría.
- Precio.
- Cantidad.
- Subtotal.

No depende del documento Producto para consultar el historial.

---

## Cálculo del subtotal

```
Precio × Cantidad
```

Siempre es calculado por el backend.

---

## Cálculo del total

La suma de todos los subtotales genera automáticamente el total de la venta.

El frontend nunca envía este valor.

---

## Estados

Una venta únicamente puede encontrarse en uno de estos estados.

```
ACTIVA
```

```
ANULADA
```

---

## Edición

Las ventas solo pueden modificarse durante los primeros diez minutos posteriores a su creación.

Transcurrido ese tiempo la venta queda bloqueada permanentemente.

---

## Motivo de modificación

Toda modificación debe indicar el motivo correspondiente.

Este motivo queda almacenado en la venta y también en la Auditoría.

---

## Anulación

Una venta puede anularse.

La anulación conserva toda la información histórica.

Nunca elimina registros.

---

## Venta anulada

Una venta anulada:

- No puede modificarse.
- No puede anularse nuevamente.
- Permanece visible para consultas y reportes.

---

## Auditoría

Se registra automáticamente:

- Crear venta.
- Actualizar venta.
- Anular venta.

---

# Reglas del Módulo Auditoría

La Auditoría constituye el historial oficial del sistema.

Toda acción importante queda registrada automáticamente.

---

## Registro automático

No existe ninguna acción manual para registrar auditorías.

Siempre son generadas desde los Services.

---

## Información registrada

Cada auditoría almacena:

- Usuario.
- Módulo.
- Acción.
- Descripción.
- Motivo (cuando aplica).
- Fecha.

---

## Inmutabilidad

Las auditorías nunca pueden:

- Editarse.
- Eliminarse.

Representan hechos históricos del sistema.

---

## Consulta

Únicamente los usuarios con rol **ADMIN** pueden consultar el historial de auditoría.

---

# 14. Módulo de Usuarios

El módulo de Usuarios administra el acceso al sistema.

Toda persona que utilice la aplicación debe contar con un usuario registrado.

Las operaciones disponibles son:

- Crear usuario.
- Listar usuarios.
- Obtener usuario.
- Actualizar usuario.
- Cambiar estado.

---

## Flujo de creación

```
Solicitud

↓

Validator

↓

Controller

↓

Service

↓

Verificar usuario existente

↓

Encriptar contraseña

↓

Guardar usuario

↓

Registrar auditoría

↓

Respuesta
```

---

## Endpoints

| Método | Endpoint | Descripción |
|---------|----------|-------------|
| POST | /usuarios | Crear usuario |
| GET | /usuarios | Listar usuarios |
| GET | /usuarios/:id | Obtener usuario |
| PUT | /usuarios/:id | Actualizar usuario |
| PATCH | /usuarios/:id/estado | Activar o desactivar |

---

## Operaciones registradas

Cada una de las siguientes acciones genera un registro en Auditoría.

- Crear.
- Actualizar.
- Cambiar estado.

---

## Próxima sección

En la siguiente parte se documentarán completamente los módulos de:

- Categorías
- Productos
- Ventas
- Auditoría

incluyendo flujos internos y decisiones de diseño.

---

# 15. Módulo de Categorías

El módulo de Categorías permite organizar los productos del sistema.

No existe un límite para la cantidad de categorías que pueden registrarse.

---

## Objetivos

- Organizar productos.
- Facilitar búsquedas.
- Simplificar la administración.
- Evitar duplicidad de productos.

---

## Operaciones

- Crear categoría.
- Listar categorías.
- Obtener categoría.
- Actualizar categoría.
- Cambiar estado.

---

## Flujo de creación

```
Solicitud

↓

Validator

↓

Controller

↓

Service

↓

Normalizar nombre

↓

Verificar duplicados

↓

Guardar

↓

Registrar auditoría

↓

Respuesta
```

---

## Flujo de actualización

```
Solicitud

↓

Validar ID

↓

Buscar categoría

↓

Normalizar nombre

↓

Validar duplicados

↓

Actualizar

↓

Registrar auditoría

↓

Respuesta
```

---

## Cambio de estado

Las categorías utilizan eliminación lógica.

```
Activo

↓

Inactivo

↓

Activo
```

Nunca se eliminan de la base de datos.

---

## Restricciones

No pueden existir categorías duplicadas.

No pueden crearse productos sobre categorías inactivas.

Los productos pertenecientes a una categoría inactiva no podrán venderse.

---

## Endpoints

| Método | Endpoint | Descripción |
|---------|----------|-------------|
| POST | /categorias | Crear |
| GET | /categorias | Listar |
| GET | /categorias/:id | Obtener |
| PUT | /categorias/:id | Actualizar |
| PATCH | /categorias/:id/estado | Activar / Desactivar |

---

## Auditoría

Se registra automáticamente

- Crear categoría.
- Actualizar categoría.
- Cambiar estado.

---

# 16. Módulo de Productos

El módulo de Productos administra todos los artículos disponibles para la venta.

---

## Objetivos

- Registrar productos.
- Organizar productos por categoría.
- Administrar precios.
- Habilitar o deshabilitar productos.

---

## Operaciones

- Crear.
- Listar.
- Obtener.
- Actualizar.
- Cambiar estado.

---

## Flujo de creación

```
Solicitud

↓

Validator

↓

Controller

↓

Service

↓

Validar categoría

↓

Validar estado categoría

↓

Normalizar nombre

↓

Validar duplicados

↓

Guardar

↓

Registrar auditoría

↓

Respuesta
```

---

## Flujo de actualización

```
Solicitud

↓

Buscar producto

↓

Validar categoría

↓

Normalizar nombre

↓

Validar duplicados

↓

Actualizar

↓

Registrar auditoría

↓

Respuesta
```

---

## Cambio de estado

Los productos nunca se eliminan.

Únicamente cambian entre

```
Activo

↓

Inactivo
```

---

## Restricciones

Todo producto debe pertenecer a una categoría.

La categoría debe existir.

La categoría debe estar activa.

El precio debe ser mayor que cero.

No pueden existir productos duplicados dentro de una misma categoría.

---

## Decisiones Técnicas

### Precio

El precio representa el valor actual del producto.

Cuando este cambie, únicamente afectará las ventas futuras.

Las ventas anteriores conservarán el precio histórico almacenado en su detalle.

---

### Categoría

Los productos mantienen una referencia hacia Categoría.

Sin embargo, la venta almacena una copia del nombre de la categoría para conservar el histórico.

---

### Stock

No existe control de inventario.

Este módulo será independiente en futuras versiones.

---

### Descripción

No existe campo descripción.

El sistema busca minimizar información innecesaria para agilizar la administración.

---

## Endpoints

| Método | Endpoint | Descripción |
|---------|----------|-------------|
| POST | /productos | Crear |
| GET | /productos | Listar |
| GET | /productos/:id | Obtener |
| PUT | /productos/:id | Actualizar |
| PATCH | /productos/:id/estado | Activar / Desactivar |

---

## Auditoría

Se registra automáticamente

- Crear producto.
- Actualizar producto.
- Cambiar estado.

---

# 17. Módulo de Ventas

El módulo de Ventas constituye el núcleo del sistema.

Toda la lógica de negocio fue diseñada para preservar el historial de cada transacción sin depender del estado actual de los productos.

---

## Objetivos

- Registrar ventas.
- Consultar ventas.
- Editar ventas.
- Anular ventas.
- Mantener histórico permanente.

---

## Operaciones

- Crear venta.
- Listar ventas.
- Obtener venta.
- Actualizar venta.
- Anular venta.

---

# Flujo de Registro

```
Solicitud

↓

Validator

↓

Controller

↓

Service

↓

Validar productos

↓

Validar categorías

↓

Validar duplicados

↓

Construir detalle

↓

Calcular subtotales

↓

Calcular total

↓

Guardar venta

↓

Registrar auditoría

↓

Respuesta
```

---

## Construcción del detalle

Antes de guardar una venta se obtiene la información actual de cada producto.

Cada detalle almacena

```
Producto

↓

Nombre

↓

Categoría

↓

Precio Unitario

↓

Cantidad

↓

Subtotal
```

Posteriormente esa información queda congelada dentro de la venta.

---

## Cálculo del subtotal

```
precioUnitario × cantidad
```

---

## Cálculo del total

```
Σ subtotales
```

Nunca llega desde el frontend.

Siempre es calculado por el backend.

---

## Validaciones

Antes de registrar una venta se verifica

- Que exista cada producto.
- Que esté activo.
- Que su categoría esté activa.
- Que no haya productos repetidos.
- Que la cantidad sea válida.

Si alguna validación falla la venta completa se cancela.

---

## Edición de ventas

Una venta únicamente puede modificarse durante los primeros diez minutos desde su creación.

Después de ese tiempo queda bloqueada permanentemente.

---

## Flujo de actualización

```
Solicitud

↓

Buscar venta

↓

Verificar estado

↓

Verificar límite de tiempo

↓

Reconstruir detalle

↓

Recalcular total

↓

Guardar

↓

Registrar auditoría

↓

Respuesta
```

---

## Motivo de modificación

Toda actualización requiere un motivo.

El motivo queda almacenado en

- Venta.
- Auditoría.

Esto permite conocer posteriormente por qué fue modificada.

---

## Anulación

Una venta puede anularse.

Nunca eliminarse.

---

## Flujo de anulación

```
Solicitud

↓

Buscar venta

↓

Verificar estado

↓

Cambiar estado

↓

Guardar motivo

↓

Guardar fecha

↓

Guardar usuario

↓

Registrar auditoría

↓

Respuesta
```

---

## Motivo de anulación

Toda anulación requiere un motivo.

El motivo queda registrado tanto en la venta como en la auditoría.

---

## Estados

```
ACTIVA
```

```
ANULADA
```

No existen estados intermedios.

---

## Histórico

El histórico de una venta nunca cambia.

Aunque posteriormente:

- cambie el nombre del producto,
- cambie la categoría,
- cambie el precio,

la venta conservará exactamente la información existente al momento del registro.

Esta fue una decisión de diseño para garantizar la integridad de los reportes y consultas históricas.

---

## Endpoints

| Método | Endpoint | Descripción |
|---------|----------|-------------|
| POST | /ventas | Crear |
| GET | /ventas | Listar |
| GET | /ventas/:id | Obtener |
| PUT | /ventas/:id | Actualizar |
| PATCH | /ventas/:id/anular | Anular |

---

## Auditoría

Se registra automáticamente

- Crear venta.
- Actualizar venta.
- Anular venta.

---

# 18. Módulo de Auditoría

El módulo de Auditoría registra automáticamente todas las acciones importantes realizadas dentro del sistema.

Su objetivo es garantizar la trazabilidad de la información y permitir conocer quién realizó una acción, cuándo la realizó y, cuando aplica, el motivo por el cual fue ejecutada.

La auditoría representa el historial oficial del sistema.

---

## Objetivos

- Registrar acciones importantes.
- Conservar el historial del sistema.
- Facilitar procesos de revisión.
- Identificar al responsable de cada operación.
- Mantener evidencia de modificaciones y anulaciones.

---

## Principios

La auditoría cumple los siguientes principios.

### Registro automático

Toda auditoría es creada exclusivamente por el backend.

El usuario nunca interactúa directamente con este módulo.

---

### Integridad

Las auditorías nunca pueden:

- Editarse.
- Eliminarse.

Representan hechos históricos del sistema.

---

### Independencia

La auditoría es independiente del resto de módulos.

Cada Service registra únicamente el evento correspondiente mediante la función:

```javascript
registrarAuditoria()
```

---

### Reutilización

Toda la lógica de creación se encuentra centralizada.

Esto evita duplicar código en cada módulo.

---

## Flujo

```
Service

↓

Operación exitosa

↓

registrarAuditoria()

↓

Crear documento

↓

Guardar

↓

Continuar respuesta
```

---

## Información registrada

Cada auditoría almacena:

| Campo | Descripción |
|--------|-------------|
| usuario.id | Usuario responsable |
| usuario.nombre | Nombre del usuario |
| modulo | Módulo afectado |
| accion | Acción realizada |
| descripcion | Descripción del evento |
| motivo | Cuando aplica |
| createdAt | Fecha y hora |

---

## Usuario embebido

La auditoría no almacena únicamente el ObjectId del usuario.

También almacena el nombre.

Ejemplo

```json
{
    "usuario": {
        "id": "...",
        "nombre": "Administrador"
    }
}
```

De esta manera el historial conserva la información incluso si posteriormente cambia el nombre del usuario.

---

## Módulos registrados

Actualmente existen los siguientes módulos.

```
USUARIOS

CATEGORIAS

PRODUCTOS

VENTAS
```

Estos valores se encuentran definidos en:

```
constants/auditoria.js
```

---

## Acciones registradas

Actualmente existen las siguientes acciones.

```
CREAR

ACTUALIZAR

CAMBIAR_ESTADO

ANULAR
```

Las acciones también se encuentran centralizadas dentro de:

```
constants/auditoria.js
```

---

## ¿Por qué utilizar constantes?

Evita escribir cadenas de texto repetidas.

Ejemplo incorrecto

```javascript
"USUARIO"

"Usuarios"

"usuarios"

"usuario"
```

Todas representan el mismo módulo pero generan inconsistencias.

Con constantes únicamente existe un valor válido.

---

## Descripción

Cada auditoría incluye una descripción legible.

Ejemplos

```
Creó el usuario "JUAN".
```

```
Actualizó el producto "COCA COLA".
```

```
Desactivó la categoría "BEBIDAS".
```

```
Anuló la venta "687ab8..."
```

Esto facilita la lectura del historial.

---

## Motivo

Algunas acciones requieren un motivo.

Actualmente aplica para:

- Actualización de ventas.
- Anulación de ventas.

Este valor también queda almacenado en la auditoría.

---

## Consulta

La auditoría únicamente puede consultarse.

Nunca modificarse.

---

## Endpoints

| Método | Endpoint | Descripción |
|---------|----------|-------------|
| GET | /auditorias | Listar |
| GET | /auditorias/:id | Obtener |

No existe endpoint POST.

No existe endpoint PUT.

No existe endpoint DELETE.

---

## Operaciones auditadas

### Usuarios

- Crear
- Actualizar
- Cambiar estado

---

### Categorías

- Crear
- Actualizar
- Cambiar estado

---

### Productos

- Crear
- Actualizar
- Cambiar estado

---

### Ventas

- Crear
- Actualizar
- Anular

---

# 19. API REST

La API sigue el estilo REST.

Cada recurso posee una ruta independiente.

---

## Autenticación

```
POST /login
```

---

## Usuarios

| Método | Endpoint |
|---------|----------|
| POST | /usuarios |
| GET | /usuarios |
| GET | /usuarios/:id |
| PUT | /usuarios/:id |
| PATCH | /usuarios/:id/estado |

---

## Categorías

| Método | Endpoint |
|---------|----------|
| POST | /categorias |
| GET | /categorias |
| GET | /categorias/:id |
| PUT | /categorias/:id |
| PATCH | /categorias/:id/estado |

---

## Productos

| Método | Endpoint |
|---------|----------|
| POST | /productos |
| GET | /productos |
| GET | /productos/:id |
| PUT | /productos/:id |
| PATCH | /productos/:id/estado |

---

## Ventas

| Método | Endpoint |
|---------|----------|
| POST | /ventas |
| GET | /ventas |
| GET | /ventas/:id |
| PUT | /ventas/:id |
| PATCH | /ventas/:id/anular |

---

## Auditoría

| Método | Endpoint |
|---------|----------|
| GET | /auditorias |
| GET | /auditorias/:id |

---

## Convenciones REST

Las rutas utilizan sustantivos.

Ejemplo

```
/usuarios
```

No

```
/crearUsuario
```

---

Las respuestas HTTP siguen la siguiente convención.

| Código | Descripción |
|---------|-------------|
| 200 | Consulta correcta |
| 201 | Recurso creado |
| 400 | Error de validación |
| 401 | No autenticado |
| 403 | Sin permisos |
| 404 | Recurso no encontrado |
| 409 | Conflicto |
| 500 | Error interno |

---

# 20. Estructura de Carpetas

## Backend

```
backend/
│
├── src/
│   ├── config/
│   ├── constants/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── seeders/
│   ├── services/
│   ├── utils/
│   ├── validators/
│   ├── app.js
│   └── server.js
│
├── .env
├── package.json
└── README.md
```

---

## Frontend

```
frontend/
│
├── src/
│   ├── api/
│   ├── assets/
│   ├── components/
│   ├── hooks/
│   ├── layouts/
│   ├── pages/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
│
├── package.json
└── vite.config.js
```

---

## Organización

Cada módulo mantiene la misma estructura.

Ejemplo

```
controllers/

usuario.controller.js

categoria.controller.js

producto.controller.js

venta.controller.js
```

Lo mismo aplica para:

- Services.
- Routes.
- Validators.

Esto facilita encontrar rápidamente cualquier archivo del proyecto.

---

# 21. Futuras Mejoras

El sistema fue diseñado para crecer sin necesidad de realizar cambios importantes en la arquitectura.

Los siguientes módulos podrán incorporarse en futuras versiones.

---

## Inventario

Actualmente no existe control de existencias.

En una futura versión se podrá implementar un módulo independiente para administrar:

- Stock.
- Entradas.
- Salidas.
- Ajustes.
- Kardex.
- Compras.
- Proveedores.

La estructura actual de Productos y Ventas no necesita modificarse para incorporar este módulo.

---

## Clientes

La primera versión del sistema no administra clientes.

Esto permite simplificar el proceso de venta.

En futuras versiones será posible registrar:

- Nombre.
- Documento.
- Teléfono.
- Dirección.
- Historial de compras.

Las ventas podrán relacionarse con clientes sin afectar el histórico existente.

---

## Métodos de Pago

Actualmente las ventas únicamente registran el total.

Posteriormente podrán añadirse métodos de pago como:

- Efectivo.
- Tarjeta débito.
- Tarjeta crédito.
- Transferencia.
- Nequi.
- Daviplata.
- Pago mixto.

---

## Caja

Podrá implementarse un módulo para administrar:

- Apertura.
- Cierre.
- Cuadre.
- Movimientos.
- Ingresos.
- Egresos.

---

## Reportes

Se podrán generar reportes como:

- Ventas diarias.
- Ventas mensuales.
- Productos más vendidos.
- Categorías más vendidas.
- Usuarios con mayor número de ventas.
- Auditoría por fechas.
- Ventas anuladas.
- Total de ingresos.

---

## Dashboard

Se implementará un panel administrativo con indicadores como:

- Ventas del día.
- Ventas del mes.
- Productos más vendidos.
- Últimas ventas.
- Últimas auditorías.
- Usuarios activos.

---

## Impresión

El sistema podrá generar:

- Facturas.
- Tickets.
- Comprobantes.

Compatible con impresoras térmicas.

---

## Exportación

Se podrán exportar reportes en:

- PDF.
- Excel.

---

## Configuración

Podrá añadirse un módulo para administrar:

- Nombre del negocio.
- Logo.
- Dirección.
- Teléfono.
- Moneda.
- Impuestos.
- Información del ticket.

---

## Multiempresa

La arquitectura permitirá evolucionar hacia un sistema multiempresa.

Cada empresa tendría sus propios:

- Usuarios.
- Productos.
- Categorías.
- Ventas.
- Auditoría.

---

# 22. Decisiones de Arquitectura

Durante el diseño del proyecto se tomaron varias decisiones con el objetivo de construir un sistema mantenible, escalable y sencillo de extender.

---

## MongoDB

Se eligió MongoDB porque el sistema maneja información documental y permite almacenar el detalle histórico de las ventas de forma natural.

---

## Mongoose

Se utiliza Mongoose para:

- Modelos.
- Validaciones.
- Hooks.
- Relaciones.
- Índices.

---

## Arquitectura por capas

La lógica se separa en capas independientes.

```
Routes

↓

Middlewares

↓

Validators

↓

Controllers

↓

Services

↓

Models

↓

MongoDB
```

Cada capa tiene una única responsabilidad.

---

## Controllers ligeros

Los Controllers únicamente reciben la petición HTTP y delegan toda la lógica al Service correspondiente.

Esto facilita las pruebas y el mantenimiento.

---

## Services reutilizables

Toda la lógica del negocio se concentra en los Services.

Esto permite reutilizar funciones sin depender del protocolo HTTP.

---

## Validaciones centralizadas

Las validaciones de entrada se realizan mediante Validators.

Los Services únicamente verifican reglas de negocio.

---

## Auditoría desacoplada

La auditoría se implementó mediante una función reutilizable.

```javascript
registrarAuditoria()
```

Cada módulo únicamente invoca esta función cuando la operación finaliza correctamente.

Esto evita duplicar código.

---

## Histórico de Ventas

Las ventas almacenan una copia completa del producto vendido.

No dependen del documento Producto para consultar el historial.

Esta decisión garantiza la consistencia de los reportes históricos.

---

## Eliminación lógica

Usuarios, Categorías y Productos nunca se eliminan físicamente.

Esto evita referencias rotas y preserva el historial.

---

## Constantes

Los valores utilizados repetidamente se centralizan.

Ejemplo:

```
constants/auditoria.js
```

Esto reduce errores tipográficos y facilita futuros cambios.

---

## Utilidades

Las funciones reutilizables se concentran en la carpeta:

```
utils/
```

Ejemplos:

- normalizarTexto
- buildPagination
- buildPaginationResponse
- ApiError

---

# 23. Estado Actual del Proyecto

Al finalizar esta versión del backend, el sistema cuenta con los siguientes módulos completamente implementados.

| Módulo | Estado |
|---------|:------:|
| Login | ✅ |
| JWT | ✅ |
| Roles | ✅ |
| Usuarios | ✅ |
| Categorías | ✅ |
| Productos | ✅ |
| Ventas | ✅ |
| Auditoría | ✅ |

---

## Características implementadas

- Arquitectura por capas.
- Autenticación JWT.
- Control de roles.
- CRUD de usuarios.
- CRUD de categorías.
- CRUD de productos.
- Registro de ventas.
- Edición limitada de ventas (10 minutos).
- Anulación de ventas.
- Histórico completo de productos vendidos.
- Auditoría automática.
- Paginación.
- Búsquedas.
- Eliminación lógica.
- Validaciones centralizadas.
- Manejo centralizado de errores.
