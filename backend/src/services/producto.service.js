import Categoria from "../models/Categoria.js";
import Producto from "../models/Producto.js";
import ApiError from "../utils/ApiError.js";
import { buildPagination } from "../utils/buildPagination.js";
import { buildPaginationResponse } from "../utils/buildPaginationResponse.js";
import { normalizarTexto } from "../utils/normalizarTexto.js";

import { registrarAuditoria } from "./auditoria.service.js";
import { MODULOS, ACCIONES } from "../constants/auditoria.js";

export const crearProductoService = async (body, usuario) => {
  const nombre = normalizarTexto(body.nombre);

  const categoria = await Categoria.findById(body.categoria);

  if (!categoria) {
    throw new ApiError(404, "La categoría no existe.");
  }

  if (!categoria.activo) {
    throw new ApiError(400, "La categoría está inactiva.");
  }

  const existe = await Producto.findOne({
    nombre,
    categoria: body.categoria,
  });

  if (existe) {
    throw new ApiError(
      409,
      "Ya existe un producto con ese nombre en la categoría."
    );
  }

  const producto = await Producto.create({
    ...body,
    nombre,
  });

  await producto.populate("categoria");

  await registrarAuditoria({
    usuario,
    modulo: MODULOS.PRODUCTOS,
    accion: ACCIONES.CREAR,
    descripcion: `Creó el producto "${producto.nombre}".`,
  });

  return {
    ok: true,
    message: "Producto creado correctamente.",
    producto,
  };
};

export const listarProductosService = async (query) => {
  const { page, limit, skip } = buildPagination(query);

  const filtros = {};
 
  if (query.search) {
    filtros.nombre = {
      $regex: normalizarTexto(query.search),
      $options: "i",
    };
  }

  if (query.activo !== undefined) {
    filtros.activo = query.activo === "true";
  }

  if (query.categoria) {
    filtros.categoria = query.categoria;
  }

  const [productos, total] = await Promise.all([
    Producto.find(filtros)
      .populate("categoria")
      .sort({ nombre: 1 })
      .skip(skip)
      .limit(limit),

    Producto.countDocuments(filtros),
  ]);

  return buildPaginationResponse(
    productos,
    total,
    page,
    limit
  );
};

export const obtenerProductoService = async (id) => {
  const producto = await Producto.findById(id).populate("categoria");

  if (!producto) {
    throw new ApiError(404, "Producto no encontrado.");
  }

  return {
    ok: true,
    producto,
  };
};

export const actualizarProductoService = async (id, body, usuario) => {
  const producto = await Producto.findById(id);

  if (!producto) {
    throw new ApiError(404, "Producto no encontrado.");
  }

  if (body.categoria) {
    const categoria = await Categoria.findById(body.categoria);

    if (!categoria) {
      throw new ApiError(404, "La categoría no existe.");
    }

    if (!categoria.activo) {
      throw new ApiError(400, "La categoría está inactiva.");
    }
  }

  if (body.nombre) {
    body.nombre = normalizarTexto(body.nombre);
  }

  const nombre = body.nombre ?? producto.nombre;
  const categoria = body.categoria ?? producto.categoria;

  const existe = await Producto.findOne({
    _id: { $ne: id },
    nombre,
    categoria,
  });

  if (existe) {
    throw new ApiError(
      409,
      "Ya existe un producto con ese nombre en la categoría."
    );
  }

  Object.assign(producto, body);

  await producto.save();

  await producto.populate("categoria");

  await registrarAuditoria({
    usuario,
    modulo: MODULOS.PRODUCTOS,
    accion: ACCIONES.ACTUALIZAR,
    descripcion: `Actualizó el producto "${producto.nombre}".`,
  });

  return {
    ok: true,
    message: "Producto actualizado correctamente.",
    producto,
  };
};

export const cambiarEstadoProductoService = async (id, usuario) => {
  const producto = await Producto.findById(id);

  if (!producto) {
    throw new ApiError(404, "Producto no encontrado.");
  }

  producto.activo = !producto.activo;

  await producto.save();

  await registrarAuditoria({
    usuario,
    modulo: MODULOS.PRODUCTOS,
    accion: ACCIONES.CAMBIAR_ESTADO,
    descripcion: `${
      producto.activo ? "Activó" : "Desactivó"
    } el producto "${producto.nombre}".`,
  });

  return {
    ok: true,
    message: `Producto ${
      producto.activo ? "activado" : "desactivado"
    } correctamente.`,
    producto,
  };
};