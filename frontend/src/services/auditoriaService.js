import api from "../api/axiosClient";

export const listarAuditorias = async (params = {}) => {

    const { data } = await api.get("/auditoria", {
        params,
    });

    return data;

};