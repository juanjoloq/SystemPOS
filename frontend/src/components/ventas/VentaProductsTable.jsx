function VentaProductsTable({ productos }) {

    return (

        <div className="overflow-x-auto">

            <table className="min-w-full">

                <thead className="border-b border-app">

                    <tr>

                        <th className="px-4 py-3 text-left">
                            Producto
                        </th>

                        <th className="px-4 py-3 text-left">
                            Categoría
                        </th>

                        <th className="px-4 py-3 text-center">
                            Cantidad
                        </th>

                        <th className="px-4 py-3 text-right">
                            Precio
                        </th>

                        <th className="px-4 py-3 text-right">
                            Subtotal
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {productos.map((producto) => (

                        <tr
                            key={producto.productoId}
                            className="border-b border-app"
                        >

                            <td className="px-4 py-3">
                                {producto.nombre}
                            </td>

                            <td className="px-4 py-3">
                                {producto.categoria.nombre}
                            </td>

                            <td className="px-4 py-3 text-center">
                                {producto.cantidad}
                            </td>

                            <td className="px-4 py-3 text-right">
                                ${producto.precioUnitario.toLocaleString("es-CO")}
                            </td>

                            <td className="px-4 py-3 text-right font-semibold">
                                ${producto.subtotal.toLocaleString("es-CO")}
                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>

    );

}

export default VentaProductsTable;