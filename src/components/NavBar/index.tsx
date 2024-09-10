"use client";
import Link from "next/link";
import styles from "./styles.module.css";
import styled from "styled-components";
import Button from "../Button";
import { signout } from "@/actions/auth";

const NavBar = () => {
  const handleSignOut = async () => {
    await signout();
  };

  return (
    <nav className={styles.nav_wrapper}>
      <ul className={styles.nav_list}>
        <li>
          <Link href={"/"}>
            <div>Logo</div>
          </Link>
        </li>
        <li>
          <Button onClick={handleSignOut}>로그아웃</Button>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;

const Wrapper = styled.nav`
  position: fixed;

  @media (min-width: 640px) {
    top: 0;
    left: 0;
  }

  @media (max-width: 640px) {
    bottom: 0;
  }

  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 50px;
  padding: 0 8px;

  background-color: #000;
  color: #fff;

  border: none;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  box-sizing: border-box;
`;
const NabItems = styled.ul`
  display: flex;
  align-items: center;
  gap: 5px;

  height: 100%;

  li {
    width: 100%;
    height: 100%;
    padding: 0 4px;

    a {
      display: flex;
      justify-content: center;
      align-items: center;

      height: 100%;
    }
  }
`;
