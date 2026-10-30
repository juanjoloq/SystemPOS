import { Outlet } from "react-router-dom";

import Navbar from "../components/layout/Navbar/Navbar";
import Sidebar from "../components/layout/Sidebar/Sidebar";

function DashboardLayout() {
    return (
        <div className="flex h-screen overflow-hidden bg-background">

            <Sidebar />

            <div className="flex flex-1 flex-col overflow-hidden">

                <Navbar />

                <main className="flex-1 overflow-hidden p-5">
                    <Outlet />
                </main>

            </div>

        </div>
    );
}

export default DashboardLayout;