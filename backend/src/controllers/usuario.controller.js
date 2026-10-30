import {
  crearUsuarioService,
  listarUsuariosService,
  obtenerUsuarioService,
  actualizarUsuarioService,
  cambiarEstadoUsuarioService,
} from "../services/usuario.service.js";

export const crearUsuario = async (req, res, next) => {
  try {
    const data = await crearUsuarioService(req.body, req.usuario);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

export const listarUsuarios = async (req, res, next) => {
  try {
    const data = await listarUsuariosService(req.query);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const obtenerUsuario = async (req, res, next) => {
  try {
    const data = await obtenerUsuarioService(req.params.id);
    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const actualizarUsuario = async (req, res, next) => {
  try {
    const data = await actualizarUsuarioService(
      req.params.id,
      req.body,
      req.usuario
    );

    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const cambiarEstadoUsuario = async (req, res, next) => {
  try {
    const data = await cambiarEstadoUsuarioService(
      req.params.id,
      req.usuario
    );

    res.json(data);
  } catch (error) {
    next(error);
  }
};