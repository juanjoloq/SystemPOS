import api from "../api/axiosClient";

/*
|--------------------------------------------------------------------------
| Registrar venta
|--------------------------------------------------------------------------
*/

export const obtenerCategorias = async () => {

    const { data } = await api.get("/categorias");

    return data.data;

};

/*
|--------------------------------------------------------------------------
| CRUD Categorías
|--------------------------------------------------------------------------
*/

export const listarCategorias = async (params = {}) => {

    const { data } = await api.get("/categorias", {
        params,
    });

    return data;

};

export const obtenerCategoria = async (id) => {

    const { data } = await api.get(`/categorias/${id}`);

    return data.categoria;

};

export const crearCategoria = async (categoria) => {

    const { data } = await api.post("/categorias", categoria);

    return data;

};

export const actualizarCategoria = async (id, categoria) => {

    const { data } = await api.put(
        `/categorias/${id}`,
        categoria
    );

    return data;

};

export const cambiarEstadoCategoria = async (id) => {

    const { data } = await api.patch(
        `/categorias/${id}/estado`
    );

    return data;

};