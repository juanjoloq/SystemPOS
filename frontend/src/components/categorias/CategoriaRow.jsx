import {
    PencilSquareIcon,
    NoSymbolIcon,
    CheckCircleIcon,
} from "@heroicons/react/24/outline";

function CategoriaRow({
    categoria,
    onEditar,
    onCambiarEstado,
}) {

    return (

        <tr className="border-b border-app">

            <td className="px-4 py-3">

                {categoria.nombre}

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
                            categoria.activo
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                        }
                    `}
                >
                    {categoria.activo ? "Activa" : "Inactiva"}
                </span>

            </td>

            <td className="px-4 py-3">

                <div className="flex justify-center gap-2">

                    <button
                        onClick={() => onEditar(categoria)}
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
                        onClick={() => onCambiarEstado(categoria)}
                        className="
                            rounded-lg
                            p-2
                            transition
                            hover:bg-hover
                        "
                    >
                        {
                            categoria.activo ? (
                                <NoSymbolIcon className="h-5 w-5 text-[var(--danger)]" />
                            ) : (
                                <CheckCircleIcon className="h-5 w-5 text-[var(--success)]" />
                            )
                        }
                    </button>

                </div>

            </td>

        </tr>

    );

}

export default CategoriaRow;