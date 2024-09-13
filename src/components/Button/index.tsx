"use client";
import styled from "styled-components";

interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  active?: boolean;
  className?: string;
  style?: Record<string, string>;
}

const Button = ({
  children,
  type,
  onClick,
  active = false,
  className,
  style,
}: ButtonProps) => {
  return (
    <Wrapper onClick={onClick} className={className} style={style} type={type}>
      {children}
    </Wrapper>
  );
};
export default Button;

const Wrapper = styled.button`
  background-color: #1e90ff;

  align-content: center;

  color: #ffffff;

  height: 44px;
  padding: 0 16px;
  border: none;
  border-radius: 4px;
  box-sizing: border-box;
`;
