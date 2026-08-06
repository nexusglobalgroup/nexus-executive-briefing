import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
  "aria-label"?: string;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  disabled,
  type = "button",
  className = "",
  "aria-label": ariaLabel
}: ButtonProps) {
  const cls = `btn btn-${variant} btn-${size} ${className}`.trim();
  if (href) {
    return (
      <a href={href} className={cls} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }
  return (
    <button
      type={type}
      className={cls}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
