import ProductoRow from "./ProductoRow";

function ProductoTable({
    productos,
    onEditar,
    onCambiarEstado,
}) {

    return (

        <table className="min-w-full">

            <thead className="bg-hover">

                <tr>

                    <th className="px-4 py-3 text-left">
                        Producto
                    </th>

                    <th className="px-4 py-3 text-left">
                        Categoría
                    </th>

                    <th className="px-4 py-3 text-right">
                        Precio
                    </th>

                    <th className="px-4 py-3 text-left">
                        Estado
                    </th>

                    <th className="px-4 py-3 text-center">
                        Acciones
                    </th>

                </tr>

            </thead>

            <tbody>

                {productos.map((producto) => (

                    <ProductoRow
                        key={producto.id}
                        producto={producto}
                        onEditar={onEditar}
                        onCambiarEstado={onCambiarEstado}
                    />

                ))}

            </tbody>

        </table>

    );

}

export default ProductoTable;