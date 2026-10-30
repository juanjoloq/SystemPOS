import {
  crearCategoriaService,
  listarCategoriasService,
  obtenerCategoriaService,
  actualizarCategoriaService,
  cambiarEstadoCategoriaService,
} from "../services/categoria.service.js";

export const crearCategoria = async (req, res, next) => {
  try {
    const data = await crearCategoriaService(req.body, req.usuario);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

export const listarCategorias = async (req, res, next) => {
  try {
    const data = await listarCategoriasService(req.query);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const obtenerCategoria = async (req, res, next) => {
  try {
    const data = await obtenerCategoriaService(req.params.id);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const actualizarCategoria = async (req, res, next) => {
  try {
    const data = await actualizarCategoriaService(
      req.params.id,
      req.body,
      req.usuario
    );

    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const cambiarEstadoCategoria = async (req, res, next) => {
  try {
    const data = await cambiarEstadoCategoriaService(
      req.params.id,
      req.usuario
    );

    res.json(data);
  } catch (error) {
    next(error);
  }
};