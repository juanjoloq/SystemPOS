import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import usePos from "../../hooks/usePos";

function SearchBar() {

    const {
        textoBusqueda,
        buscarProducto,
    } = usePos();

    return (

        <div className="relative">

            <MagnifyingGlassIcon
                className="
                    absolute
                    left-4
                    top-1/2
                    h-5
                    w-5
                    -translate-y-1/2
                    text-app-secondary
                "
            />

            <input
                type="text"
                value={textoBusqueda}
                onChange={(e) => buscarProducto(e.target.value)}
                placeholder="Buscar producto..."
                className="
                    h-11
                    w-full
                    rounded-app
                    border
                    border-app
                    bg-surface
                    pl-11
                    pr-4
                    text-app
                    outline-none
                    transition
                    focus:border-primary
                "
            />

        </div>

    );

}

export default SearchBar;