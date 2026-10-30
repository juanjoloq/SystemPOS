import { Router } from "express";

import {
  crearVenta,
  listarVentas,
  obtenerVenta,
  actualizarVenta,
  anularVenta,
  obtenerEstadisticasVentas,
} from "../controllers/venta.controller.js";

import validarJWT from "../middlewares/validarJWT.js";
import validarRoles from "../middlewares/validarRoles.js";

import {
  validarCrearVenta,
  validarActualizarVenta,
  validarAnularVenta,
  validarIdVenta,
  validarListarVentas,
} from "../validators/venta.validator.js";

const router = Router();

router.use(validarJWT);

router.post("/", validarRoles("ADMIN", "EMPLEADO"), validarCrearVenta, crearVenta);

router.get("/", validarRoles("ADMIN", "EMPLEADO"), validarListarVentas, listarVentas);

router.get("/estadisticas", validarRoles("ADMIN", "EMPLEADO"), obtenerEstadisticasVentas);

router.get("/:id", validarRoles("ADMIN", "EMPLEADO"), validarIdVenta, obtenerVenta);

router.put("/:id", validarRoles("ADMIN", "EMPLEADO"), validarActualizarVenta, actualizarVenta);

router.patch("/:id/anular", validarRoles("ADMIN"), validarAnularVenta, anularVenta);

export default router;