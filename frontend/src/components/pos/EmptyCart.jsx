import { ShoppingCartIcon } from "@heroicons/react/24/outline";

function EmptyCart() {
    return (
        <div className="flex h-full flex-col items-center justify-center gap-4 py-12">

            <ShoppingCartIcon className="h-14 w-14 text-secondary"/>

            <div className="text-center">

                <h3 className="font-semibold text-app">
                    El carrito está vacío
                </h3>

                <p className="mt-1 text-sm text-secondary">
                    Agrega productos para comenzar la venta.
                </p>

            </div>

        </div>
    );
}

export default EmptyCart;