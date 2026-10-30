import { NavLink } from "react-router-dom";

import useSidebar from "../../../hooks/useSidebar";

function SidebarItem({ item }) {

    const Icon = item.icon;

    const { collapsed } = useSidebar();

    return (
        <NavLink
            to={item.path}
            title={collapsed ? item.name : ""}
            className={({ isActive }) =>
                `
                flex
                items-center
                ${collapsed ? "justify-center" : ""}
                gap-3
                px-5
                py-3
                transition-all

                ${
                    isActive
                        ? "bg-[var(--sidebar-active)] text-white"
                        : "hover:bg-[var(--sidebar-hover)] text-slate-300"
                }
                `
            }
        >

            <Icon className="h-6 w-6 flex-shrink-0"/>

            {!collapsed && (
                <span>
                    {item.name}
                </span>
            )}

        </NavLink>
    );
}

export default SidebarItem;