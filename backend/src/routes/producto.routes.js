import { Router } from "express";

import {
  crearProducto,
  listarProductos,
  obtenerProducto,
  actualizarProducto,
  cambiarEstadoProducto,
} from "../controllers/producto.controller.js";

import validarJWT from "../middlewares/validarJWT.js";
import validarRoles from "../middlewares/validarRoles.js";

import {
  validarCrearProducto,
  validarActualizarProducto,
  validarIdProducto,
  validarListarProductos,
} from "../validators/producto.validator.js";

const router = Router();

router.use(validarJWT);

router.get("/", validarListarProductos, listarProductos);

router.get("/:id", validarIdProducto, obtenerProducto);

router.use(validarRoles("ADMIN"));

router.post("/", validarCrearProducto, crearProducto);

router.put("/:id", validarActualizarProducto, actualizarProducto);

router.patch("/:id/estado", validarIdProducto, cambiarEstadoProducto);

export default router;