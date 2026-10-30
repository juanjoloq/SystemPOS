import {
    MinusIcon,
    PlusIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";

import usePos from "../../hooks/usePos";

function CartItem({ producto }) {

    const {
        aumentarCantidad,
        disminuirCantidad,
        eliminarProducto,
    } = usePos();

    return (

        <article className="border-b border-app pb-3 last:border-none">

            <div className="mb-2 flex items-start justify-between gap-3">

                <h3 className="text-sm font-semibold text-app">
                    {producto.nombre}
                </h3>

                <button
                    onClick={() => eliminarProducto(producto.id)}
                    className="
                        text-red-500
                        transition
                        hover:text-red-600
                    "
                >
                    <TrashIcon className="h-4 w-4" />
                </button>

            </div>

            <div className="flex items-center justify-between">

                <div
                    className="
                        flex
                        h-8
                        items-center
                        overflow-hidden
                        rounded-lg
                        border
                        border-app
                    "
                >

                    <button
                        onClick={() => disminuirCantidad(producto.id)}
                        className="
                            flex
                            h-full
                            w-8
                            items-center
                            justify-center
                            hover:bg-hover
                        "
                    >
                        <MinusIcon className="h-3.5 w-3.5" />
                    </button>

                    <span
                        className="
                            flex
                            w-8
                            justify-center
                            text-sm
                            font-semibold
                        "
                    >
                        {producto.cantidad}
                    </span>

                    <button
                        onClick={() => aumentarCantidad(producto.id)}
                        className="
                            flex
                            h-full
                            w-8
                            items-center
                            justify-center
                            hover:bg-hover
                        "
                    >
                        <PlusIcon className="h-3.5 w-3.5" />
                    </button>

                </div>

                <span className="text-lg font-bold text-app">

                    $

                    {(producto.precio * producto.cantidad).toLocaleString("es-CO")}

                </span>

            </div>

        </article>

    );

}

export default CartItem;