import CartItem from "./CartItem";
import CartFooter from "./CartFooter";
import EmptyCart from "./EmptyCart";

import usePos from "../../hooks/usePos";

import ModificationReason from "./ModificationReason";

function Cart() {

    const { carrito } = usePos();

    return (
        <>
            <div className="flex-1 overflow-y-auto scrollbar-app">

                {
                    carrito.length === 0 ? (

                        <EmptyCart />

                    ) : (

                        <div className="space-y-1 p-4">

                            {carrito.map((producto) => (

                                <CartItem
                                    key={producto.id}
                                    producto={producto}
                                />

                            ))}

                        </div>

                    )
                }

            </div>
            
            <ModificationReason />

            <CartFooter />

        </>
    );

}

export default Cart;