"use client";
import Link from "next/link";
import Image from "next/image";
import styles from "./styles.module.css";
import Button from "../Button";

import { useEffect, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/context/userContext";
import { signout } from "@/actions/auth";

export default function NavBar() {
  const { user, setUser } = useUser();
  const isSignedIn = useMemo(() => !!user, [user]);
  const pathname = usePathname();
  const router = useRouter();

  const handleCliek = async () => {
    if (isSignedIn) {
      setUser(null);
      await signout();
      router.push("/");
    } else {
      console.log("로그인 페이지로 이동");

      router.push("/auth/sign-in");
    }
  };

  if (pathname.includes("/auth")) {
    return null;
  } else {
    return (
      <nav className={styles.nav_wrapper}>
        <ul className={styles.nav_list}>
          <li>
            <Link href={"/auth/sign-in"}>
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
          </li>
          <li>
            <Button onClick={handleCliek}>
              {isSignedIn ? "로그아웃" : "로그인"}
            </Button>
          </li>
        </ul>
      </nav>
    );
  }
}
