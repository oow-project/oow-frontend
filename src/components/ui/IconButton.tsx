import type { ButtonHTMLAttributes, ReactNode } from "react";

type IconButtonVariant = "ghost" | "secondary";
type IconButtonSize = "sm" | "md";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  children: ReactNode;
}

const variantStyles: Record<IconButtonVariant, string> = {
  ghost: "text-oow-gray hover:bg-oow-navy-600 hover:text-oow-white",
  secondary: "bg-oow-navy-600 text-oow-gray hover:opacity-80",
};

const sizeStyles: Record<IconButtonSize, string> = {
  sm: "p-1",
  md: "p-1.5",
};

export const IconButton = ({
  variant = "ghost",
  size = "md",
  className = "",
  children,
  ...rest
}: IconButtonProps) => (
  <button
    type="button"
    {...rest}
    className={`
      inline-flex items-center justify-center
      rounded cursor-pointer
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oow-orange
      disabled:opacity-50 disabled:cursor-not-allowed
      ${variantStyles[variant]}
      ${sizeStyles[size]}
      ${className}
    `}
  >
    {children}
  </button>
);
