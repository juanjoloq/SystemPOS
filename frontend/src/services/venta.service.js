import api from "../api/axiosClient";

/*
|--------------------------------------------------------------------------
| Registrar venta
|--------------------------------------------------------------------------
*/

export const registrarVentaService = async (productos) => {
  const { data } = await api.post("/ventas", {
    productos,
  });

  return data;
};

/*
|--------------------------------------------------------------------------
| Listar ventas
|--------------------------------------------------------------------------
*/

export const listarVentasService = async (params = {}) => {
  const { data } = await api.get("/ventas", {
    params,
  });

  return data;
};

/*
|--------------------------------------------------------------------------
| Estadísticas de ventas
|--------------------------------------------------------------------------
*/

export const obtenerEstadisticasVentasService = async () => {
    const { data } = await api.get("/ventas/estadisticas");

    return data;
};



/*
|--------------------------------------------------------------------------
| Obtener detalle de una venta
|--------------------------------------------------------------------------
*/

export const obtenerVentaService = async (id) => {
  const { data } = await api.get(`/ventas/${id}`);

  return data;
};

/*
|--------------------------------------------------------------------------
| Actualizar venta
|--------------------------------------------------------------------------
*/

export const actualizarVentaService = async (id, body) => {
  const { data } = await api.put(`/ventas/${id}`, body);

  return data;
};

/*
|--------------------------------------------------------------------------
| Anular venta
|--------------------------------------------------------------------------
*/

export const anularVentaService = async (
  id,
  motivoAnulacion
) => {
  const { data } = await api.patch(
    `/ventas/${id}/anular`,
    {
      motivoAnulacion,
    }
  );

  return data;
};

