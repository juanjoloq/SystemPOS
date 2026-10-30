import CategoriaRow from "./CategoriaRow";

function CategoriaTable({
    categorias,
    onEditar,
    onCambiarEstado,
}) {

    return (

        <table className="min-w-full">

            <thead className="bg-hover">

                <tr>

                    <th className="px-4 py-3 text-left">
                        Nombre
                    </th>

                    <th className="px-4 py-3 text-left">
                        Estado
                    </th>

                    <th className="px-4 py-3 text-center">
                        Acciones
                    </th>

                </tr>

            </thead>

            <tbody>

                {categorias.map((categoria) => (

                    <CategoriaRow
                        key={categoria.id}
                        categoria={categoria}
                        onEditar={onEditar}
                        onCambiarEstado={onCambiarEstado}
                    />

                ))}

            </tbody>

        </table>

    );

}

export default CategoriaTable;