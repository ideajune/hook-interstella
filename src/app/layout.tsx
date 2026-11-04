import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import ScrollToTopButton from "@/components/ScrollToTopButton";

export const metadata: Metadata = {
  title: {
    default: "HOOK INTERSTELLAR | 새로운 우주 시대, 우리만의 항로를 개척하다",
    template: "%s | HOOK INTERSTELLAR",
  },
  description:
    "HOOK INTERSTELLAR 공식 웹사이트. 우주 기술, 우주 생존 솔루션, 인재·교육 커뮤니티, 지식재산(IP) 개발 및 SPACE IDEAS 오픈 이노베이션 플랫폼.",
  openGraph: {
    title: "HOOK INTERSTELLAR — Beyond the Horizon",
    description:
      "새로운 우주 시대, 우리만의 항로를 개척하다. 5대 우주산업 비즈니스 영역과 SPACE IDEAS 참여 플랫폼.",
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="bg-white text-[#17212B] antialiased">
        <Header initialUser={null} />
        <main className="flex-1">{children}</main>
        <Footer />
        <ScrollToTopButton />
      </body>
    </html>
  );
}
