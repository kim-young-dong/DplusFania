// pages/signup.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/userContext";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Input from "@/components/Input/index";
import Button from "@/components/Button/index";
import InputError from "@/components/Input/InputError";
import useAxiosInstance from "@hooks/useAxiosInstance";

type ChildComponentProps = {
  setSignupComplete: (newState: boolean) => void;
};

const SignupForm: React.FC<ChildComponentProps> = ({ setSignupComplete }) => {
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>("");

  const router = useRouter();
  const axios = useAxiosInstance();
  const { setUser } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = async (formData: any) => {
    try {
      setIsLoad(true);
      const response = await axios.post("/api/auth/signup", formData);
      console.log(response);

      setUser(response.data.user);
      setIsLoad(false);
      setSignupComplete(true);
    } catch (error) {
      console.error(error);
      setErrorText("회원 가입에 실패했습니다.");
      setIsLoad(false);
    }
  };

  return (
    <>
      {isLoad ? (
        <div className="mx-auto mt-12 w-max">
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
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <Input
            label="이메일"
            name="email"
            type="email"
            register={register("email", {
              required: "이메일은 필수입니다.",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "이메일 형식이 아닙니다.",
              },
            })}
          />
          <InputError target={errors.email} />

          <Input
            label="비밀번호"
            name="password"
            type="password"
            register={register("password", {
              required: "비밀번호는 필수입니다.",
              minLength: {
                value: 8,
                message: "비밀번호는 8자 이상이어야 합니다.",
              },
            })}
          />
          <InputError target={errors.password} />

          <Input
            label="비밀번호 확인"
            name="passwordCheck"
            type="password"
            register={register("passwordCheck", {
              required: "비밀번호 확인은 필수입니다.",
              minLength: {
                value: 8,
                message: "비밀번호는 8자 이상이어야 합니다.",
              },
              validate: (value) =>
                value === watch("password") || "비밀번호와 일치하지 않습니다.",
            })}
          />
          <InputError target={errors.passwordCheck} />

          <div className="my-4">
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
            {errorText}
          </div>
        </form>
      )}
    </>
  );
};
const SignupConfirm = () => {
  return (
    <div className="mt-24 flex w-full flex-col items-center gap-12">
      <h2 className="text-center text-xl">
        회원가입이 완료되었습니다. <br /> 이메일 인증을 진행해주세요.
      </h2>
      <Link href={"/"} className="w-full">
        <Button size="lg" fullWidth={true}>
          확인
        </Button>
      </Link>
    </div>
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
        <SignupForm setSignupComplete={setSignupComplete} />
      )}
    </div>
  );
}
