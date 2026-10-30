import {
  crearProductoService,
  listarProductosService,
  obtenerProductoService,
  actualizarProductoService,
  cambiarEstadoProductoService,
} from "../services/producto.service.js";

export const crearProducto = async (req, res, next) => {
  try {
    const data = await crearProductoService(req.body, req.usuario);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

export const listarProductos = async (req, res, next) => {
  try {
    const data = await listarProductosService(req.query);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const obtenerProducto = async (req, res, next) => {
  try {
    const data = await obtenerProductoService(req.params.id);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const actualizarProducto = async (req, res, next) => {
  try {
    const data = await actualizarProductoService(
      req.params.id,
      req.body,
      req.usuario
    );

    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const cambiarEstadoProducto = async (req, res, next) => {
  try {
    const data = await cambiarEstadoProductoService(
      req.params.id,
      req.usuario
    );

    res.json(data);
  } catch (error) {
    next(error);
  }
};