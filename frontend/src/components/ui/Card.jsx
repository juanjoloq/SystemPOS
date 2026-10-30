function Card({ children, className = "" }) {
    return (
        <div
            className={`
                rounded-app
                border
                border-app
                bg-surface
                shadow-app
                p-6
                ${className}
            `}
        >
            {children}
        </div>
    );
}

export default Card;