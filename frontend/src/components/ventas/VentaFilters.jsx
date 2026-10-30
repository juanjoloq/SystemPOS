function VentaFilters({
    filters,
    actualizarFiltros,
}) {

    return (

        <div className="flex flex-wrap items-end gap-3">

            <input
                type="text"
                placeholder="ID de venta"
                value={filters.id}
                onChange={(e) =>
                    actualizarFiltros({
                        id: e.target.value,
                    })
                }
                className="
                    h-10
                    w-64
                    rounded-app
                    border
                    border-app
                    bg-surface
                    text-[var(--text)]
                    px-3
                    outline-none
                    focus:border-primary
                "
            />

            <select
                value={filters.estado}
                onChange={(e) =>
                    actualizarFiltros({
                        estado: e.target.value,
                    })
                }
                className="
                    h-10
                    w-44
                    rounded-app
                    border
                    border-app
                    bg-surface
                    px-3
                    outline-none
                    focus:border-primary
                "
            >

                <option value="">
                    Todos los estados
                </option>

                <option value="ACTIVA">
                    Activa
                </option>

                <option value="ANULADA">
                    Anulada
                </option>

            </select>

            <input
                type="date"
                value={filters.fechaInicio}
                onChange={(e) =>
                    actualizarFiltros({
                        fechaInicio: e.target.value,
                    })
                }
                className="
                    h-10
                    w-40
                    rounded-app
                    border
                    border-app
                    bg-surface
                    px-3
                    outline-none
                    focus:border-primary
                "
            />

            <input
                type="date"
                value={filters.fechaFin}
                onChange={(e) =>
                    actualizarFiltros({
                        fechaFin: e.target.value,
                    })
                }
                className="
                    h-10
                    w-40
                    rounded-app
                    border
                    border-app
                    bg-surface
                    px-3
                    outline-none
                    focus:border-primary
                "
            />

            <button
                onClick={() =>
                    actualizarFiltros({
                        id: "",
                        estado: "",
                        fechaInicio: "",
                        fechaFin: "",
                    })
                }
                className="
                    h-10
                    rounded-app
                    border
                    border-app
                    px-4
                    transition
                    hover:bg-hover
                "
            >
                Limpiar
            </button>

        </div>

    );

}

export default VentaFilters;