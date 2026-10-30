import api from "../api/axiosClient";

export const obtenerProductos = async (params = {}) => {

    const { data } = await api.get("/productos", {
        params,
    });

    return data.data;
};

/*
|--------------------------------------------------------------------------
| CRUD Productos
|--------------------------------------------------------------------------
*/

export const listarProductos = async (params = {}) => {

    const { data } = await api.get("/productos", {
        params,
    });

    return data;

};

export const obtenerProducto = async (id) => {

    const { data } = await api.get(`/productos/${id}`);

    return data.producto;

};

export const crearProducto = async (producto) => {

    const { data } = await api.post(
        "/productos",
        producto
    );

    return data;

};

export const actualizarProducto = async (
    id,
    producto
) => {

    const { data } = await api.put(
        `/productos/${id}`,
        producto
    );

    return data;

};

export const cambiarEstadoProducto = async (id) => {

    const { data } = await api.patch(
        `/productos/${id}/estado`
    );

    return data;

};