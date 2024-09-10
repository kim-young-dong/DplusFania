import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StyledComponentsRegistry from "./lib/registry";
import NavBar from "@/components/NavBar/index";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dplus Fania",
  description:
    "디플러스기아의 팬으로서 다른 팬 분들과 즐길 수 있는 공간을 만들고자 하는 목적으로 만들어진 사이트입니다.",
  keywords: [
    "Dplus Fania",
    "디플러스기아",
    "딮기",
    "팬사이트",
    "포토카드",
    "뽑기",
    "포카뽑기",
    "포카",
  ],
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <NavBar />
          <div className="mt-[50px] flex justify-center">
            <main className="min-w-[340px] lg:p-12 p-4 pb-12 flex flex-col items-center gap-4 ">
              {children}
            </main>
          </div>
        </StyledComponentsRegistry>
        {/* <Provider store={store}>
        </Provider> */}
      </body>
    </html>
  );
}
