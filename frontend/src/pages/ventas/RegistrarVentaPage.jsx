import StatsCards from "../../components/pos/StatsCards";
import PosProvider from "../../context/PosProvider";
import SearchBar from "../../components/pos/SearchBar";
import CategoryFilter from "../../components/pos/CategoryFilter";
import ProductGrid from "../../components/pos/ProductGrid";
import Cart from "../../components/pos/Cart";

function RegistrarVentaContent() {
    return (
        <div className="flex h-full flex-col gap-5 overflow-hidden">

            {/* Estadísticas */}

            <div className="hidden lg:block flex-none">
                <StatsCards />
            </div>

            {/* Contenido */}

            <div className="grid flex-1 min-h-0 gap-5 xl:grid-cols-[1fr_320px]">

                {/* Productos */}

                <section
                    className="
                        flex
                        min-h-0
                        flex-col
                        overflow-hidden
                        rounded-app
                        border
                        border-app
                        bg-surface
                        shadow-app
                    "
                >

                    <div className="border-b border-app p-5">

                        <SearchBar />

                        <CategoryFilter />

                    </div>

                    <div className="flex-1 overflow-hidden">

                        <ProductGrid />

                    </div>

                </section>

                {/* Carrito */}

                <section
    className="
        flex
        h-full
        min-h-0
        flex-col
        overflow-hidden
        rounded-app
        border
        border-app
        bg-surface
        shadow-app
    "
>

    <div className="border-b border-app p-5">

        <h2 className="text-xl font-semibold text-app">
            Carrito
        </h2>

    </div>

    <Cart />

</section>

            </div>

        </div>
    );
}


function RegistrarVentaPage() {

    return (

        <PosProvider>

            <RegistrarVentaContent />

        </PosProvider>

    );

}


export default RegistrarVentaPage;