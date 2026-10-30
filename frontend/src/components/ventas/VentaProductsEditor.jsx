import {
    MinusIcon,
    PlusIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";

function VentaProductsEditor({
    productos,
    aumentarCantidad,
    disminuirCantidad,
    eliminarProducto,
}) {

    return (

        <div className="space-y-3">

            {
                productos.map((producto) => (

                    <div
                        key={producto.productoId}
                        className="
                            flex
                            items-center
                            justify-between
                            rounded-app
                            border
                            border-app
                            p-4
                        "
                    >

                        <div>

                            <h3 className="font-semibold text-app">
                                {producto.nombre}
                            </h3>

                            <p className="text-sm text-secondary">

                                ${producto.precioUnitario.toLocaleString("es-CO")}

                            </p>

                        </div>

                        <div className="flex items-center gap-3">

                            <button
                                onClick={() =>
                                    disminuirCantidad(producto.productoId)
                                }
                            >
                                <MinusIcon className="h-5 w-5"/>
                            </button>

                            <span className="w-6 text-center">

                                {producto.cantidad}

                            </span>

                            <button
                                onClick={() =>
                                    aumentarCantidad(producto.productoId)
                                }
                            >
                                <PlusIcon className="h-5 w-5"/>
                            </button>

                            <button
                                onClick={() =>
                                    eliminarProducto(producto.productoId)
                                }
                                className="text-red-500"
                            >
                                <TrashIcon className="h-5 w-5"/>
                            </button>

                        </div>

                    </div>

                ))
            }

        </div>

    );

}

export default VentaProductsEditor;