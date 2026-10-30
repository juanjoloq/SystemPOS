import { useEffect, useState } from "react";

import { listarUsuarios } from "../services/usuarioService";

function useUsuarios() {

    const [usuarios, setUsuarios] = useState([]);

    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 1,
    });

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    useEffect(() => {

        cargarUsuarios(1);

    }, []);

    const cargarUsuarios = async (page = 1) => {

        try {

            setLoading(true);
            setError(null);

            const respuesta = await listarUsuarios({
                page,
                limit: 10,
            });

            setUsuarios(respuesta.data);

            setPagination(respuesta.pagination);

        } catch (error) {

            setError(error);

        } finally {

            setLoading(false);

        }

    };

    return {
        usuarios,
        pagination,
        loading,
        error,
        recargar: cargarUsuarios,
    };

}

export default useUsuarios;