import { useNavigate } from "react-router-dom";

import Button from "../ui/Button";

function VentaActions({
    venta,
    onCerrar,
    onAnular,
}) {

    const navigate = useNavigate();

    const editarVenta = () => {

        onCerrar();

        navigate(`/ventas/${venta.id}/editar`);

    };

    const anularVenta = () => {

        onAnular(venta);

    };

    return (

        <div
            className="
                flex
                items-center
                justify-end
                gap-3
                border-t
                border-app
                pt-6
            "
        >

            <Button
                variant="secondary"
                onClick={onCerrar}
            >
                Cerrar
            </Button>

            {
                venta.estado === "ACTIVA" && (

                    <>
                        <Button
                            variant="warning"
                            onClick={editarVenta}
                        >
                            Editar
                        </Button>

                        <Button
                            variant="danger"
                            onClick={anularVenta}
                        >
                            Anular
                        </Button>
                    </>

                )
            }

        </div>

    );

}

export default VentaActions;