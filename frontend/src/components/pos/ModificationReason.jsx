import usePos from "../../hooks/usePos";

function ModificationReason() {

    const {
        modo,
        motivoModificacion,
        setMotivoModificacion,
    } = usePos();

    if (modo !== "editar") {
        return null;
    }

    return (

        <div className="border-t border-app p-4">

            <label className="mb-2 block text-sm font-medium text-app">

                Motivo de la modificación

            </label>

            <textarea
    rows={3}
    value={motivoModificacion}
    onChange={(e) =>
        setMotivoModificacion(e.target.value)
    }
    placeholder="Ingrese el motivo de la modificación..."
    className="
        w-full
        rounded-app
        border
        border-app
        bg-surface
        p-3
        outline-none
        transition
        focus:border-primary
    "
/>

        </div>

    );

}

export default ModificationReason;