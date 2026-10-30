import { body, param, query } from "express-validator";
import { isValidObjectId } from "mongoose";

export const validarCrearVenta = [
  body("productos")
    .isArray({ min: 1 })
    .withMessage("Debe enviar al menos un producto."),

  body("productos.*.productoId")
    .notEmpty()
    .withMessage("El producto es obligatorio.")
    .custom((value) => {
      if (!isValidObjectId(value)) {
        throw new Error("El producto no es válido.");
      }
      return true;
    }),

  body("productos.*.cantidad")
    .isInt({ min: 1 })
    .withMessage("La cantidad debe ser mayor a 0."),
];

export const validarActualizarVenta = [
  param("id")
    .custom((value) => {
      if (!isValidObjectId(value)) {
        throw new Error("El id de la venta no es válido.");
      }
      return true;
    }),

  body("productos")
    .isArray({ min: 1 })
    .withMessage("Debe enviar al menos un producto."),

  body("productos.*.productoId")
    .custom((value) => {
      if (!isValidObjectId(value)) {
        throw new Error("El producto no es válido.");
      }
      return true;
    }),

  body("productos.*.cantidad")
    .isInt({ min: 1 })
    .withMessage("La cantidad debe ser mayor a 0."),

  body("motivoModificacion")
    .trim()
    .notEmpty()
    .withMessage("El motivo de modificación es obligatorio."),
];

export const validarAnularVenta = [
  param("id")
    .custom((value) => {
      if (!isValidObjectId(value)) {
        throw new Error("El id de la venta no es válido.");
      }
      return true;
    }),

  body("motivoAnulacion")
    .trim()
    .notEmpty()
    .withMessage("El motivo de anulación es obligatorio."),
];

export const validarIdVenta = [
  param("id").custom((value) => {
    if (!isValidObjectId(value)) {
      throw new Error("El id de la venta no es válido.");
    }

    return true;
  }),
];

export const validarListarVentas = [
  query("page").optional().isInt({ min: 1 }),

  query("limit").optional().isInt({ min: 1 }),

  query("estado")
    .optional()
    .isIn(["ACTIVA", "ANULADA"])
    .withMessage("El estado no es válido."),

  query("fechaInicio")
    .optional()
    .isISO8601()
    .withMessage("La fecha inicial no es válida."),

  query("fechaFin")
    .optional()
    .isISO8601()
    .withMessage("La fecha final no es válida."),

  query("creadoPor")
    .optional()
    .custom((value) => {
      if (!isValidObjectId(value)) {
        throw new Error("El empleado no es válido.");
      }

      return true;
    }),
];