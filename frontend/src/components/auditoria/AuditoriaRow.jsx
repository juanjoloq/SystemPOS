function AuditoriaRow({ auditoria }) {

    return (

        <tr className="border-b border-app">

            <td className="px-4 py-3">

                {new Date(
                    auditoria.createdAt
                ).toLocaleString("es-CO")}

            </td>

            <td className="px-4 py-3">

                {auditoria.usuario.nombre}

            </td>

            <td className="px-4 py-3">

                {auditoria.modulo}

            </td>

            <td className="px-4 py-3">

                {auditoria.accion}

            </td>

            <td className="px-4 py-3">

                {auditoria.descripcion}

                {
                    auditoria.motivo && (

                        <p className="mt-1 text-xs text-secondary">

                            Motivo: {auditoria.motivo}

                        </p>

                    )
                }

            </td>

        </tr>

    );

}

export default AuditoriaRow;