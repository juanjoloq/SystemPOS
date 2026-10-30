import useEstadisticasVentas from "../../hooks/useEstadisticasVentas";

function StatsCards() {
    const {
        stats,
        loading,
    } = useEstadisticasVentas();

    const estadisticas = [
        {
            title: "Ventas Hoy",
            value: stats.ventasHoy,
        },
        {
            title: "Total Vendido",
            value: loading
                ? "Cargando..."
                : `$ ${stats.totalVendido.toLocaleString("es-CO")}`,
        },
    ];

    return (
        <div className="grid grid-cols-2 gap-6">
            {estadisticas.map((stat) => (
                <div
                    key={stat.title}
                    className="
                        rounded-app
                        border
                        border-app
                        bg-surface
                        p-5
                        shadow-app
                    "
                >
                    <p className="text-sm text-secondary">
                        {stat.title}
                    </p>

                    <h2 className="mt-2 text-2xl font-bold text-app">
                        {loading && stat.title === "Ventas Hoy"
                            ? "Cargando..."
                            : stat.value}
                    </h2>
                </div>
            ))}
        </div>
    );
}

export default StatsCards;