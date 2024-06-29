"use client";
import Input from "@/components/Input";
import Button from "@/components/Button";
// import Description from "../../common/components/description";
import styled from "styled-components";

export default function SignInPage() {
  return (
    <>
      <SignHeader>로그인</SignHeader>
      <div style={{ padding: "0 16px" }}>
        {/* <Description
          title="안녕하세요!"
          context="회원이신가요? 아래의 내용을 기입하고 로그인해주세요."
        /> */}
        <Input
          id="email"
          title="이메일 주소"
          onChange={() => {
            console.log("test");
          }}
          value="test"
          type="email"
          errorMessage="text"
        />
        <Input
          id="password"
          title="비밀번호"
          onChange={() => {
            console.log("test");
          }}
          value="test"
          type="password"
          errorMessage="text"
        />
        <div style={{ margin: "14px 0" }}>
          <Button>로그인</Button>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#373737",
            fontSize: "10px",
            lineHeight: "14px",
            gap: "4px",
          }}
        >
          <span style={{ color: "#373737" }}>회원이 아니신가요?</span>
          <span style={{ color: "#1E90FF", textDecoration: "underline" }}>
            회원가입
          </span>
        </div>
      </div>
    </>
  );
}

const SignHeader = styled.div`
  display: flex;
  justify-content: space-around;

  width: 100%;
  height: 84px;
  border-radius: 0 0 16px 16px;

  box-sizing: border-box;
`;
