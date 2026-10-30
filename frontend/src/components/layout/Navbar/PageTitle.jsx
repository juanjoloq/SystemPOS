import { useLocation } from "react-router-dom";

import { navigation } from "../Sidebar/navigation";

function PageTitle() {
    const { pathname } = useLocation();

    const current =
        navigation.find((item) => item.path === pathname);

    return (
        <h1 className="text-2xl font-bold text-app">
            {current?.name ?? "Sistema"}
        </h1>
    );
}

export default PageTitle;