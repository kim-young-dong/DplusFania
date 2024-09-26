// pages/signup.tsx
"use client";
import { signup } from "@/actions/auth";
import { useState, FormEvent } from "react";
import Link from "next/link";
import Input from "@/components/Input/index";
import Button from "@/components/Button/index";

interface ChildComponentProps {
  onIsCompleteChange: (newState: boolean) => void;
}

const SignupForm: React.FC<ChildComponentProps> = ({ onIsCompleteChange }) => {
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordCheck, setPasswordCheck] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

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

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoad(true);

    if (!validatePassword()) {
      setIsLoad(false);
      return false;
    } else {
      try {
        await signup({ email, password });
      } catch (error) {
        console.log(error);
        setError("회원가입에 실패했습니다.");
      }
      // const response = await fetch("/api/signup", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ email, password }),
      // });

      // const data = await response.json();

      // if (response.ok) {
      //   onIsCompleteChange(true);
      // } else {
      //   setError(data.message);
      // }
    }
    setIsLoad(false);
  };
  return (
    <>
      {isLoad ? (
        <>
          <svg
            className="h-12 w-12 animate-spin text-blue-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </>
      ) : (
        <form onSubmit={handleSignup} className="w-full">
          <Input
            id="email"
            title="이메일 주소"
            handleChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            type="email"
          />
          <Input
            id="password"
            title="비밀번호"
            handleChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
          />
          <Input
            id="passwordCheck"
            title="비밀번호 확인"
            handleChange={(e) => setPasswordCheck(e.target.value)}
            value={passwordCheck}
            type="password"
          />
          <div style={{ margin: "14px 0" }}>
            <Button type="submit" size="lg" fullWidth={true}>
              회원가입
            </Button>
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
      )}
    </>
  );
};
const SignupConfirm = () => {
  return (
    <>
      <div className="flex w-full flex-col items-center gap-12">
        <h2 className="text-center text-xl">
          회원가입이 완료되었습니다. <br /> 이메일 인증을 진행해주세요.
        </h2>
        <Link href={"/"} className="w-full">
          <Button>확인</Button>
        </Link>
      </div>
    </>
  );
};

export default function Signup() {
  const [signupComplete, setSignupComplete] = useState<boolean>(false);

  return (
    <div className="mx-auto max-w-[520px]">
      <div className="flex items-center justify-around">회원가입</div>
      {signupComplete ? (
        <SignupConfirm />
      ) : (
        <SignupForm onIsCompleteChange={setSignupComplete} />
      )}
    </div>
  );
}
