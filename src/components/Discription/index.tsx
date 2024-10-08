"use client";
import { useUser } from "@/context/userContext";

export default function Description() {
  const { user } = useUser();

  return (
    <>
      {user ? (
        <h1 className="text-3xl font-bold">오늘의 카드</h1>
      ) : (
        <div>
          <h1 className="text-xl font-bold">
            내가 바로
            <br /> DplusKIA Fan 이야!
          </h1>
          <p className="text-sm">카드를 클릭해보세요</p>
          {/* <div className="flex w-full flex-col items-center justify-center gap-8">
            <p className="text-md">
              자신이 뽑은 카드를
              <br /> 컬렉션에 추가해보세요!
            </p>
          </div> */}
        </div>
      )}
    </>
  );
}
