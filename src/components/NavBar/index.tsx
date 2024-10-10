"use client";
import Link from "next/link";
import Image from "next/image";
import styles from "./styles.module.css";
import Button from "@/components/Button/index";

import { useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/context/userContext";

export default function NavBar() {
  const { user, setUser } = useUser();
  const isSignedIn = useMemo(() => !!user, [user]);
  const pathname = usePathname();
  const router = useRouter();

  const handleCliek = async () => {
    if (isSignedIn) {
      const res = await fetch("/api/auth/signout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.status === 200) {
        setUser(null);
        router.push("/");
      } else {
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
        <div>
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
        <div>
          <Button onClick={handleCliek}>
            {isSignedIn ? "로그아웃" : "로그인"}
          </Button>
        </div>
      </nav>
    );
  }
}
