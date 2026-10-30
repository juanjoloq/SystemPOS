function CategoriaPagination({
    pagination,
    cambiarPagina,
}) {

    const {
        page,
        totalPages,
        total,
    } = pagination;

    if (totalPages <= 1) {
        return null;
    }

    return (

        <div
            className="
                flex
                items-center
                justify-between
                border-t
                border-app
                p-4
            "
        >

            <span className="text-sm text-secondary">

                Total de categorías: <strong>{total}</strong>

            </span>

            <div className="flex items-center gap-2">

                <button
                    disabled={page === 1}
                    onClick={() => cambiarPagina(page - 1)}
                    className="
                        rounded-app
                        border
                        border-app
                        px-4
                        py-2
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                        hover:bg-hover
                    "
                >
                    Anterior
                </button>

                <span className="px-2 text-sm font-medium">

                    Página {page} de {totalPages}

                </span>

                <button
                    disabled={page === totalPages}
                    onClick={() => cambiarPagina(page + 1)}
                    className="
                        rounded-app
                        border
                        border-app
                        px-4
                        py-2
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                        hover:bg-hover
                    "
                >
                    Siguiente
                </button>

            </div>

        </div>

    );

}

export default CategoriaPagination;