import Auditoria from "../models/Auditoria.js";
import ApiError from "../utils/ApiError.js";
import { buildPagination } from "../utils/buildPagination.js";
import { buildPaginationResponse } from "../utils/buildPaginationResponse.js";

export const registrarAuditoria = async ({
  usuario,
  modulo,
  accion,
  descripcion,
  motivo = null,
}) => {
  await Auditoria.create({
    usuario: {
      id: usuario._id,
      nombre: usuario.nombre,
    },

    modulo,
    accion,
    descripcion,
    motivo,
  });
};

export const listarAuditoriasService = async (query) => {
  const { page, limit, skip } = buildPagination(query);

  const filtros = {};

  if (query.modulo) {
    filtros.modulo = query.modulo;
  }

  if (query.accion) {
    filtros.accion = query.accion;
  }

  if (query.usuarioId) {
    filtros["usuario.id"] = query.usuarioId;
  }

  if (query.fechaInicio || query.fechaFin) {
    filtros.createdAt = {};

    if (query.fechaInicio) {
      filtros.createdAt.$gte = new Date(query.fechaInicio);
    }

    if (query.fechaFin) {
      filtros.createdAt.$lte = new Date(query.fechaFin);
    }
  }

  const [auditorias, total] = await Promise.all([
    Auditoria.find(filtros)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),

    Auditoria.countDocuments(filtros),
  ]);

  return buildPaginationResponse(auditorias, total, page, limit);
};

export const obtenerAuditoriaService = async (id) => {
  const auditoria = await Auditoria.findById(id);

  if (!auditoria) {
    throw new ApiError(404, "Registro de auditoría no encontrado.");
  }

  return {
    ok: true,
    auditoria,
  };
};