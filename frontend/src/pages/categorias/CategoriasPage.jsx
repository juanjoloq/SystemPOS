import { useState } from "react";
import Swal from "sweetalert2";

import useCategoriasCrud from "../../hooks/useCategoriasCrud";

import {
    crearCategoria,
    actualizarCategoria,
    cambiarEstadoCategoria,
} from "../../services/categoriaService";

import CategoriaTable from "../../components/categorias/CategoriaTable";
import CategoriaPagination from "../../components/categorias/CategoriaPagination";
import CategoriaFormModal from "../../components/categorias/CategoriaFormModal";

function CategoriasPage() {

    const {
        categorias,
        pagination,
        loading,
        error,
        recargar,
    } = useCategoriasCrud();

    const [openModal, setOpenModal] = useState(false);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
    const [guardando, setGuardando] = useState(false);

    const abrirCrear = () => {

        setCategoriaSeleccionada(null);
        setOpenModal(true);

    };

    const abrirEditar = (categoria) => {

        setCategoriaSeleccionada(categoria);
        setOpenModal(true);

    };

    const cerrarModal = () => {

        setCategoriaSeleccionada(null);
        setOpenModal(false);

    };

    const guardarCategoria = async (categoria) => {

        try {

            setGuardando(true);

            if (categoriaSeleccionada) {

                await actualizarCategoria(
                    categoriaSeleccionada.id,
                    categoria
                );

            } else {

                await crearCategoria(categoria);

            }

            cerrarModal();

            await recargar(pagination.page);

            Swal.fire({
                icon: "success",
                title: "Éxito",
                text: categoriaSeleccionada
                    ? "Categoría actualizada correctamente."
                    : "Categoría creada correctamente.",
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

    const cambiarEstado = async (categoria) => {

        const result = await Swal.fire({
            title: categoria.activo
                ? "¿Desactivar categoría?"
                : "¿Activar categoría?",
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

            await cambiarEstadoCategoria(categoria.id);

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

        return <p>Cargando categorías...</p>;

    }

    if (error) {

        return <p>Error al cargar categorías.</p>;

    }

    return (

        <div className="space-y-6">

            <div className="flex items-center justify-between">

                <h1 className="text-2xl font-bold">

                    Categorías

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
                    Nueva categoría
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

                <CategoriaTable
                    categorias={categorias}
                    onEditar={abrirEditar}
                    onCambiarEstado={cambiarEstado}
                />

                <CategoriaPagination
                    pagination={pagination}
                    cambiarPagina={recargar}
                />

            </div>

            <CategoriaFormModal
                open={openModal}
                onClose={cerrarModal}
                onGuardar={guardarCategoria}
                categoria={categoriaSeleccionada}
                loading={guardando}
            />

        </div>

    );

}

export default CategoriasPage;