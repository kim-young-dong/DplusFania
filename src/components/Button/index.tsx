"use client";
import classNames from "classnames";
import styles from "./styles.module.css";

interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  color?: string;
  size?: string;
  fullWidth?: boolean;
  disable?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
  style?: Record<string, string>;
}

const Button = ({
  children,
  type = "button",
  onClick,
  color = "primary",
  size = "md",
  fullWidth = false,
  disable = false,
  className,
}: ButtonProps) => {
  const buttonClass = classNames(
    `bg-${color}`,
    `btn-${size}`,
    fullWidth && styles.fullWidth,
    disable && "disable",
    className,
  );
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.button} ${buttonClass}`}
    >
      {children}
    </button>
  );
};
export default Button;
