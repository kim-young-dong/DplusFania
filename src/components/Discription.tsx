import Link from "next/link";
import Button from "@/components/Button";

export default function Description({
  isSignedIn = false,
}: {
  isSignedIn: boolean;
}) {
  const HeaderText = () => {
    return (
      <>
        {isSignedIn ? (
          "오늘의 카드"
        ) : (
          <>
            Welcome to
            <br /> Dplus Fania
          </>
        )}
      </>
    );
  };
  return (
    <>
      <div className="w-full flex flex-col items-center gap-4 text-center">
        <h1 className="text-3xl font-bold">{HeaderText()}</h1>
        {!isSignedIn && (
          <div className="w-full flex flex-col justify-center items-center gap-8">
            <p className="text-xl">
              자신이 뽑은 카드를
              <br /> 컬렉션에 추가해보세요!
            </p>
            <Link href={"/sign-in"} className="w-full">
              <Button>로그인</Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
