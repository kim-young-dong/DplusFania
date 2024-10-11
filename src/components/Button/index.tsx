"use client";
import cn from "classnames";
import styles from "./styles.module.css";

type ButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  color?: string;
  size?: string;
  fullWidth?: boolean;
  disable?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
  style?: Record<string, string>;
};

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
  const classes = (() => {
    const btnColor = `bg-${color}`;
    const btnSize = (() => {
      switch (size) {
        case "sm":
          return "px-2 py-1 text-sm";
        case "lg":
          return "px-6 py-3 text-md";
        default:
          return "px-4 py-2 text-sm";
      }
    })();

    return cn(
      styles.button,
      btnColor,
      btnSize,
      { "w-full justify-center": fullWidth, disable: disable },
      className,
    );
  })();

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
};
export default Button;
