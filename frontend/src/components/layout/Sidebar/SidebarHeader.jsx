import {
    Bars3Icon,
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";

import useSidebar from "../../../hooks/useSidebar";

function SidebarHeader() {

    const {
        collapsed,
        setCollapsed,
    } = useSidebar();

    return (
        <div className="flex items-center justify-between p-5">

            {!collapsed && (
                <h2 className="text-lg font-bold">
                    Sistema
                </h2>
            )}

            <button
                onClick={() => setCollapsed(!collapsed)}
                className="rounded-app p-2 hover:bg-[var(--sidebar-hover)]"
            >
                {
                    collapsed
                        ? <ChevronDoubleRightIcon className="h-5 w-5"/>
                        : <ChevronDoubleLeftIcon className="h-5 w-5"/>
                }
            </button>

        </div>
    );
}

export default SidebarHeader;