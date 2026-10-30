import { Router } from "express";

import { login, perfil } from "../controllers/auth.controller.js";

import validarJWT from "../middlewares/validarJWT.js";
import validarRoles from "../middlewares/validarRoles.js";

import { validarLogin } from "../validators/auth.validator.js";

const router = Router();

router.post("/login", validarLogin, login);

router.get("/perfil", validarJWT, perfil);


export default router;