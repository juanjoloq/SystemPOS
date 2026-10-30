import { useState } from "react";
import toast from "react-hot-toast";

import { actualizarVentaService } from "../services/venta.service";

function useActualizarVenta() {

    const [loading, setLoading] = useState(false);

    const actualizarVenta = async (
        id,
        productos,
        motivoModificacion
    ) => {

        setLoading(true);

        try {

            const data = await actualizarVentaService(
                id,
                {
                    productos,
                    motivoModificacion,
                }
            );

            toast.success(data.message);

            return data;

        } catch (error) {

            toast.error(

                error.response?.data?.message ??

                "No fue posible actualizar la venta."

            );

            throw error;

        } finally {

            setLoading(false);

        }

    };

    return {

        actualizarVenta,

        loading,

    };

}

export default useActualizarVenta;