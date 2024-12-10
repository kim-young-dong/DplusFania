"use client";
import Link from "next/link";
import Image from "next/image";
import styles from "./styles.module.css";
import Button from "@/components/Button/index";
import useAxiosInstance from "@hooks/useAxiosInstance";
import { useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/context/userContext";

export default function NavBar() {
  const { user, setUser } = useUser();
  const isSignedIn = useMemo(() => !!user, [user]);
  const axios = useAxiosInstance();
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = async () => {
    if (isSignedIn) {
      try {
        await axios.post("/api/auth/signout");
        setUser(null);
        router.push("/");
      } catch (error) {
        console.log("로그아웃 실패");
      }
    } else {
      router.push("/auth/sign-in");
    }
  };

  if (pathname.includes("/auth")) {
    return (
      <nav className={styles.nav_wrapper}>
        <button
          className={styles.back_button}
          onClick={router.back}
          aria-label="뒤로가기"
          role="button"
        ></button>
      </nav>
    );
  } else {
    return (
      <nav className={styles.nav_wrapper}>
        <div className="ml-4">
          <Link href={"/"}>
            <div className="flex items-center gap-2 text-lg font-bold">
              <Image
                src={"/images/logo/logo_black.png"}
                alt={"Dplus Fania Logo"}
                width={50}
                height={50}
                priority
              />
              Dplus Fania
            </div>
          </Link>
        </div>
        <div className="mr-4">
          <Button onClick={handleClick}>
            {isSignedIn ? "로그아웃" : "로그인"}
          </Button>
        </div>
      </nav>
    );
  }
}
