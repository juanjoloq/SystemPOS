import { useEffect, useState } from "react";
import { obtenerEstadisticasVentasService } from "../services/venta.service";

function useEstadisticasVentas() {
    const [stats, setStats] = useState({
        ventasHoy: 0,
        totalVendido: 0,
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const cargarEstadisticas = async () => {
        try {
            setLoading(true);
            setError(null);

            const respuesta =
                await obtenerEstadisticasVentasService();

            setStats(respuesta.stats);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cargarEstadisticas();
    }, []);

    return {
        stats,
        loading,
        error,
        recargar: cargarEstadisticas,
    };
}

export default useEstadisticasVentas;