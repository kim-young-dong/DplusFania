"use client";
import { signin } from "../actions";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Input from "@/components/Input";
import Button from "@/components/Button";
import styled from "styled-components";

export default function SignInPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const router = useRouter();

  const handleSignin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsError(false);

    try {
      await signin({ email, password });
    } catch (error) {
      setIsError(true);
    }
  };

  const errorMessage = () => {
    if (isError) {
      return (
        <div className="text-red-500 text-sm text-center">
          아이디 또는 비밀번호가 잘못 되었습니다.
          <br /> 아이디와 비밀번호를 정확히 입력해 주세요.
        </div>
      );
    }
  };
  return (
    <>
      <SignHeader>로그인</SignHeader>
      <form onSubmit={handleSignin} className="w-full">
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
        {errorMessage()}
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
          <Link href={"/auth/sign-up"}>
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
