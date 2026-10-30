import { useEffect, useState } from "react";

function UsuarioFormModal({
    open,
    onClose,
    onGuardar,
    usuario,
    loading,
}) {

    const [formData, setFormData] = useState({
        nombre: "",
        usuario: "",
        password: "",
        rol: "EMPLEADO",
    });

    useEffect(() => {

        if (usuario) {

            setFormData({
                nombre: usuario.nombre,
                usuario: usuario.usuario,
                password: "",
                rol: usuario.rol,
            });

        } else {

            setFormData({
                nombre: "",
                usuario: "",
                password: "",
                rol: "EMPLEADO",
            });

        }

    }, [usuario, open]);

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

        const data = {
            nombre: formData.nombre,
            usuario: formData.usuario,
            rol: formData.rol,
        };

        if (!usuario) {
            data.password = formData.password;
        }

        onGuardar(data);

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

                    <h2 className="text-xl font-bold">

                        {
                            usuario
                                ? "Editar usuario"
                                : "Nuevo usuario"
                        }

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
                            className="w-full rounded-app border  px-4 py-2"
                            required
                        />

                    </div>

                    <div>

                        <label className="mb-2 block font-medium">
                            Usuario
                        </label>

                        <input
                            type="text"
                            name="usuario"
                            value={formData.usuario}
                            onChange={handleChange}
                            className="w-full rounded-app border px-4 py-2"
                            required
                        />

                    </div>

                    {
                        !usuario && (

                            <div>

                                <label className="mb-2 block font-medium">
                                    Contraseña
                                </label>

                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full rounded-app border  px-4 py-2"
                                    required
                                />

                            </div>

                        )
                    }

                    <div>

                        <label className="mb-2 block font-medium">
                            Rol
                        </label>

                        <select
                            name="rol"
                            value={formData.rol}
                            onChange={handleChange}
                            className="w-full rounded-app border px-4 py-2"
                        >

                            <option value="ADMIN">
                                Administrador
                            </option>

                            <option value="EMPLEADO">
                                Empleado
                            </option>

                        </select>

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
                            "
                        >
                            {
                                loading
                                    ? "Guardando..."
                                    : "Guardar"
                            }
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );

}

export default UsuarioFormModal;