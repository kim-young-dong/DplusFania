"use client";
import { useUser } from "@/context/userContext";

export default function Description() {
  const { user } = useUser();

  return (
    <>
      {user ? (
        <h1 className="mb-4 text-3xl font-bold">오늘의 카드</h1>
      ) : (
        <p className="mb-4 text-sm">카드를 클릭해보세요</p>
      )}
    </>
  );
}
