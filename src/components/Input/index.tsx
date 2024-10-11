"use client";
import styles from "./styles.module.css";

type InputProps = {
  id: string;
  title: string;
  value: string | number;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: "text" | "password" | "email";
  className?: string;
};

const Input = ({
  id,
  title,
  value,
  handleChange,
  type,
  className,
}: InputProps) => {
  return (
    <div className="py-3">
      {!!title && <label htmlFor={id}>{title}</label>}
      <input
        id={id}
        type={type}
        value={value}
        onChange={handleChange}
        className={`${styles.input} ${className}`}
      />
    </div>
  );
};

export default Input;
