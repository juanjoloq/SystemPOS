import { useState } from "react";
import toast from "react-hot-toast";

import { anularVentaService } from "../services/venta.service";

function useAnularVenta() {

    const [loading, setLoading] = useState(false);

    const anularVenta = async (
        id,
        motivoAnulacion
    ) => {

        setLoading(true);

        try {

            const data = await anularVentaService(
                id,
                motivoAnulacion
            );

            toast.success(data.message);

            return data;

        } catch (error) {

            toast.error(
                error.response?.data?.message ??
                "No fue posible anular la venta."
            );

            throw error;

        } finally {

            setLoading(false);

        }

    };

    return {
        anularVenta,
        loading,
    };

}

export default useAnularVenta;