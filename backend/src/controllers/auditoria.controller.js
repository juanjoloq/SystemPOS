import {
  listarAuditoriasService,
  obtenerAuditoriaService,
} from "../services/auditoria.service.js";

export const listarAuditorias = async (req, res, next) => {
  try {
    const data = await listarAuditoriasService(req.query);

    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const obtenerAuditoria = async (req, res, next) => {
  try {
    const data = await obtenerAuditoriaService(req.params.id);

    res.json(data);
  } catch (error) {
    next(error);
  }
};