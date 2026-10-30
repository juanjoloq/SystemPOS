import { useEffect, useState } from "react";

import { listarAuditorias } from "../services/auditoriaService";

function useAuditoria() {

    const [auditorias, setAuditorias] = useState([]);

    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 1,
    });

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    useEffect(() => {

        cargarAuditorias();

    }, []);

    const cargarAuditorias = async (page = 1) => {

        try {

            setLoading(true);
            setError(null);

            const respuesta = await listarAuditorias({
                page,
                limit: 10,
            });

            setAuditorias(respuesta.data);

            setPagination(respuesta.pagination);

        } catch (error) {

            setError(error);

        } finally {

            setLoading(false);

        }

    };

    return {
        auditorias,
        pagination,
        loading,
        error,
        recargar: cargarAuditorias,
    };

}

export default useAuditoria;