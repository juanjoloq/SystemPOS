import Venta from "../models/Venta.js";
import Producto from "../models/Producto.js";
import ApiError from "../utils/ApiError.js";
import { buildPagination } from "../utils/buildPagination.js";
import { buildPaginationResponse } from "../utils/buildPaginationResponse.js";

import { registrarAuditoria } from "./auditoria.service.js";
import { MODULOS, ACCIONES } from "../constants/auditoria.js";

const LIMITE_MINUTOS_EDICION = 10;

const construirDetalleVenta = async (productosVenta) => {
  const idsProductos = productosVenta.map((item) =>
    item.productoId.toString()
  );

  // Validar productos duplicados en la misma venta
  const idsUnicos = new Set(idsProductos);

  if (idsUnicos.size !== idsProductos.length) {
    throw new ApiError(
      400,
      "No se permite registrar el mismo producto más de una vez en la venta."
    );
  }

  const productosDB = await Producto.find({
    _id: { $in: idsProductos },
  }).populate("categoria");

  const productosMap = new Map(
    productosDB.map((producto) => [
      producto._id.toString(),
      producto,
    ])
  );

  const detalle = [];
  let total = 0;

  for (const item of productosVenta) {
    const producto = productosMap.get(
      item.productoId.toString()
    );

    if (!producto) {
      throw new ApiError(
        404,
        "Uno de los productos no existe."
      );
    }

    if (!producto.activo) {
      throw new ApiError(
        400,
        `El producto "${producto.nombre}" está inactivo.`
      );
    }

    if (!producto.categoria.activo) {
      throw new ApiError(
        400,
        `La categoría "${producto.categoria.nombre}" está inactiva.`
      );
    }

    const subtotal =
      producto.precio * item.cantidad;

    total += subtotal;

    detalle.push({
      productoId: producto._id,
      nombre: producto.nombre,

      categoria: {
        id: producto.categoria._id,
        nombre: producto.categoria.nombre,
      },

      precioUnitario: producto.precio,
      cantidad: item.cantidad,
      subtotal,
    });
  }

  return {
    productos: detalle,
    total,
  };
};

/*
|--------------------------------------------------------------------------
| Crear venta
|--------------------------------------------------------------------------
*/

export const crearVentaService = async (
  body,
  usuario
) => {
  const detalle = await construirDetalleVenta(
    body.productos
  );

  const venta = await Venta.create({
    productos: detalle.productos,
    total: detalle.total,
    creadoPor: usuario._id,
  });

  await registrarAuditoria({
    usuario,
    modulo: MODULOS.VENTAS,
    accion: ACCIONES.CREAR,
    descripcion: `Registró la venta "${venta._id}".`,
  });

  return {
    ok: true,
    message: "Venta registrada correctamente.",
    venta,
  };
};

/*
|--------------------------------------------------------------------------
| Listar ventas
|--------------------------------------------------------------------------
*/

export const listarVentasService = async (query) => {
  const { page, limit, skip } = buildPagination(query);

  const filtros = {};

  if (query.id) {
    filtros._id = query.id;
  }

  // Estado
  if (query.estado) {
    filtros.estado = query.estado;
  }

  // Empleado
  if (query.creadoPor) {
    filtros.creadoPor = query.creadoPor;
  }

  // Rango de fechas
  if (query.fechaInicio || query.fechaFin) {
    filtros.createdAt = {};

    if (query.fechaInicio) {
      filtros.createdAt.$gte = new Date(
        `${query.fechaInicio}T00:00:00.000Z`
      );
    }

    if (query.fechaFin) {
      filtros.createdAt.$lte = new Date(
        `${query.fechaFin}T23:59:59.999Z`
      );
    }
  }

  const [ventas, total] = await Promise.all([
    Venta.find(filtros)
      .select("total estado createdAt creadoPor")
      .populate("creadoPor", "nombre")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),

    Venta.countDocuments(filtros),
  ]);

  return buildPaginationResponse(
    ventas,
    total,
    page,
    limit
  );
};

/*
|--------------------------------------------------------------------------
| Obtener venta
|--------------------------------------------------------------------------
*/

export const obtenerVentaService = async (id) => {
  const venta = await Venta.findById(id)
    .populate("creadoPor", "nombre")
    .populate("actualizadoPor", "nombre")
    .populate("anuladoPor", "nombre");

  if (!venta) {
    throw new ApiError(
      404,
      "Venta no encontrada."
    );
  }

  return {
    ok: true,
    venta: {
      id: venta.id,

      productos: venta.productos,

      total: venta.total,

      estado: venta.estado,

      creadoPor: venta.creadoPor,

      actualizadoPor: venta.actualizadoPor,

      anuladoPor: venta.anuladoPor,

      motivoModificacion: venta.motivoModificacion,

      motivoAnulacion: venta.motivoAnulacion,

      createdAt: venta.createdAt,

      updatedAt: venta.updatedAt,

      fechaAnulacion: venta.fechaAnulacion,
    },
  };
};

/*
|--------------------------------------------------------------------------
| Actualizar venta
|--------------------------------------------------------------------------
*/

export const actualizarVentaService = async (
  id,
  body,
  usuario
) => {
  const venta = await Venta.findById(id);

  if (!venta) {
    throw new ApiError(
      404,
      "Venta no encontrada."
    );
  }

  if (venta.estado === "ANULADA") {
    throw new ApiError(
      400,
      "No se puede modificar una venta anulada."
    );
  }

  const minutos =
    (Date.now() - venta.createdAt.getTime()) /
    (1000 * 60);

  if (minutos > LIMITE_MINUTOS_EDICION) {
    throw new ApiError(
      400,
      "La venta solo puede modificarse durante los primeros 10 minutos."
    );
  }

  const detalle = await construirDetalleVenta(
    body.productos
  );

  venta.productos = detalle.productos;
  venta.total = detalle.total;
  venta.motivoModificacion =
    body.motivoModificacion;
  venta.actualizadoPor = usuario._id;

  await venta.save();

  await registrarAuditoria({
    usuario,
    modulo: MODULOS.VENTAS,
    accion: ACCIONES.ACTUALIZAR,
    descripcion: `Actualizó la venta "${venta._id}".`,
    motivo: body.motivoModificacion,
  });

  return {
    ok: true,
    message: "Venta actualizada correctamente.",
    venta,
  };
};

/*
|--------------------------------------------------------------------------
| Anular venta
|--------------------------------------------------------------------------
*/

export const anularVentaService = async (
  id,
  body,
  usuario
) => {
  const venta = await Venta.findById(id);

  if (!venta) {
    throw new ApiError(
      404,
      "Venta no encontrada."
    );
  }

  if (venta.estado === "ANULADA") {
    throw new ApiError(
      400,
      "La venta ya fue anulada."
    );
  }

  venta.estado = "ANULADA";
  venta.motivoAnulacion =
    body.motivoAnulacion;
  venta.fechaAnulacion = new Date();
  venta.anuladoPor = usuario._id;

  await venta.save();

  await registrarAuditoria({
    usuario,
    modulo: MODULOS.VENTAS,
    accion: ACCIONES.ANULAR,
    descripcion: `Anuló la venta "${venta._id}".`,
    motivo: body.motivoAnulacion,
  });

  return {
    ok: true,
    message: "Venta anulada correctamente.",
    venta,
  };
};

/*
|--------------------------------------------------------------------------
| Obtener estadísticas de ventas
|--------------------------------------------------------------------------
*/

export const obtenerEstadisticasVentasService = async () => {
    const inicio = new Date();
    inicio.setHours(0, 0, 0, 0);

    const fin = new Date();
    fin.setHours(23, 59, 59, 999);

    const ventas = await Venta.find({
        createdAt: {
            $gte: inicio,
            $lte: fin,
        },
    });

    const ventasHoy = ventas.length;

    const totalVendido = ventas
        .filter((venta) => venta.estado === "ACTIVA")
        .reduce(
            (total, venta) => total + venta.total,
            0
        );

    return {
        ok: true,
        stats: {
            ventasHoy,
            totalVendido,
        },
    };
};