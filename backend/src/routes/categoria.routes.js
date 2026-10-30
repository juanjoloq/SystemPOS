import { Router } from "express";

import {
  crearCategoria,
  listarCategorias,
  obtenerCategoria,
  actualizarCategoria,
  cambiarEstadoCategoria,
} from "../controllers/categoria.controller.js";

import validarJWT from "../middlewares/validarJWT.js";
import validarRoles from "../middlewares/validarRoles.js";

import {
  validarCrearCategoria,
  validarActualizarCategoria,
  validarIdCategoria,
} from "../validators/categoria.validator.js";

const router = Router();

router.use(validarJWT);

router.get("/", listarCategorias);

router.get("/:id", validarIdCategoria, obtenerCategoria);

router.use(validarRoles("ADMIN"));

router.post("/", validarCrearCategoria, crearCategoria);

router.put("/:id", validarActualizarCategoria, actualizarCategoria);

router.patch("/:id/estado", validarIdCategoria, cambiarEstadoCategoria);

export default router;