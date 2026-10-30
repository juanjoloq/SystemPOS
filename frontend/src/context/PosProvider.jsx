import { useMemo, useState } from "react";
import toast from "react-hot-toast";

import useRegistrarVenta from "../hooks/useRegistrarVenta";
import useActualizarVenta from "../hooks/useActualizarVenta";

import PosContext from "./PosContext";

function PosProvider({
    children,
    modo = "crear",
    onSuccess,
}) {

    const {
        registrarVenta,
        loading: registrando,
    } = useRegistrarVenta();

    const {
        actualizarVenta,
        loading: actualizando,
    } = useActualizarVenta();

    const loading = registrando || actualizando;

    const [ventaEditando, setVentaEditando] = useState(null);

    const [motivoModificacion, setMotivoModificacion] = useState("");

    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

    const [textoBusqueda, setTextoBusqueda] = useState("");

    const [carrito, setCarrito] = useState([]);

    const seleccionarCategoria = (id) => {
        setCategoriaSeleccionada(id);
    };

    const buscarProducto = (texto) => {
        setTextoBusqueda(texto);
    };

    const agregarProducto = (producto) => {

        setCarrito((prev) => {

            const existe = prev.find(
                (p) => p.id === producto.id
            );

            if (existe) {

                return prev.map((p) =>
                    p.id === producto.id
                        ? {
                              ...p,
                              cantidad: p.cantidad + 1,
                          }
                        : p
                );

            }

            return [
                ...prev,
                {
                    ...producto,
                    cantidad: 1,
                },
            ];

        });

    };

    const aumentarCantidad = (id) => {

        setCarrito((prev) =>
            prev.map((item) =>
                item.id === id
                    ? {
                          ...item,
                          cantidad: item.cantidad + 1,
                      }
                    : item
            )
        );

    };

    const disminuirCantidad = (id) => {

        setCarrito((prev) =>
            prev.flatMap((item) => {

                if (item.id !== id) {
                    return item;
                }

                if (item.cantidad === 1) {
                    return [];
                }

                return {
                    ...item,
                    cantidad: item.cantidad - 1,
                };

            })
        );

    };

    const eliminarProducto = (id) => {

        setCarrito((prev) =>
            prev.filter((item) => item.id !== id)
        );

    };

    const limpiarCarrito = () => {
        setCarrito([]);
    };

    const cargarVenta = (venta) => {

        setVentaEditando(venta);

        setCarrito(

            venta.productos.map((producto) => ({

                id: producto.productoId,

                nombre: producto.nombre,

                precio: producto.precioUnitario,

                cantidad: producto.cantidad,

            }))

        );

    };

    const reiniciarPos = () => {

        setVentaEditando(null);

        setMotivoModificacion("");

        setCategoriaSeleccionada(null);

        setTextoBusqueda("");

        setCarrito([]);

    };

    const total = carrito.reduce(
        (acc, item) => acc + item.precio * item.cantidad,
        0
    );

    const confirmarVenta = async () => {

    if (!carrito.length) return;

    const productos = carrito.map((item) => ({
        productoId: item.id,
        cantidad: item.cantidad,
    }));

    try {

        if (modo === "crear") {

            await registrarVenta(productos);

        } else {

            if (!motivoModificacion.trim()) {
                toast.error("Debe ingresar el motivo de la modificación.");
                return;
            }

            await actualizarVenta(
                ventaEditando.id,
                productos,
                motivoModificacion
            );

        }

        reiniciarPos();

        onSuccess?.();

        } catch (error) {
            // El hook ya muestra el toast correspondiente.
        }

    };

    const value = useMemo(() => ({

        modo,

        ventaEditando,

        cargarVenta,

        reiniciarPos,

        categoriaSeleccionada,
        seleccionarCategoria,

        textoBusqueda,
        buscarProducto,

        carrito,

        agregarProducto,
        aumentarCantidad,
        disminuirCantidad,
        eliminarProducto,
        limpiarCarrito,

        total,

        confirmarVenta,

        loading,

        motivoModificacion,
        setMotivoModificacion,

    }), [
        modo,
        ventaEditando,
        motivoModificacion,
        categoriaSeleccionada,
        textoBusqueda,
        carrito,
        total,
        loading,
    ]);

    return (

        <PosContext.Provider value={value}>

            {children}

        </PosContext.Provider>

    );

}

export default PosProvider;