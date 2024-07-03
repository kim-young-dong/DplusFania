"use client";
import { useState, FormEvent } from "react";
import Link from "next/link";
import Input from "@/components/Input";
import Button from "@/components/Button";
import styled from "styled-components";

export default function SignInPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleSignin = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage("");

    const response = await fetch("/api/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();

    // const data = await response.json();

    // if (response.ok) {
    //   setMessage(data.message);
    // } else {
    //   setError(data.error);
    // }
  };
  return (
    <>
      <SignHeader>로그인</SignHeader>
      <form onSubmit={handleSignin} style={{ padding: "0 16px" }}>
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
        <div style={{ margin: "14px 0" }}>
          <Button type="submit">로그인</Button>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#373737",
            fontSize: "10px",
            lineHeight: "14px",
            gap: "4px",
          }}
        >
          <span style={{ color: "#373737" }}>회원이 아니신가요?</span>
          <Link href={"/sign-up"}>
            <span style={{ color: "#1E90FF", textDecoration: "underline" }}>
              회원가입
            </span>
          </Link>
        </div>
      </form>
    </>
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
