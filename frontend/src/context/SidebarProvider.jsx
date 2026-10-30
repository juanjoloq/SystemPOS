import { useEffect, useState } from "react";
import SidebarContext from "./SidebarContext";

function SidebarProvider({ children }) {
    const [collapsed, setCollapsed] = useState(() => {
        return JSON.parse(localStorage.getItem("sidebarCollapsed")) ?? false;
    });

    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem(
            "sidebarCollapsed",
            JSON.stringify(collapsed)
        );
    }, [collapsed]);

    return (
        <SidebarContext.Provider
            value={{
                collapsed,
                setCollapsed,
                mobileOpen,
                setMobileOpen,
            }}
        >
            {children}
        </SidebarContext.Provider>
    );
}

export default SidebarProvider;