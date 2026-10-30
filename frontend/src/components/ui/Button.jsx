function Button({
  children,
  type = "button",
  variant = "primary",
  className = "",
  ...props
}) {
  const variants = {

    primary:
        "bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white",

    success:
        "bg-[var(--success)] hover:bg-[var(--success-hover)] text-white",

    danger:
        "bg-[var(--danger)] hover:opacity-90 text-white",

    secondary:
        "bg-slate-600 hover:bg-slate-700 text-white",

    outline:
        "border border-app bg-surface text-app",

    warning: 
        "bg-[var(--warning)] hover:opacity-90 text-white"
};
  return (
    <button
      type={type}
      className={`rounded-lg px-4 py-2 font-medium transition ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;