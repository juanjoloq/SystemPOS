import { forwardRef } from "react";

const Input = forwardRef(
    (
        {
            label,
            error,
            className = "",
            ...props
        },
        ref
    ) => {
        return (
            <div className="space-y-1">

                {label && (
                    <label className="text-sm font-medium text-app">
                        {label}
                    </label>
                )}

                <input
                    ref={ref}
                   className={`w-full rounded-app border border-app bg-surface px-3 py-2 text-app outline-none focus:border-[var(--primary)] ${className} `}
                    {...props}
                />

                {error && (
                    <p className="text-sm text-red-500">
                        {error}
                    </p>
                )}

            </div>
        );
    }
);

Input.displayName = "Input";

export default Input;