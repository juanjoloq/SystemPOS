import VentaProductsTable from "./VentaProductsTable";
import VentaSummary from "./VentaSummary";
import VentaActions from "./VentaActions";

function VentaDetailModal({
    open,
    onClose,
    venta,
    loading,
    onAnular,
}) {

    if (!open) {
        return null;
    }

    return (

        <div
            className="
                fixed
                inset-0
                z-50
                flex
                items-center
                justify-center
                bg-black/50
                p-4
            "
        >

            <div
                className="
                    w-full
                    max-w-5xl
                    rounded-app
                    bg-surface
                    shadow-app
                "
            >

                <div
                    className="
                        flex
                        items-center
                        justify-between
                        border-b
                        border-app
                        p-5
                    "
                >

                    <h2 className="text-xl font-bold text-app">
                        Detalle de la venta
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-secondary hover:text-app"
                    >
                        ✕
                    </button>

                </div>

                <div className="space-y-6 p-6">

                    {
                        loading || !venta ? (

                            <div className="py-20 text-center">

                                Cargando venta...

                            </div>

                        ) : (

                            <>
                                <VentaSummary venta={venta} />

                                <VentaProductsTable
                                    productos={venta.productos}
                                />

                                <VentaActions
                                    venta={venta}
                                    onCerrar={onClose}
                                    onAnular={onAnular}
                                />
                            </>

                        )
                    }

                </div>

            </div>

        </div>

    );

}

export default VentaDetailModal;