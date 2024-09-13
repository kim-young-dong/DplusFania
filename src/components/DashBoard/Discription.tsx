"use client";
import { useUser } from "@/context/userContext";

export default function Description() {
  const { user } = useUser();

  return (
    <>
      {user ? (
        <h1 className="text-3xl font-bold">오늘의 카드</h1>
      ) : (
        <>
          <h1 className="text-3xl font-bold">
            Welcome to <br /> Dplus Fania
          </h1>
          <div className="flex w-full flex-col items-center justify-center gap-8">
            <p className="text-xl">
              자신이 뽑은 카드를
              <br /> 컬렉션에 추가해보세요!
            </p>
          </div>
        </>
      )}
    </>
  );
}
