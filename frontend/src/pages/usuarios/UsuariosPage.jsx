import { useState } from "react";
import Swal from "sweetalert2";

import useUsuarios from "../../hooks/useUsuarios";

import {
    crearUsuario,
    actualizarUsuario,
    cambiarEstadoUsuario,
} from "../../services/usuarioService";

import UsuarioTable from "../../components/usuarios/UsuarioTable";
import UsuarioPagination from "../../components/usuarios/UsuarioPagination";
import UsuarioFormModal from "../../components/usuarios/UsuarioFormModal";

function UsuariosPage() {

    const {
        usuarios,
        pagination,
        loading,
        error,
        recargar,
    } = useUsuarios();

    const [openModal, setOpenModal] = useState(false);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
    const [guardando, setGuardando] = useState(false);

    const abrirCrear = () => {

        setUsuarioSeleccionado(null);
        setOpenModal(true);

    };

    const abrirEditar = (usuario) => {

        setUsuarioSeleccionado(usuario);
        setOpenModal(true);

    };

    const cerrarModal = () => {

        setUsuarioSeleccionado(null);
        setOpenModal(false);

    };

    const guardarUsuario = async (usuario) => {

        try {

            setGuardando(true);

            if (usuarioSeleccionado) {

                await actualizarUsuario(
                    usuarioSeleccionado.id,
                    usuario
                );

            } else {

                await crearUsuario(usuario);

            }

            cerrarModal();

            await recargar(pagination.page);

            Swal.fire({
                icon: "success",
                title: "Éxito",
                text: usuarioSeleccionado
                    ? "Usuario actualizado correctamente."
                    : "Usuario creado correctamente.",
                timer: 1500,
                showConfirmButton: false,
            });

        } catch (error) {

            Swal.fire({
                icon: "error",
                title: "Error",
                text:
                    error.response?.data?.message ||
                    error.message,
            });

        } finally {

            setGuardando(false);

        }

    };

    const cambiarEstado = async (usuario) => {

        const result = await Swal.fire({
            title: usuario.activo
                ? "¿Desactivar usuario?"
                : "¿Activar usuario?",
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

            await cambiarEstadoUsuario(usuario.id);

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
                text:
                    error.response?.data?.message ||
                    error.message,
            });

        }

    };

    if (loading) {

        return <p>Cargando usuarios...</p>;

    }

    if (error) {

        return <p>Error al cargar usuarios.</p>;

    }

    return (

        <div className="space-y-6">

            <div className="flex items-center justify-between">

                <h1 className="text-2xl font-bold">

                    Usuarios

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
                    Nuevo usuario
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

                <UsuarioTable
                    usuarios={usuarios}
                    onEditar={abrirEditar}
                    onCambiarEstado={cambiarEstado}
                />

                <UsuarioPagination
                    pagination={pagination}
                    cambiarPagina={recargar}
                />

            </div>

            <UsuarioFormModal
                open={openModal}
                onClose={cerrarModal}
                onGuardar={guardarUsuario}
                usuario={usuarioSeleccionado}
                loading={guardando}
            />

        </div>

    );

}

export default UsuariosPage;