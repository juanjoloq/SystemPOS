import { EyeIcon } from "@heroicons/react/24/outline";

import VentaStatusBadge from "./VentaStatusBadge";

function VentaRow({ venta, onVerVenta }) {

    return (

        <tr className="border-b border-app">
            
            <td className="px-4 py-3">
                {venta.id}
            </td>

            <td className="px-4 py-3">

                {new Date(venta.createdAt).toLocaleDateString("es-CO")}

            </td>

            <td className="px-4 py-3">

                {new Date(venta.createdAt).toLocaleTimeString("es-CO", {
                    hour: "2-digit",
                    minute: "2-digit",
                })}

            </td>

            <td className="px-4 py-3">

                {venta.creadoPor?.nombre}

            </td>

            <td className="px-4 py-3 font-semibold">

                ${venta.total.toLocaleString("es-CO")}

            </td>

            <td className="px-4 py-3">

                <VentaStatusBadge estado={venta.estado} />

            </td>

            <td className="px-4 py-3">

                <button
                    onClick={() => onVerVenta(venta.id)}
                    className="
                        rounded-lg
                        p-2
                        transition
                        hover:bg-hover
                    "
                >
                    <EyeIcon className="h-5 w-5" />
                </button>

            </td>

        </tr>

    );

}

export default VentaRow;