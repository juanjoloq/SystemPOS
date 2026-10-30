import { useState } from "react";
import Swal from "sweetalert2";

import useProductosCrud from "../../hooks/useProductosCrud";
import useCategoriasCrud from "../../hooks/useCategoriasCrud";

import {
    crearProducto,
    actualizarProducto,
    cambiarEstadoProducto,
} from "../../services/productoService";

import ProductoTable from "../../components/productos/ProductoTable";
import ProductoPagination from "../../components/productos/ProductoPagination";
import ProductoFormModal from "../../components/productos/ProductoFormModal";

function ProductosPage() {

    const {
        productos,
        pagination,
        loading,
        error,
        recargar,
    } = useProductosCrud();

    const {
        categorias,
    } = useCategoriasCrud();

    const [openModal, setOpenModal] = useState(false);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [guardando, setGuardando] = useState(false);

    const abrirCrear = () => {

        setProductoSeleccionado(null);
        setOpenModal(true);

    };

    const abrirEditar = (producto) => {

        setProductoSeleccionado(producto);
        setOpenModal(true);

    };

    const cerrarModal = () => {

        setProductoSeleccionado(null);
        setOpenModal(false);

    };

    const guardarProducto = async (producto) => {

        try {

            setGuardando(true);

            if (productoSeleccionado) {

                await actualizarProducto(
                    productoSeleccionado.id,
                    producto
                );

            } else {

                await crearProducto(producto);

            }

            cerrarModal();

            await recargar(pagination.page);

            Swal.fire({
                icon: "success",
                title: "Éxito",
                text: productoSeleccionado
                    ? "Producto actualizado correctamente."
                    : "Producto creado correctamente.",
                timer: 1500,
                showConfirmButton: false,
            });

        } catch (error) {

            Swal.fire({
                icon: "error",
                title: "Error",
                text: error.response?.data?.message || error.message,
            });

        } finally {

            setGuardando(false);

        }

    };

    const cambiarEstado = async (producto) => {

        const result = await Swal.fire({
            title: producto.activo
                ? "¿Desactivar producto?"
                : "¿Activar producto?",
            text: "Esta acción puede revertirse posteriormente.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí",
            cancelButtonText: "Cancelar",
        });

        if (!result.isConfirmed) {
            return;
        }

        try {

            await cambiarEstadoProducto(producto.id);

            await recargar(pagination.page);

            Swal.fire({
                icon: "success",
                title: "Proceso realizado",
                timer: 1200,
                showConfirmButton: false,
            });

        } catch (error) {

            Swal.fire({
                icon: "error",
                title: "Error",
                text: error.response?.data?.message || error.message,
            });

        }

    };

    if (loading) {

        return <p>Cargando productos...</p>;

    }

    if (error) {

        return <p>Error al cargar productos.</p>;

    }

    return (

        <div className="space-y-6">

            <div className="flex items-center justify-between">

                <h1 className="text-2xl font-bold">

                    Productos

                </h1>

                <button
                    onClick={abrirCrear}
                    className="
                        rounded-app
                        bg-[var(--primary)]
                        px-4
                        py-2
                        text-white
                    "
                >
                    Nuevo producto
                </button>

            </div>

            <div
                className="
                    overflow-hidden
                    rounded-app
                    bg-surface
                    shadow-app
                "
            >

                <ProductoTable
                    productos={productos}
                    onEditar={abrirEditar}
                    onCambiarEstado={cambiarEstado}
                />

                <ProductoPagination
                    pagination={pagination}
                    cambiarPagina={recargar}
                />

            </div>

            <ProductoFormModal
                open={openModal}
                onClose={cerrarModal}
                onGuardar={guardarProducto}
                producto={productoSeleccionado}
                categorias={categorias}
                loading={guardando}
            />

        </div>

    );

}

export default ProductosPage;