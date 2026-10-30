import {
    PencilSquareIcon,
    NoSymbolIcon,
    CheckCircleIcon,
} from "@heroicons/react/24/outline";

function UsuarioRow({
    usuario,
    onEditar,
    onCambiarEstado,
}) {

    return (

        <tr className="border-b border-app">

            <td className="px-4 py-3">

                {usuario.nombre}

            </td>

            <td className="px-4 py-3">

                {usuario.usuario}

            </td>

            <td className="px-4 py-3">

                <span
                    className="
                        rounded-full
                        bg-primary/10
                        px-3
                        py-1
                        text-xs
                        font-semibold
                        text-primary
                    "
                >
                    {usuario.rol}
                </span>

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
                            usuario.activo
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                        }
                    `}
                >
                    {usuario.activo
                        ? "Activo"
                        : "Inactivo"}
                </span>

            </td>

            <td className="px-4 py-3">

                <div className="flex justify-center gap-2">

                    <button
                        onClick={() => onEditar(usuario)}
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
                        onClick={() => onCambiarEstado(usuario)}
                        className="
                            rounded-lg
                            p-2
                            transition
                            hover:bg-hover
                        "
                    >
                        {
                            usuario.activo
                                ? (
                                    <NoSymbolIcon className="h-5 w-5 text-red-500" />
                                )
                                : (
                                    <CheckCircleIcon className="h-5 w-5 text-green-500" />
                                )
                        }
                    </button>

                </div>

            </td>

        </tr>

    );

}

export default UsuarioRow;