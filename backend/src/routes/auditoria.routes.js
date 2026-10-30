import { Router } from "express";

import {
  listarAuditorias,
  obtenerAuditoria,
} from "../controllers/auditoria.controller.js";

import validarJWT from "../middlewares/validarJWT.js";
import validarRoles from "../middlewares/validarRoles.js";
import validarCampos from "../middlewares/validarCampos.js";

import {
  validarListarAuditorias,
  validarIdAuditoria,
} from "../validators/auditoria.validator.js";

const router = Router();

router.use(validarJWT);

router.use(validarRoles("ADMIN"));

router.get(
  "/",
  validarListarAuditorias,
  validarCampos,
  listarAuditorias
);

router.get(
  "/:id",
  validarIdAuditoria,
  validarCampos,
  obtenerAuditoria
);

export default router;