"use client";
import styled from "styled-components";

interface InputProps {
  id: string;
  title: string;
  value: string | number;
  onChange: () => void;
  type: "text" | "password" | "email";
  errorMessage: string;
  className?: string;
  style?: Record<string, string>;
}

const Input = ({
  id,
  title,
  value,
  onChange,
  type,
  errorMessage,
  className,
  style,
}: InputProps) => {
  return (
    <Wrapper>
      {!!title && <Label>{title}</Label>}
      <TextInput id={id} value={value} onChange={onChange} type={type} />
      <ErrorMessage>{errorMessage}</ErrorMessage>
    </Wrapper>
  );
};

export default Input;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 0;
`;

const Label = styled.label`
  color: #373737;
  margin-bottom: 4px;
`;

const TextInput = styled.input`
  background-color: #f7f7f7;
  width: 100%;

  color: #373737;

  border: 1px solid #373737;
  border-radius: 4px;
  padding: 13px 0 13px 16px;
  margin: 4px 0;
  box-sizing: border-box;
`;

const ErrorMessage = styled.span`
  color: #d80000;
`;
