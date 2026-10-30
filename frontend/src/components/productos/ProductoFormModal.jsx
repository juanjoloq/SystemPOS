import { useEffect, useState } from "react";

function ProductoFormModal({
    open,
    onClose,
    onGuardar,
    producto,
    categorias,
    loading,
}) {

    const [formData, setFormData] = useState({
        nombre: "",
        categoria: "",
        precio: "",
    });

    useEffect(() => {

        if (producto) {

            setFormData({
                nombre: producto.nombre,
                categoria: producto.categoria.id,
                precio: producto.precio,
            });

        } else {

            setFormData({
                nombre: "",
                categoria: "",
                precio: "",
            });

        }

    }, [producto, open]);

    if (!open) {
        return null;
    }

    const handleChange = ({ target }) => {

        setFormData((prev) => ({
            ...prev,
            [target.name]: target.value,
        }));

    };

    const handleSubmit = (e) => {

        e.preventDefault();

        onGuardar({
            ...formData,
            precio: Number(formData.precio),
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

                        {producto
                            ? "Editar producto"
                            : "Nuevo producto"}

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
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            className="
                                w-full
                                rounded-app
                                border
                                border-app
                                bg-background
                                px-4
                                py-2
                                outline-none
                                focus:ring-2
                                focus:ring-primary
                            "
                            required
                        />

                    </div>

                    <div>

                        <label className="mb-2 block font-medium">
                            Categoría
                        </label>

                        <select
                            name="categoria"
                            value={formData.categoria}
                            onChange={handleChange}
                            className="
                                w-full
                                rounded-app
                                border
                                border-app
                                bg-background
                                px-4
                                py-2
                                outline-none
                                focus:ring-2
                                focus:ring-primary
                            "
                            required
                        >

                            <option value="">
                                Seleccione una categoría
                            </option>

                            {categorias.map((categoria) => (

                                <option
                                    key={categoria.id}
                                    value={categoria.id}
                                >
                                    {categoria.nombre}
                                </option>

                            ))}

                        </select>

                    </div>

                    <div>

                        <label className="mb-2 block font-medium">
                            Precio
                        </label>

                        <input
                            type="number"
                            name="precio"
                            min="1"
                            step="0.01"
                            value={formData.precio}
                            onChange={handleChange}
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

export default ProductoFormModal;