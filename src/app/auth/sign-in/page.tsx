"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/userContext";
import Link from "next/link";
import Input from "@/components/Input/index";
import Button from "@/components/Button/index";

export default function SignInPage() {
  const [signinData, setSigninData] = useState<{
    email: string;
    password: string;
    isKeep: boolean;
  }>({
    email: "",
    password: "",
    isKeep: false,
  });
  const [isError, setIsError] = useState<boolean>(false);

  const router = useRouter();
  const { setUser } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signinData),
    });

    if (res.status === 200) {
      const data = await res.json();
      setUser(data.user);
      // 로그인 성공 시 대시보드로 리디렉션
      router.push("/");
    } else {
      setIsError(true);
    }
  };
  return (
    <div className="mx-auto max-w-[520px]">
      <div className="flex items-center justify-around">로그인</div>
      <form onSubmit={handleSubmit} className="w-full">
        <Input
          id="email"
          title="이메일 주소"
          handleChange={(e) => {
            setSigninData({ ...signinData, email: e.target.value });
          }}
          value={signinData.email}
          type="email"
        />
        <Input
          id="password"
          title="비밀번호"
          handleChange={(e) =>
            setSigninData({ ...signinData, password: e.target.value })
          }
          value={signinData.password}
          type="password"
        />
        {isError && (
          <div className="text-left text-sm text-red-500">
            Invalid email or password
          </div>
        )}
        <div className="me-4 flex items-center">
          <input
            id="red-checkbox"
            type="checkbox"
            className="h-4 w-4"
            onChange={(e) =>
              setSigninData({ ...signinData, isKeep: e.target.checked })
            }
          />
          <label
            htmlFor="red-checkbox"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            로그인 상태 유지
          </label>
        </div>
        <div className="my-4">
          <Button type="submit" size="lg" fullWidth={true}>
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
