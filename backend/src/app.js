import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes.js";
import usuarioRoutes from "./routes/usuario.routes.js";
import categoriaRoutes from "./routes/categoria.routes.js";
import productoRoutes from "./routes/producto.routes.js";
import ventaRoutes from "./routes/venta.routes.js";
import auditoriaRoutes from "./routes/auditoria.routes.js";

const app = express();

/*
|--------------------------------------------------------------------------
| Middlewares Globales
|--------------------------------------------------------------------------
*/

app.use(cors());

app.use(helmet());

app.use(express.json());

app.use(morgan("dev"));

/*
|--------------------------------------------------------------------------
| Rutas
|--------------------------------------------------------------------------
*/
app.use("/api/auth", authRoutes);
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/categorias", categoriaRoutes);
app.use("/api/productos", productoRoutes);
app.use("/api/ventas", ventaRoutes);
app.use("/api/auditoria", auditoriaRoutes)
/*
|--------------------------------------------------------------------------
| Ruta no encontrada (404)
|--------------------------------------------------------------------------
*/

app.use((req, res) => {
  res.status(404).json({
    ok: false,
    msg: "Ruta no encontrada",
  });
});

/*
|--------------------------------------------------------------------------
| Middleware Global de Errores
|--------------------------------------------------------------------------
*/

app.use((err, req, res, next) => {
  console.error(err);

  return res.status(err.statusCode || 500).json({
    ok: false,
    message: err.message || "Error interno del servidor.",
  });
});

export default app;