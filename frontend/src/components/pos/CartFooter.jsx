import ConfirmSaleButton from "./ConfirmSaleButton";

import usePos from "../../hooks/usePos";

function CartFooter() {

    const { total } = usePos();

    return (

        <div
            className="
                border-t
                border-app
                bg-surface
                p-4
            "
        >

            <div className="mb-4 flex items-center justify-between">

                <span className="text-base font-semibold">

                    Total

                </span>

                <span
                    className="
                        text-3xl
                        font-bold
                        text-primary
                    "
                >

                    ${total.toLocaleString("es-CO")}

                </span>

            </div>

            <ConfirmSaleButton />

        </div>

    );

}

export default CartFooter;