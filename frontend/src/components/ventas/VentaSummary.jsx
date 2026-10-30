function VentaSummary({ venta }) {

    return (

        <div className="grid gap-5 md:grid-cols-2">

            <div>

                <p className="text-sm text-secondary">
                    Estado
                </p>

                <p className="mt-1 font-semibold text-app">
                    {venta.estado}
                </p>

            </div>

            <div>

                <p className="text-sm text-secondary">
                    Total
                </p>

                <p className="mt-1 text-xl font-bold text-primary">
                    ${venta.total.toLocaleString("es-CO")}
                </p>

            </div>

            <div>

                <p className="text-sm text-secondary">
                    Fecha de registro
                </p>

                <p className="mt-1 text-app">
                    {new Date(
                        venta.createdAt
                    ).toLocaleString("es-CO")}
                </p>

            </div>

            <div>

                <p className="text-sm text-secondary">
                    Registró
                </p>

                <p className="mt-1 text-app">
                    {venta.creadoPor?.nombre}
                </p>

            </div>

            {
                venta.actualizadoPor && (

                    <>

                        <div>

                            <p className="text-sm text-secondary">
                                Última modificación
                            </p>

                            <p className="mt-1 text-app">

                                {new Date(
                                    venta.updatedAt
                                ).toLocaleString("es-CO")}

                            </p>

                        </div>

                        <div>

                            <p className="text-sm text-secondary">
                                Modificado por
                            </p>

                            <p className="mt-1 text-app">

                                {venta.actualizadoPor.nombre}

                            </p>

                        </div>

                    </>

                )
            }

            {
                venta.motivoModificacion && (

                    <div className="md:col-span-2">

                        <p className="text-sm text-secondary">
                            Motivo de modificación
                        </p>

                        <p className="mt-1 text-app">

                            {venta.motivoModificacion}

                        </p>

                    </div>

                )
            }

            {
                venta.anuladoPor && (

                    <>

                        <div>

                            <p className="text-sm text-secondary">
                                Fecha de anulación
                            </p>

                            <p className="mt-1 text-app">

                                {new Date(
                                    venta.fechaAnulacion
                                ).toLocaleString("es-CO")}

                            </p>

                        </div>

                        <div>

                            <p className="text-sm text-secondary">
                                Anulada por
                            </p>

                            <p className="mt-1 text-app">

                                {venta.anuladoPor.nombre}

                            </p>

                        </div>

                    </>

                )
            }

            {
                venta.motivoAnulacion && (

                    <div className="md:col-span-2">

                        <p className="text-sm text-secondary">
                            Motivo de anulación
                        </p>

                        <p className="mt-1 text-app">

                            {venta.motivoAnulacion}

                        </p>

                    </div>

                )
            }

        </div>

    );

}

export default VentaSummary;