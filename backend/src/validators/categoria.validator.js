import { body, param } from "express-validator";
import validarCampos from "../middlewares/validarCampos.js";

export const validarCrearCategoria = [
  body("nombre")
    .trim()
    .notEmpty()
    .withMessage("El nombre es obligatorio"),

  validarCampos,
];

export const validarActualizarCategoria = [
  param("id")
    .isMongoId()
    .withMessage("Id de categoría inválido"),

  body("nombre")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El nombre es obligatorio"),

  validarCampos,
];

export const validarIdCategoria = [
  param("id")
    .isMongoId()
    .withMessage("Id de categoría inválido"),

  validarCampos,
];