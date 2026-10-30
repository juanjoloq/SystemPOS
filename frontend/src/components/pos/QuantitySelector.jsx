function QuantitySelector() {

    return (

        <div
            className="
                flex
                overflow-hidden
                rounded-lg
                border
                border-app
            "
        >

            <button
                className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    hover:bg-hover
                "
            >
                −
            </button>

            <span
                className="
                    flex
                    w-8
                    items-center
                    justify-center
                    text-sm
                    font-semibold
                "
            >
                2
            </span>

            <button
                className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    hover:bg-hover
                "
            >
                +
            </button>

        </div>

    );

}

export default QuantitySelector;