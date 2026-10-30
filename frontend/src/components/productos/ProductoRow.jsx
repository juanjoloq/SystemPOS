import {
    PencilSquareIcon,
    NoSymbolIcon,
    CheckCircleIcon,
} from "@heroicons/react/24/outline";

function ProductoRow({
    producto,
    onEditar,
    onCambiarEstado,
}) {

    return (

        <tr className="border-b border-app">

            <td className="px-4 py-3">

                {producto.nombre}

            </td>

            <td className="px-4 py-3">

                {producto.categoria.nombre}

            </td>

            <td className="px-4 py-3 text-right font-semibold">

                ${producto.precio.toLocaleString("es-CO")}

            </td>

            <td className="px-4 py-3">

                <span
                    className={`
                        rounded-full
                        px-3
                        py-1
                        text-xs
                        font-semibold
                        ${
                            producto.activo
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                        }
                    `}
                >
                    {producto.activo ? "Activo" : "Inactivo"}
                </span>

            </td>

            <td className="px-4 py-3">

                <div className="flex justify-center gap-2">

                    <button
                        onClick={() => onEditar(producto)}
                        className="
                            rounded-lg
                            p-2
                            transition
                            hover:bg-hover
                        "
                    >
                        <PencilSquareIcon className="h-5 w-5" />
                    </button>

                    <button
                        onClick={() => onCambiarEstado(producto)}
                        className="
                            rounded-lg
                            p-2
                            transition
                            hover:bg-hover
                        "
                    >
                        {
                            producto.activo ? (
                                <NoSymbolIcon className="h-5 w-5 text-red-500" />
                            ) : (
                                <CheckCircleIcon className="h-5 w-5 text-green-500" />
                            )
                        }
                    </button>

                </div>

            </td>

        </tr>

    );

}

export default ProductoRow;