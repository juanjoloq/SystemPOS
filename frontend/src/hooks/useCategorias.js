import { useEffect, useState } from "react";
import { obtenerCategorias } from "../services/categoriaService";

function useCategorias() {

    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        cargarCategorias();
    }, []);

    const cargarCategorias = async () => {

        try {

            setLoading(true);

            const categorias = await obtenerCategorias();

            setCategorias(categorias);

        } catch (error) {

            setError(error);

        } finally {

            setLoading(false);

        }

    };

    return {
        categorias,
        loading,
        error,
        recargar: cargarCategorias,
    };

}

export default useCategorias;