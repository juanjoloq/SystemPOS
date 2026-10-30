import {
  crearVentaService,
  listarVentasService,
  obtenerVentaService,
  actualizarVentaService,
  anularVentaService,
  obtenerEstadisticasVentasService,
} from "../services/venta.service.js";

export const crearVenta = async (req, res, next) => {
  try {
    const data = await crearVentaService(req.body, req.usuario);

    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
};

export const listarVentas = async (req, res, next) => {
  try {
    const data = await listarVentasService(req.query);

    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const obtenerVenta = async (req, res, next) => {
  try {
    const data = await obtenerVentaService(req.params.id);

    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const actualizarVenta = async (req, res, next) => {
  try {
    const data = await actualizarVentaService(
      req.params.id,
      req.body,
      req.usuario
    );

    res.json(data);
  } catch (error) {
    next(error);
  }
};

export const anularVenta = async (req, res, next) => {
  try {
    const data = await anularVentaService(
      req.params.id,
      req.body,
      req.usuario
    );

    res.json(data);
  } catch (error) {
    next(error);
  }
};



export const obtenerEstadisticasVentas = async (req, res, next) => {

    try {

        const data =
            await obtenerEstadisticasVentasService();

        res.json(data);

    } catch (error) {

        next(error);

    }

};