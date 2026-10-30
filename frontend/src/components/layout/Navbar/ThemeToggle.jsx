import {
    MoonIcon,
    SunIcon,
} from "@heroicons/react/24/outline";

import useTheme from "../../../hooks/useTheme";

function ThemeToggle() {

    const {
        theme,
        toggleTheme,
    } = useTheme();

    return (

        <button
            onClick={toggleTheme}
            className="rounded-app p-2 transition hover:bg-hover"
        >

            {
                theme === "dark"

                    ? <SunIcon className="h-6 w-6"/>

                    : <MoonIcon className="h-6 w-6"/>
            }

        </button>

    );

}

export default ThemeToggle;