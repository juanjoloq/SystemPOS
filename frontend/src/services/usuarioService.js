import api from "../api/axiosClient";

/*
|--------------------------------------------------------------------------
| CRUD Usuarios
|--------------------------------------------------------------------------
*/

export const listarUsuarios = async (params = {}) => {

    const { data } = await api.get("/usuarios", {
        params,
    });

    return data;

};

export const obtenerUsuario = async (id) => {

    const { data } = await api.get(`/usuarios/${id}`);

    return data.usuario;

};

export const crearUsuario = async (usuario) => {

    const { data } = await api.post(
        "/usuarios",
        usuario
    );

    return data;

};

export const actualizarUsuario = async (
    id,
    usuario
) => {

    const { data } = await api.put(
        `/usuarios/${id}`,
        usuario
    );

    return data;

};

export const cambiarEstadoUsuario = async (id) => {

    const { data } = await api.patch(
        `/usuarios/${id}/estado`
    );

    return data;

};