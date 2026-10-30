import { useEffect, useState } from "react";

function CategoriaFormModal({
    open,
    onClose,
    onGuardar,
    categoria,
    loading,
}) {

    const [nombre, setNombre] = useState("");

    useEffect(() => {

        if (categoria) {

            setNombre(categoria.nombre);

        } else {

            setNombre("");

        }

    }, [categoria, open]);

    if (!open) {
        return null;
    }

    const handleSubmit = (e) => {

        e.preventDefault();

        onGuardar({
            nombre,
        });

    };

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
                    max-w-md
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

                        {categoria
                            ? "Editar categoría"
                            : "Nueva categoría"}

                    </h2>

                    <button
                        onClick={onClose}
                        className="text-secondary hover:text-app"
                    >
                        ✕
                    </button>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5 p-6"
                >

                    <div>

                        <label className="mb-2 block font-medium">

                            Nombre

                        </label>

                        <input
                            type="text"
                            value={nombre}
                            onChange={(e) =>
                                setNombre(e.target.value)
                            }
                            className="
                                w-full
                                rounded-app
                                border
                                bg-background
                                px-4
                                py-2
                                outline-none
                                focus:ring-2
                                focus:ring-primary
                            "
                            autoFocus
                            required
                        />

                    </div>

                    <div className="flex justify-end gap-3">

                        <button
                            type="button"
                            onClick={onClose}
                            className="
                                rounded-app
                                border
                                border-app
                                bg-[var(--danger)]
                                text-white
                                px-4
                                py-2
                                hover:bg-hover
                            "
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="
                                rounded-app
                                bg-[var(--success)]
                                px-4
                                py-2
                                text-white
                                disabled:opacity-50
                            "
                        >
                            {loading
                                ? "Guardando..."
                                : "Guardar"}
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default CategoriaFormModal;