import {
    ArrowRightStartOnRectangleIcon,
    ChevronDownIcon,
} from "@heroicons/react/24/outline";

function UserDropdown({
    user,
    logout,
    open,
    setOpen,
}) {
    return (
        <div className="relative">

            <button
                onClick={() => setOpen(!open)}
                className="
                    flex
                    items-center
                    gap-2
                    rounded-app
                    px-3
                    py-2
                    transition
                    hover:bg-hover
                "
            >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--sidebar)] font-semibold text-white">
                    {user?.nombre?.charAt(0).toUpperCase()}
                </div>

                <div className="hidden text-left lg:block">
                    <p className="text-sm font-semibold text-app">
                        {user?.nombre}
                    </p>

                    <p className="text-xs text-secondary">
                        {user?.rol}
                    </p>
                </div>

                <ChevronDownIcon className="h-4 w-4" />
            </button>

            {open && (
                <div
                    className="
                        absolute
                        right-0
                        mt-2
                        w-60
                        rounded-app
                        border
                        border-app
                        bg-surface
                        shadow-lg
                        overflow-hidden
                        z-50
                    "
                >

                    <div className="border-b border-app p-4">

                        <p className="font-semibold text-app">
                            {user?.nombre}
                        </p>

                        <p className="text-sm text-secondary">
                            {user?.usuario}
                        </p>

                    </div>

                    <button
                        onClick={logout}
                        className="
                            flex
                            w-full
                            items-center
                            gap-3
                            px-4
                            py-3
                            text-[var(--danger)]
                            transition
                            hover:bg-red-50
                            dark:hover:bg-red-950/30
                        "
                    >
                        <ArrowRightStartOnRectangleIcon className="h-5 w-5"/>

                        Cerrar sesión

                    </button>

                </div>
            )}

        </div>
    );
}

export default UserDropdown;