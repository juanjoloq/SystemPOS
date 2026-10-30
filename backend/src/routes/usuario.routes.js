import { Router } from "express";

import {
  crearUsuario,
  listarUsuarios,
  obtenerUsuario,
  actualizarUsuario,
  cambiarEstadoUsuario,
} from "../controllers/usuario.controller.js";

import validarJWT from "../middlewares/validarJWT.js";
import validarRoles from "../middlewares/validarRoles.js";

import {
  validarCrearUsuario,
  validarIdUsuario,
  validarActualizarUsuario,
} from "../validators/usuario.validator.js";

const router = Router();

router.use(validarJWT);
router.use(validarRoles("ADMIN"));

router.post("/", validarCrearUsuario, crearUsuario);

router.get("/", listarUsuarios);

router.get("/:id", validarIdUsuario, obtenerUsuario);

router.put("/:id", validarActualizarUsuario, actualizarUsuario);

router.patch("/:id/estado", validarIdUsuario, cambiarEstadoUsuario);

export default router;