import { useEffect, useState } from "react";

import { listarProductos } from "../services/productoService";

function useProductosCrud() {

    const [productos, setProductos] = useState([]);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 1,
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        cargarProductos(1);

    }, []);

    const cargarProductos = async (page = 1) => {

        try {

            setLoading(true);
            setError(null);

            const respuesta = await listarProductos({
                page,
                limit: 10,
            });

            setProductos(respuesta.data);
            setPagination(respuesta.pagination);

        } catch (error) {

            setError(error);

        } finally {

            setLoading(false);

        }

    };

    return {
        productos,
        pagination,
        loading,
        error,
        recargar: cargarProductos,
    };

}

export default useProductosCrud;