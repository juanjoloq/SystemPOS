import { useState } from "react";
import toast from "react-hot-toast";

import { registrarVentaService } from "../services/venta.service";

function useRegistrarVenta() {

    const [loading, setLoading] = useState(false);

    const registrarVenta = async (productos) => {

        setLoading(true);

        try {

            const data = await registrarVentaService(productos);

            toast.success(data.message);

            return data;

        } catch (error) {

            toast.error(
                error.response?.data?.message ??
                "No fue posible registrar la venta."
            );

            throw error;

        } finally {

            setLoading(false);

        }

    };

    return {
        registrarVenta,
        loading,
    };

}

export default useRegistrarVenta;