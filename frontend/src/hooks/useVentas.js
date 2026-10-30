import { useCallback, useEffect, useState } from "react";

import { listarVentasService } from "../services/venta.service";

function useVentas() {
    const [ventas, setVentas] = useState([]);

    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0,
    });

    const [filters, setFilters] = useState({
        page: 1,
        limit: 10,
        id: "",
        estado: "",
        fechaInicio: "",
        fechaFin: "",
    });

    const [loading, setLoading] = useState(true);

    const obtenerVentas = useCallback(async () => {
        setLoading(true);

        try {
            const data = await listarVentasService(filters);

            setVentas(data.data);

            setPagination(data.pagination);
            
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [filters]);

    useEffect(() => {
        obtenerVentas();
    }, [obtenerVentas]);

    const actualizarFiltros = (values) => {
        setFilters((prev) => ({
            ...prev,
            ...values,
            page: 1,
        }));
    };

    const cambiarPagina = (page) => {
        setFilters((prev) => ({
            ...prev,
            page,
        }));
    };

    return {
        ventas,
        loading,

        filters,
        actualizarFiltros,

        pagination,
        cambiarPagina,

        recargarVentas: obtenerVentas,
    };
}

export default useVentas;