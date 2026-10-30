import AuditoriaRow from "./AuditoriaRow";

function AuditoriaTable({ auditorias }) {

    return (

        <table className="min-w-full">

            <thead className="bg-hover">

                <tr>

                    <th className="px-4 py-3 text-left">
                        Fecha
                    </th>

                    <th className="px-4 py-3 text-left">
                        Usuario
                    </th>

                    <th className="px-4 py-3 text-left">
                        Módulo
                    </th>

                    <th className="px-4 py-3 text-left">
                        Acción
                    </th>

                    <th className="px-4 py-3 text-left">
                        Descripción
                    </th>

                </tr>

            </thead>

            <tbody>

                {auditorias.map((auditoria) => (

                    <AuditoriaRow
                        key={auditoria.id}
                        auditoria={auditoria}
                    />

                ))}

            </tbody>

        </table>

    );

}

export default AuditoriaTable;