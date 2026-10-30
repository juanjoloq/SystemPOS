import { query, param } from "express-validator";
import mongoose from "mongoose";

import { MODULOS, ACCIONES } from "../constants/auditoria.js";

export const validarListarAuditorias = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("La página debe ser un número mayor a 0."),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("El límite debe estar entre 1 y 100."),

  query("modulo")
    .optional()
    .isIn(Object.values(MODULOS))
    .withMessage("El módulo es inválido."),

  query("accion")
    .optional()
    .isIn(Object.values(ACCIONES))
    .withMessage("La acción es inválida."),

  query("usuarioId")
    .optional()
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("El usuario es inválido."),

  query("fechaInicio")
    .optional()
    .isISO8601()
    .withMessage("La fecha de inicio es inválida."),

  query("fechaFin")
    .optional()
    .isISO8601()
    .withMessage("La fecha de fin es inválida.")
    .custom((fechaFin, { req }) => {
      const { fechaInicio } = req.query;

      if (fechaInicio && new Date(fechaFin) < new Date(fechaInicio)) {
        throw new Error(
          "La fecha final debe ser mayor o igual a la fecha inicial."
        );
      }

      return true;
    }),
];

export const validarIdAuditoria = [
  param("id")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("El id de la auditoría es inválido."),
];