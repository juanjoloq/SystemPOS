import SidebarHeader from "./SidebarHeader";
import SidebarItem from "./SidebarItem";

import { navigation } from "./navigation";

import useSidebar from "../../../hooks/useSidebar";

function Sidebar() {
    const {
        collapsed,
        mobileOpen,
    } = useSidebar();

    return (
        <aside
            className={`
                bg-sidebar
                text-white
                border-r
                border-app
                transition-all
                duration-300
                flex
                flex-col
                fixed
                lg:static
                z-50
                h-screen

                ${collapsed ? "w-20" : "w-64"}

                ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
            `}
        >
            <SidebarHeader />

            <nav className="flex-1 py-4">

                {navigation.map((item) => (

                    <SidebarItem
                        key={item.path}
                        item={item}
                    />

                ))}

            </nav>

        </aside>
    );
}

export default Sidebar;