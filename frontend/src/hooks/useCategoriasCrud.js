import { useEffect, useState } from "react";

import { listarCategorias } from "../services/categoriaService";

function useCategoriasCrud() {

    const [categorias, setCategorias] = useState([]);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 1,
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        cargarCategorias(1);

    }, []);

    const cargarCategorias = async (page = 1) => {

        try {

            setLoading(true);
            setError(null);

            const respuesta = await listarCategorias({
                page,
                limit: 10,
            });

            setCategorias(respuesta.data);
            setPagination(respuesta.pagination);

        } catch (error) {

            setError(error);

        } finally {

            setLoading(false);

        }

    };

    return {
        categorias,
        pagination,
        loading,
        error,
        recargar: cargarCategorias,
    };

}

export default useCategoriasCrud;