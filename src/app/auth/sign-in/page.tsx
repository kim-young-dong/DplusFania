"use client";
import { signin } from "@/actions/auth";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/userContext";
import Link from "next/link";
import Input from "@/components/Input";
import Button from "@/components/Button/index";

export default function SignInPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const router = useRouter();
  const { setUser } = useUser();

  const handleSignin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsError(false);

    try {
      const user = await signin({ email, password });
      setUser(user);
      router.push("/");
    } catch (error) {
      setIsError(true);
    }
  };

  const errorMessage = () => {
    if (isError) {
      return (
        <div className="text-center text-sm text-red-500">
          아이디 또는 비밀번호가 잘못 되었습니다.
          <br /> 아이디와 비밀번호를 정확히 입력해 주세요.
        </div>
      );
    }
  };
  return (
    <div className="mx-auto max-w-[520px]">
      <div className="flex items-center justify-around">로그인</div>
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
        <div className="my-4">
          <Button type="submit" fullWidth={true}>
            로그인
          </Button>
        </div>
        <div className="text-center">
          <span className="mr-2" style={{ color: "#373737" }}>
            회원이 아니신가요?
          </span>
          <Link href={"/auth/sign-up"}>
            <span className="font-semibold underline">회원가입</span>
          </Link>
        </div>
      </form>
    </div>
  );
}
