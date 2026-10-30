import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Modal from "../ui/Modal";
import Button from "../ui/Button";

import useAnularVenta from "../../hooks/useAnularVenta";

function AnularVentaModal({
    open,
    onClose,
    venta,
    onSuccess,
}) {

    const [motivo, setMotivo] = useState("");

    const {
        anularVenta,
        loading,
    } = useAnularVenta();

    useEffect(() => {

        if (!open) {
            setMotivo("");
        }

    }, [open]);

    if (!venta) {
        return null;
    }

    const handleClose = () => {

        setMotivo("");

        onClose();

    };

    const handleSubmit = async () => {

        if (!motivo.trim()) {

            toast.error(
                "Debe ingresar el motivo de la anulación."
            );

            return;

        }

        try {

            await anularVenta(
                venta.id,
                motivo.trim()
            );

            handleClose();

            onSuccess?.();

        } catch (error) {
            // El hook ya muestra el mensaje.
        }

    };

    return (

        <Modal
            open={open}
            onClose={handleClose}
            title="Anular Venta"
        >

            <div className="space-y-5">

                <div>

                    <p className="text-secondary">
                        Esta acción no elimina la venta.
                    </p>

                    <p className="text-secondary">
                        La venta quedará marcada como anulada.
                    </p>

                </div>

                <div>

                    <label className="mb-2 block font-medium">
                        Motivo de la anulación
                    </label>

                    <textarea
                        rows={4}
                        value={motivo}
                        onChange={(e) =>
                            setMotivo(e.target.value)
                        }
                        placeholder="Ingrese el motivo..."
                        className="
                            w-full
                            rounded-app
                            border
                            border-app
                            bg-surface
                            p-3
                            outline-none
                            focus:border-primary
                        "
                    />

                </div>

                <div className="flex justify-end gap-3">

                    <Button
                        variant="secondary"
                        onClick={handleClose}
                    >
                        Cancelar
                    </Button>

                    <Button
                        variant="danger"
                        loading={loading}
                        onClick={handleSubmit}
                    >
                        Anular Venta
                    </Button>

                </div>

            </div>

        </Modal>

    );

}

export default AnularVentaModal;