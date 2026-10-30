import useAuditoria from "../../hooks/useAuditoria";

import AuditoriaTable from "../../components/auditoria/AuditoriaTable";
import AuditoriaPagination from "../../components/auditoria/AuditoriaPagination";

function AuditoriaPage() {

    const {
        auditorias,
        pagination,
        loading,
        error,
        recargar,
    } = useAuditoria();

    if (loading) {

        return <p>Cargando auditoría...</p>;

    }

    if (error) {

        return <p>Error al cargar la auditoría.</p>;

    }

    return (

        <div className="space-y-6">

            <div>

                <h1 className="text-2xl font-bold">

                    Auditoría

                </h1>

            </div>

            <div
                className="
                    overflow-hidden
                    rounded-app
                    bg-surface
                    shadow-app
                "
            >

                <AuditoriaTable
                    auditorias={auditorias}
                />

                <AuditoriaPagination
                    pagination={pagination}
                    cambiarPagina={recargar}
                />

            </div>

        </div>

    );

}

export default AuditoriaPage;