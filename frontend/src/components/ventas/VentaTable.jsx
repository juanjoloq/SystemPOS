import VentaRow from "./VentaRow";

function VentaTable({
    ventas,
    onVerVenta,
}) {

    return (

        <table className="min-w-full">

            <thead className="bg-hover">

                <tr>
                    <th className="px-4 py-3 text-left">
                        Id Venta
                    </th>

                    <th className="px-4 py-3 text-left">
                        Fecha
                    </th>

                    <th className="px-4 py-3 text-left">
                        Hora
                    </th>

                    <th className="px-4 py-3 text-left">
                        Empleado
                    </th>

                    <th className="px-4 py-3 text-left">
                        Total
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

                {ventas.map((venta) => (

                    <VentaRow
                        key={venta.id}
                        venta={venta}
                        onVerVenta={onVerVenta}
                    />

                ))}

            </tbody>

        </table>

    );

}

export default VentaTable;