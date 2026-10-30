import useCategorias from "../../hooks/useCategorias";
import usePos from "../../hooks/usePos";

function CategoryFilter() {

    const { categorias, loading } = useCategorias();

    const {
        categoriaSeleccionada,
        seleccionarCategoria,
    } = usePos();

    if (loading) {
        return (
            <div className="mt-5 flex gap-3">
                <div className="h-10 w-20 animate-pulse rounded-full bg-slate-700" />
                <div className="h-10 w-24 animate-pulse rounded-full bg-slate-700" />
                <div className="h-10 w-24 animate-pulse rounded-full bg-slate-700" />
            </div>
        );
    }

    return (
        <div className="mt-5 flex flex-wrap gap-3">

            <button
                onClick={() => seleccionarCategoria(null)}
                className={`
                    rounded-full
                    border
                    px-5
                    py-2
                    text-sm
                    font-medium
                    transition
                    ${
                        categoriaSeleccionada === null
                            ? "border-primary bg-primary text-[var(--text)]"
                            : "border-app bg-surface text-app hover:border-primary hover:text-primary"
                    }
                `}
            >
                Todos
            </button>

            {categorias.map((categoria) => (

                <button
                    key={categoria.id}
                    onClick={() => seleccionarCategoria(categoria.id)}
                    className={`
                        rounded-full
                        border
                        px-5
                        py-2
                        text-sm
                        font-medium
                        transition
                        ${
                            categoriaSeleccionada === categoria.id
                                ? "border-primary bg-primary text-[var(--text)]"
                                : "border-app bg-surface text-app hover:border-primary hover:text-primary"
                        }
                    `}
                >
                    {categoria.nombre}
                </button>

            ))}

        </div>
    );
}

export default CategoryFilter;