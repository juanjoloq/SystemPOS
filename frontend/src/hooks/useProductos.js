import { useEffect, useState } from "react";

import { obtenerProductos } from "../services/productoService";

function useProductos() {

    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        cargarProductos();

    }, []);

    const cargarProductos = async (params = {}) => {

        try {

            setLoading(true);

            const productos = await obtenerProductos(params);

            setProductos(productos);

        } catch (error) {

            setError(error);

        } finally {

            setLoading(false);

        }

    };

    return {
        productos,
        loading,
        error,
        recargar: cargarProductos,
    };

}

export default useProductos;