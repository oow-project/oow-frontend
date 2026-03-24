import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "light";
type ButtonSize = "sm" | "md";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  children: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-oow-orange text-oow-on-orange",
  secondary: "bg-oow-navy-600 text-oow-white border border-oow-gray/30 hover:opacity-80",
  ghost: "text-oow-gray hover:bg-oow-navy-600 hover:text-oow-white",
  light: "bg-white text-gray-800",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-2 py-1.5 text-xs md:px-4 md:py-2 md:text-sm",
  md: "px-4 py-2 text-sm",
};

export const Button = ({
  variant = "primary",
  size = "md",
  className = "",
  isLoading = false,
  children,
  ...rest
}: ButtonProps) => (
  <button
    type="button"
    {...rest}
    disabled={rest.disabled || isLoading}
    className={`
      inline-flex items-center justify-center gap-1
      rounded font-medium cursor-pointer
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oow-orange focus-visible:ring-offset-2 focus-visible:ring-offset-oow-navy-900
      disabled:opacity-50 disabled:cursor-not-allowed
      ${variantStyles[variant]}
      ${sizeStyles[size]}
      ${className}
    `}
  >
    {isLoading ? (
      <>
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        <span>{children}</span>
      </>
    ) : (
      children
    )}
  </button>
);
