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

export default function SignInPage() {
  const [isError, setIsError] = useState<boolean>(false);

  const router = useRouter();
  const axios = useAxiosInstance();
  const { setUser } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData: any) => {
    try {
      const response = await axios.post("/api/auth/signin", formData);
      setUser(response.data.user);
      // 로그인 성공 시 대시보드로 리디렉션
      router.push("/");
    } catch (error) {
      console.error(error);
      setIsError(true);
    }
  };

  return (
    <>
      <main className="flex min-w-80 flex-grow items-center justify-center">
        <div className="w-full max-w-md rounded-lg border border-gray-200 p-8 dark:border-0 dark:bg-gray-600">
          <div className="py-4 text-center">
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
              로그인
            </h2>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
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

            {isError && (
              <div className="mt-4 text-left text-sm text-red-500">
                아이디 또는 비밀번호가 일치하지 않습니다.
              </div>
            )}
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
      </main>
    </>
  );
}

// export default function SignInPage() {
//   const [signinData, setSigninData] = useState<{
//     email: string;
//     password: string;
//   }>({
//     email: "",
//     password: "",
//   });
//   const [isError, setIsError] = useState<boolean>(false);

//   const router = useRouter();
//   const { setUser } = useUser();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const res = await fetch("/api/auth/signin", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(signinData),
//     });

//     if (res.status === 200) {
//       const data = await res.json();
//       setUser(data.user);
//       // 로그인 성공 시 대시보드로 리디렉션
//       router.push("/");
//     } else {
//       setIsError(true);
//     }
//   };
//   return (
//     <div className="mx-auto max-w-[520px]">
//       <div className="flex items-center justify-around">로그인</div>
//       <form onSubmit={handleSubmit} className="w-full">
//         <Input
//           id="email"
//           title="이메일 주소"
//           handleChange={(e) => {
//             setSigninData({ ...signinData, email: e.target.value });
//           }}
//           value={signinData.email}
//           type="email"
//         />
//         <Input
//           id="password"
//           title="비밀번호"
//           handleChange={(e) =>
//             setSigninData({ ...signinData, password: e.target.value })
//           }
//           value={signinData.password}
//           type="password"
//         />
//         {isError && (
//           <div className="text-left text-sm text-red-500">
//             Invalid email or password
//           </div>
//         )}
//         <div className="my-4">
//           <Button type="submit" size="lg" fullWidth={true}>
//             로그인
//           </Button>
//         </div>

//         <div className="text-center">
//           <span className="mr-2" style={{ color: "#373737" }}>
//             회원이 아니신가요?
//           </span>
//           <Link href={"/auth/sign-up"}>
//             <span className="font-semibold underline">회원가입</span>
//           </Link>
//         </div>
//       </form>
//     </div>
//   );
// }
