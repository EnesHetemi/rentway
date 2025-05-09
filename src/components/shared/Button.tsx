import { ReactNode } from "react";
import classNames from "classnames";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger";
  children?: ReactNode;
  className?: string;
}

export default function Button({
  text,
  onClick,
  variant = "primary",
  className,
  children,
}: ButtonProps) {
  const baseStyles =
    "px-6 py-3 rounded-xl font-medium transition-all duration-200";
  const variantStyles =
    variant === "primary"
      ? "bg-blue-300 text-gray-900 hover:bg-blue-400"
      : variant === "danger"
      ? "bg-red-400 text-white hover:bg-red-500"
      : "bg-white border border-gray-400 text-gray-800 hover:bg-gray-100";

  return (
    <button
      onClick={onClick}
      className={classNames(baseStyles, variantStyles, className)}
    >
      {text}
      {children}
    </button>
  );
}