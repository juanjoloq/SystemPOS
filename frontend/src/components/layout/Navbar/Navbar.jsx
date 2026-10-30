import PageTitle from "./PageTitle";
import ThemeToggle from "./ThemeToggle";
import UserMenu from "./UserMenu";
import { Bars3Icon } from "@heroicons/react/24/outline";
import useSidebar from "../../../hooks/useSidebar";

function Navbar() {
    const { setMobileOpen } = useSidebar();

    return (
        <header className="flex h-16 items-center justify-between border-b border-app bg-surface px-6">
            <div className="flex items-center gap-4">

            <button className="lg:hidden" onClick={() => setMobileOpen(true)} >
                    <Bars3Icon className="h-7 w-7"/>
            </button>

                <PageTitle />

            </div>

            <div className="flex items-center gap-4">

                <ThemeToggle />

                <UserMenu />

            </div>

        </header>
    );
}

export default Navbar;