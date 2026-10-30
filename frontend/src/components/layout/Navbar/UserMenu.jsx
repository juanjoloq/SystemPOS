import { useState } from "react";

import useAuth from "../../../hooks/useAuth";

import UserDropdown from "./UserDropdown";

function UserMenu() {

    const { user, logout } = useAuth();

    const [open, setOpen] = useState(false);

    return (
        <UserDropdown
            user={user}
            logout={logout}
            open={open}
            setOpen={setOpen}
        />
    );
}

export default UserMenu;