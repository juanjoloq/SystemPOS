import UsuarioRow from "./UsuarioRow";

function UsuarioTable({
    usuarios,
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
                        Usuario
                    </th>

                    <th className="px-4 py-3 text-left">
                        Rol
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

                {usuarios.map((usuario) => (

                    <UsuarioRow
                        key={usuario.id}
                        usuario={usuario}
                        onEditar={onEditar}
                        onCambiarEstado={onCambiarEstado}
                    />

                ))}

            </tbody>

        </table>

    );

}

export default UsuarioTable;