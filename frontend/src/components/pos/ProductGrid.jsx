import ProductCard from "./ProductCard";
import useProductos from "../../hooks/useProductos";
import usePos from "../../hooks/usePos";

function ProductGrid() {

    const {
        productos,
        loading,
    } = useProductos();

    const {
    categoriaSeleccionada,
    textoBusqueda,
} = usePos();

const productosFiltrados = productos.filter((producto) => {

    const coincideCategoria =
        !categoriaSeleccionada ||
        producto.categoria._id === categoriaSeleccionada;

    const coincideBusqueda =
        producto.nombre
            .toLowerCase()
            .includes(textoBusqueda.toLowerCase());

    return coincideCategoria && coincideBusqueda;

});

    if (loading) {

        return (
            <div className="flex h-full items-center justify-center">

                <span className="text-app-secondary">
                    Cargando productos...
                </span>

            </div>
        );

    }

    if (!productosFiltrados.length) {

        return (
            <div className="flex h-full items-center justify-center">

                <span className="text-app-secondary">
                    No hay productos registrados.
                </span>

            </div>
        );

    }

    return (

        <div
            className="
                h-full
                overflow-y-auto
                p-5
                scrollbar-app
            "
        >

            <div
                className="
                    grid
                    gap-4
                    [grid-template-columns:repeat(auto-fill,minmax(190px,1fr))]
                "
            >

                {productosFiltrados.map((producto) => (

                    <ProductCard
                        key={producto.id}
                        producto={producto}
                    />

                ))}

            </div>

        </div>

    );

}

export default ProductGrid;