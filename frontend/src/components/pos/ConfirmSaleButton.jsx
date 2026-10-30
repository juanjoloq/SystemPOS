import Button from "../ui/Button";

import usePos from "../../hooks/usePos";

function ConfirmSaleButton() {

    const {
        confirmarVenta,
        loading,
        carrito,
        modo,
    } = usePos();

    return (

        <Button
            variant="success"
            disabled={!carrito.length || loading}
            onClick={confirmarVenta}
            className="
                h-11
                w-full
                rounded-lg
                font-semibold
            "
        >

            {
                loading
                    ? (
                        modo === "crear"
                            ? "Registrando..."
                            : "Guardando..."
                    )
                    : (
                        modo === "crear"
                            ? "Registrar Venta"
                            : "Guardar Cambios"
                    )
            }

        </Button>

    );

}

export default ConfirmSaleButton;