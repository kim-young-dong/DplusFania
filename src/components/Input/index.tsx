"use client";
import styles from "./styles.module.css";

type InputProps = {
  label?: string;
  name: string;
  type: "text" | "password" | "email";
  register: any;
  className?: string;
};

const Input = (
  { label, name, type = "text", register, className }: InputProps,
  ref: InputProps,
) => {
  return (
    <div className="py-3">
      {!!label && (
        <label
          htmlFor={name}
          className="mb-2 block text-gray-700 dark:text-gray-200"
        >
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        ref={ref}
        {...register}
        className={`${styles.input} ${className}`}
      />
    </div>
  );
};

export default Input;
