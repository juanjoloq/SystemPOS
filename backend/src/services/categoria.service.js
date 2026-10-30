import Categoria from "../models/Categoria.js";
import ApiError from "../utils/ApiError.js";
import { normalizarTexto } from "../utils/normalizarTexto.js";
import { buildPagination } from "../utils/buildPagination.js";
import { buildPaginationResponse } from "../utils/buildPaginationResponse.js";

import { registrarAuditoria } from "./auditoria.service.js";
import { MODULOS, ACCIONES } from "../constants/auditoria.js";

/*
|--------------------------------------------------------------------------
| Crear categoría
|--------------------------------------------------------------------------
*/

export const crearCategoriaService = async (data, usuario) => {
  const nombre = normalizarTexto(data.nombre);

  const existe = await Categoria.findOne({ nombre });

  if (existe) {
    throw new ApiError(409, "La categoría ya existe.");
  }

  const categoria = await Categoria.create({
    nombre,
  });

  await registrarAuditoria({
    usuario,
    modulo: MODULOS.CATEGORIAS,
    accion: ACCIONES.CREAR,
    descripcion: `Creó la categoría "${categoria.nombre}".`,
  });

  return {
    ok: true,
    message: "Categoría creada correctamente.",
    categoria,
  };
};

/*
|--------------------------------------------------------------------------
| Listar categorías
|--------------------------------------------------------------------------
*/

export const listarCategoriasService = async (query) => {
  const { page, limit, skip } = buildPagination(query);

  const filtro = {
    activo: true,
  };

  if (query.activo !== undefined) {
    filtro.activo = query.activo === "true";
  }

  if (query.search) {
    filtro.nombre = {
      $regex: query.search,
      $options: "i",
    };
  }

  const [categorias, total] = await Promise.all([
    Categoria.find(filtro)
      .sort({ nombre: 1 })
      .skip(skip)
      .limit(limit),

    Categoria.countDocuments(filtro),
  ]);

  return buildPaginationResponse(
    categorias,
    total,
    page,
    limit
  );
};

/*
|--------------------------------------------------------------------------
| Obtener categoría
|--------------------------------------------------------------------------
*/

export const obtenerCategoriaService = async (id) => {
  const categoria = await Categoria.findById(id);

  if (!categoria) {
    throw new ApiError(404, "Categoría no encontrada.");
  }

  return {
    ok: true,
    categoria,
  };
};

/*
|--------------------------------------------------------------------------
| Actualizar categoría
|--------------------------------------------------------------------------
*/

export const actualizarCategoriaService = async (id, data, usuario) => {
  const categoria = await Categoria.findById(id);

  if (!categoria) {
    throw new ApiError(404, "Categoría no encontrada.");
  }

  if (data.nombre) {
    const nombre = normalizarTexto(data.nombre);

    const existe = await Categoria.findOne({
      nombre,
      _id: { $ne: id },
    });

    if (existe) {
      throw new ApiError(409, "La categoría ya existe.");
    }

    categoria.nombre = nombre;
  }

  await categoria.save();

  await registrarAuditoria({
    usuario,
    modulo: MODULOS.CATEGORIAS,
    accion: ACCIONES.ACTUALIZAR,
    descripcion: `Actualizó la categoría "${categoria.nombre}".`,
  });

  return {
    ok: true,
    message: "Categoría actualizada correctamente.",
    categoria,
  };
};

/*
|--------------------------------------------------------------------------
| Activar / Desactivar
|--------------------------------------------------------------------------
*/

export const cambiarEstadoCategoriaService = async (id, usuario) => {
  const categoria = await Categoria.findById(id);

  if (!categoria) {
    throw new ApiError(404, "Categoría no encontrada.");
  }

  categoria.activo = !categoria.activo;

  await categoria.save();

  await registrarAuditoria({
    usuario,
    modulo: MODULOS.CATEGORIAS,
    accion: ACCIONES.CAMBIAR_ESTADO,
    descripcion: `${
      categoria.activo ? "Activó" : "Desactivó"
    } la categoría "${categoria.nombre}".`,
  });

  return {
    ok: true,
    message: `Categoría ${
      categoria.activo ? "activada" : "desactivada"
    } correctamente.`,
    categoria,
  };
};