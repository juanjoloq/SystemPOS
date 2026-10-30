import { PlusIcon } from "@heroicons/react/24/outline";
import usePos from "../../hooks/usePos";
import Button from "../ui/Button";

function ProductCard({ producto }) {
    const { agregarProducto } = usePos();
    return (

        <div
            className="
                rounded-app
                border
                border-app
                bg-surface
                p-4
                transition-all
                hover:border-primary
            "
        >

            <div className="mb-4 flex items-center justify-between gap-2">

                <h3 className="text-sm font-semibold text-app">

                    {producto.nombre}

                </h3>

                <span className="
        text-base
        font-bold
        text-primary
        whitespace-nowrap
    "
>
    $
    {producto.precio.toLocaleString("es-CO")}
</span>

            </div>

            <Button
    variant="primary"
    className="
        flex
        h-10
        w-full
        items-center
        justify-center
        gap-2
    "
    onClick={() => agregarProducto(producto)}
>

                <PlusIcon className="h-5 w-5"/>

                Agregar

            </Button>

        </div>

    );

}

export default ProductCard;