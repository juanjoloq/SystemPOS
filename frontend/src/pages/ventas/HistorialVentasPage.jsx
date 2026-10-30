import { useState } from "react";

import useVentas from "../../hooks/useVentas";
import useVenta from "../../hooks/useVenta";

import VentaFilters from "../../components/ventas/VentaFilters";
import VentaTable from "../../components/ventas/VentaTable";
import VentaPagination from "../../components/ventas/VentaPagination";
import VentaDetailModal from "../../components/ventas/VentaDetailModal";
import AnularVentaModal from "../../components/ventas/AnularVentaModal";

function HistorialVentasPage() {

    const {
        ventas,
        loading,

        filters,
        actualizarFiltros,

        pagination,
        cambiarPagina,

        recargarVentas,
    } = useVentas();

    const {
        venta,
        loading: loadingVenta,
        obtenerVenta,
        limpiarVenta,
    } = useVenta();

    const [openDetalle, setOpenDetalle] = useState(false);

    const [ventaAnular, setVentaAnular] = useState(null);

    const abrirDetalleVenta = async (id) => {

        try {

            await obtenerVenta(id);

            setOpenDetalle(true);

        } catch (error) {}

    };

    const cerrarDetalleVenta = () => {

        setOpenDetalle(false);

        limpiarVenta();

    };

    return (

        <div className="flex h-full flex-col gap-5">

            <div>

                <h1 className="text-3xl font-bold text-app">
                    Historial de Ventas
                </h1>

                <p className="mt-1 text-secondary">
                    Consulta todas las ventas registradas.
                </p>

            </div>

            <VentaFilters
                filters={filters}
                actualizarFiltros={actualizarFiltros}
            />

            <section
                className="
                    flex
                    flex-1
                    flex-col
                    overflow-hidden
                    rounded-app
                    border
                    border-app
                    bg-surface
                    shadow-app
                "
            >

                <div className="border-b border-app p-5">

                    <h2 className="text-lg font-semibold text-app">
                        Ventas
                    </h2>

                </div>

                <div className="flex-1 overflow-auto">

                    {
                        loading ? (

                            <div className="flex h-full items-center justify-center">

                                <span className="text-secondary">
                                    Cargando ventas...
                                </span>

                            </div>

                        ) : ventas.length === 0 ? (

                            <div className="flex h-full items-center justify-center">

                                <span className="text-secondary">
                                    No existen ventas registradas.
                                </span>

                            </div>

                        ) : (

                            <VentaTable
                                ventas={ventas}
                                onVerVenta={abrirDetalleVenta}
                            />

                        )
                    }

                </div>

                {
                    !loading && ventas.length > 0 && (

                        <VentaPagination
                            pagination={pagination}
                            cambiarPagina={cambiarPagina}
                        />

                    )
                }

            </section>

            <VentaDetailModal
                open={openDetalle}
                venta={venta}
                loading={loadingVenta}
                onClose={cerrarDetalleVenta}
                onAnular={(venta) => {

                    cerrarDetalleVenta();

                    setVentaAnular(venta);

                }}
            />

            <AnularVentaModal
                open={Boolean(ventaAnular)}
                venta={ventaAnular}
                onClose={() => setVentaAnular(null)}
                onSuccess={() => {

                    setVentaAnular(null);

                    recargarVentas();

                }}
            />

        </div>

    );

}

export default HistorialVentasPage;