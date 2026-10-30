import { body, param, query } from "express-validator";
import { isValidObjectId } from "mongoose";

export const validarCrearProducto = [
  body("nombre")
    .trim()
    .notEmpty()
    .withMessage("El nombre es obligatorio."),

  body("categoria")
    .notEmpty()
    .withMessage("La categoría es obligatoria.")
    .custom((value) => {
      if (!isValidObjectId(value)) {
        throw new Error("La categoría no es válida.");
      }
      return true;
    }),

  body("precio")
    .notEmpty()
    .withMessage("El precio es obligatorio.")
    .isFloat({ gt: 0 })
    .withMessage("El precio debe ser mayor a 0."),
];

export const validarActualizarProducto = [
  param("id")
    .custom((value) => {
      if (!isValidObjectId(value)) {
        throw new Error("El id del producto no es válido.");
      }
      return true;
    }),

  body("nombre")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El nombre no puede estar vacío."),

  body("categoria")
    .optional()
    .custom((value) => {
      if (!isValidObjectId(value)) {
        throw new Error("La categoría no es válida.");
      }
      return true;
    }),

  body("precio")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("El precio debe ser mayor a 0."),
];

export const validarIdProducto = [
  param("id").custom((value) => {
    if (!isValidObjectId(value)) {
      throw new Error("El id del producto no es válido.");
    }
    return true;
  }),
];

export const validarListarProductos = [
  query("page").optional().isInt({ min: 1 }),

  query("limit").optional().isInt({ min: 1 }),

  query("activo").optional().isBoolean(),

  query("categoria")
    .optional()
    .custom((value) => {
      if (!isValidObjectId(value)) {
        throw new Error("La categoría no es válida.");
      }
      return true;
    }),
];