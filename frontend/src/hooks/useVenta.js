import { useState } from "react";
import toast from "react-hot-toast";

import { obtenerVentaService } from "../services/venta.service";

function useVenta() {

    const [venta, setVenta] = useState(null);

    const [loading, setLoading] = useState(false);

    const obtenerVenta = async (id) => {

        setLoading(true);

        try {

            const data = await obtenerVentaService(id);

            setVenta(data.venta);

            return data.venta;

        } catch (error) {

            toast.error(
                error.response?.data?.message ??
                "No fue posible obtener la venta."
            );

            throw error;

        } finally {

            setLoading(false);

        }

    };

    const limpiarVenta = () => {
        setVenta(null);
    };

    return {
        venta,
        loading,
        obtenerVenta,
        limpiarVenta,
    };

}

export default useVenta;