// pages/signup.tsx
"use client";
import { useState, FormEvent } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import styled from "styled-components";

export default function Signup() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordCheck, setPasswordCheck] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const validatePassword = (): boolean => {
    const hasLetter = /[a-zA-Z]/.test(password); // 비밀번호에 문자가 있는지 확인
    const hasNumber = /\d/.test(password); // 비밀번호에 숫자가 있는지 확인
    const validLength = password.length >= 8; // 비밀번호가 8자 이상인지 확인
    const passwordMatch = password === passwordCheck; // 비밀번호와 비밀번호 확인이 일치하는지 확인
    switch (false) {
      case !!password:
        setError("비밀번호를 입력해주세요.");
        return false;
      case validLength:
        setError("비밀번호를 8자 이상 입력해주세요.");
        return false;
      case passwordMatch:
        setError("비밀번호가 일치하지 않습니다.");
        return false;
      case hasLetter:
        setError("비밀번호에 문자를 포함해주세요.");
        return false;
      case hasNumber:
        setError("비밀번호에 숫자를 포함해주세요.");
        return false;
      default:
        return true;
    }
  };

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage("");

    if (!validatePassword()) {
      return false;
    } else {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      console.log(response);

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
      } else {
        setError(data.error);
      }
    }
  };

  return (
    <div>
      <SignHeader>회원가입</SignHeader>
      <form onSubmit={handleSignup} style={{ padding: "0 16px" }}>
        <Input
          id="email"
          title="이메일 주소"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
          type="email"
          errorMessage="text"
        />
        <Input
          id="password"
          title="비밀번호"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          errorMessage="text"
        />
        <Input
          id="passwordCheck"
          title="비밀번호 확인"
          onChange={(e) => setPasswordCheck(e.target.value)}
          value={passwordCheck}
          type="password"
          errorMessage="text"
        />
        <div style={{ margin: "14px 0" }}>
          <Button type="submit">회원가입</Button>
        </div>
        <div
          style={{
            color: "red",
            fontSize: "14px",
            textAlign: "center",
          }}
        >
          {error}
        </div>
      </form>
    </div>
  );
}
const SignHeader = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  width: 100%;
  height: 84px;
  border-radius: 0 0 16px 16px;

  box-sizing: border-box;
`;
