import bcrypt from "bcrypt";
import mongoose from "mongoose";
import Usuario from "../models/Usuario.js";
import { buildPagination } from "../utils/buildPagination.js";
import { buildPaginationResponse } from "../utils/buildPaginationResponse.js";
import { normalizarTexto } from "../utils/normalizarTexto.js";
import ApiError from "../utils/ApiError.js";

import { registrarAuditoria } from "./auditoria.service.js";
import { MODULOS, ACCIONES } from "../constants/auditoria.js";

export const crearUsuarioService = async (data, usuarioLogueado) => {
  const nombre = data.nombre.trim();
  const usuarioNormalizado = normalizarTexto(data.usuario);

  const existeUsuario = await Usuario.findOne({
    usuario: usuarioNormalizado,
  });

  if (existeUsuario) {
    throw new ApiError(409, "El usuario ya existe.");
  }

  const passwordHash = await bcrypt.hash(data.password, 10);

  const nuevoUsuario = await Usuario.create({
    nombre,
    usuario: usuarioNormalizado,
    password: passwordHash,
    rol: data.rol,
  });

  await registrarAuditoria({
    usuario: usuarioLogueado,
    modulo: MODULOS.USUARIOS,
    accion: ACCIONES.CREAR,
    descripcion: `Creó el usuario "${nuevoUsuario.usuario}".`,
  });

  return {
    ok: true,
    message: "Usuario creado correctamente.",
    usuario: {
      id: nuevoUsuario._id,
      nombre: nuevoUsuario.nombre,
      usuario: nuevoUsuario.usuario,
      rol: nuevoUsuario.rol,
      activo: nuevoUsuario.activo,
    },
  };
};

export const listarUsuariosService = async (query) => {
  const { page, limit, skip } = buildPagination(query);

  const search = query.search?.trim() || "";

  const filtro = {};

  if (query.activo !== undefined) {
    filtro.activo = query.activo === "true";
  }

  if (search) {
    filtro.$or = [
      { nombre: { $regex: search, $options: "i" } },
      { usuario: { $regex: search, $options: "i" } },
    ];
  }

  const [usuarios, total] = await Promise.all([
    Usuario.find(filtro)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),

    Usuario.countDocuments(filtro),
  ]);

  return buildPaginationResponse(
    usuarios,
    total,
    page,
    limit
  );
};

export const obtenerUsuarioService = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Id de usuario inválido.");
  }

  const usuario = await Usuario.findById(id);

  if (!usuario) {
    throw new ApiError(404, "Usuario no encontrado.");
  }

  return {
    ok: true,
    usuario,
  };
};

export const actualizarUsuarioService = async (
  id,
  data,
  usuarioLogueado
) => {
  const usuario = await Usuario.findById(id);

  if (!usuario) {
    throw new ApiError(404, "Usuario no encontrado.");
  }

  const { nombre, usuario: nuevoUsuario, rol } = data;

  if (nuevoUsuario) {
    const usuarioNormalizado = normalizarTexto(nuevoUsuario);

    if (usuarioNormalizado !== usuario.usuario) {
      const existe = await Usuario.findOne({
        usuario: usuarioNormalizado,
      });

      if (existe) {
        throw new ApiError(
          409,
          "El nombre de usuario ya existe."
        );
      }

      usuario.usuario = usuarioNormalizado;
    }
  }

  if (nombre !== undefined) {
    usuario.nombre = nombre;
  }

  if (rol !== undefined) {
    usuario.rol = rol;
  }

  await usuario.save();

  await registrarAuditoria({
    usuario: usuarioLogueado,
    modulo: MODULOS.USUARIOS,
    accion: ACCIONES.ACTUALIZAR,
    descripcion: `Actualizó el usuario "${usuario.usuario}".`,
  });

  return {
    ok: true,
    message: "Usuario actualizado correctamente.",
    usuario,
  };
};

export const cambiarEstadoUsuarioService = async (
  id,
  usuarioLogueado
) => {
  const usuario = await Usuario.findById(id);

  if (!usuario) {
    throw new ApiError(404, "Usuario no encontrado.");
  }

  usuario.activo = !usuario.activo;

  await usuario.save();

  await registrarAuditoria({
    usuario: usuarioLogueado,
    modulo: MODULOS.USUARIOS,
    accion: ACCIONES.CAMBIAR_ESTADO,
    descripcion: `${
      usuario.activo ? "Activó" : "Desactivó"
    } el usuario "${usuario.usuario}".`,
  });

  return {
    ok: true,
    message: `Usuario ${
      usuario.activo ? "activado" : "desactivado"
    } correctamente.`,
    usuario,
  };
};