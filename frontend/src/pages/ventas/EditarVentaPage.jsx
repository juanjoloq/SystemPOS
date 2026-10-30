import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PosProvider from "../../context/PosProvider";

import useVenta from "../../hooks/useVenta";
import usePos from "../../hooks/usePos";

import StatsCards from "../../components/pos/StatsCards";
import SearchBar from "../../components/pos/SearchBar";
import CategoryFilter from "../../components/pos/CategoryFilter";
import ProductGrid from "../../components/pos/ProductGrid";
import Cart from "../../components/pos/Cart";

function EditarVentaContent() {

    const { id } = useParams();

    const {
        venta,
        loading,
        obtenerVenta,
    } = useVenta();

    const {
        cargarVenta,
    } = usePos();

    useEffect(() => {

        obtenerVenta(id);

    }, [id]);

    useEffect(() => {

        if (venta) {

            cargarVenta(venta);

        }

    }, [venta]);

    if (loading) {

        return (

            <div className="flex h-full items-center justify-center">

                <span className="text-secondary">

                    Cargando venta...

                </span>

            </div>

        );

    }

    return (

        <div className="flex h-full flex-col gap-5 overflow-hidden">

            <div className="hidden lg:block flex-none">

                <StatsCards />

            </div>

            <div className="grid flex-1 min-h-0 gap-5 xl:grid-cols-[1fr_320px]">

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

                        <h2 className="text-xl font-semibold text-app">

                            Editar Venta

                        </h2>

                    </div>

                    <Cart />

                </section>

            </div>

        </div>

    );

}

function EditarVentaPage() {

    const navigate = useNavigate();

    return (

        <PosProvider modo="editar" onSuccess={() => navigate("/ventas")} >

            <EditarVentaContent />
            
        </PosProvider>

    );

}

export default EditarVentaPage;