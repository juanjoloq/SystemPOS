import { body, param } from "express-validator";
import validarCampos from "../middlewares/validarCampos.js";

export const validarCrearUsuario = [
  body("nombre")
    .trim()
    .notEmpty()
    .withMessage("El nombre es obligatorio"),

  body("usuario")
    .trim()
    .notEmpty()
    .withMessage("El usuario es obligatorio"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener mínimo 6 caracteres"),

  body("rol")
    .isIn(["ADMIN", "EMPLEADO"])
    .withMessage("Rol inválido"),

  validarCampos,
];

export const validarIdUsuario = [
  param("id")
    .isMongoId()
    .withMessage("Id de usuario inválido"),

  validarCampos,
];


export const validarActualizarUsuario = [
  param("id")
    .isMongoId()
    .withMessage("Id de usuario inválido"),

  body("nombre")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El nombre no puede estar vacío"),

  body("usuario")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El usuario no puede estar vacío"),

  body("rol")
    .optional()
    .isIn(["ADMIN", "EMPLEADO"])
    .withMessage("Rol inválido"),

  body("password")
    .not()
    .exists()
    .withMessage("La contraseña debe actualizarse desde un endpoint específico"),

  validarCampos,
];