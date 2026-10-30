function VentaStatusBadge({ estado }) {

    const styles = {
        ACTIVA: "bg-green-100 text-green-700",
        ANULADA: "bg-red-100 text-red-700",
    };

    return (
        <span
            className={`
                inline-flex
                rounded-full
                px-3
                py-1
                text-xs
                font-semibold
                ${styles[estado]}
            `}
        >
            {estado}
        </span>
    );

}

export default VentaStatusBadge;