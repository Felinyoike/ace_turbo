import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-aceBlue text-white hover:bg-aceBlueDeep",
  secondary: "border border-[#bfdbfe] bg-[#eff6ff] text-[#334155] hover:bg-[#dbeafe]",
  danger: "border border-red-300 bg-red-50 text-red-700 hover:bg-red-100",
  ghost: "text-[#475569] hover:bg-slate-100"
};

export function Button({
  children,
  className = "",
  variant = "primary",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode; variant?: ButtonVariant }) {
  return (
    <button
      className={`inline-flex min-h-11 items-center justify-center rounded-2xl px-4 py-2 font-black transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
