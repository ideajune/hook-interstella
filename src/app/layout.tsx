import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import ScrollToTopButton from "@/components/ScrollToTopButton";

export const metadata: Metadata = {
  metadataBase: new URL("https://hook-interstellar.vercel.app"),
  title: {
    default: "HOOK INTERSTELLAR | 새로운 우주 시대, 우리만의 항로를 개척하다",
    template: "%s | HOOK INTERSTELLAR",
  },
  description:
    "후크인터스텔라(주) 공식 웹사이트. 우주·고고도 접근 기술, 극한환경 생존 솔루션, 인재·교육 커뮤니티 및 SPACE IDEAS 오픈 이노베이션 플랫폼.",
  openGraph: {
    title: "HOOK INTERSTELLAR | 새로운 우주 시대, 우리만의 항로를 개척하다",
    description:
      "우주·고고도 접근 기술, 극한환경 생존 솔루션, 인재·교육 및 SPACE IDEAS 오픈 이노베이션 플랫폼",
    url: "https://hook-interstellar.vercel.app",
    siteName: "HOOK INTERSTELLAR",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "HOOK INTERSTELLAR — 새로운 우주 시대, 우리만의 항로를 개척하다.",
      },
    ],
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "HOOK INTERSTELLAR | 새로운 우주 시대, 우리만의 항로를 개척하다",
    description:
      "우주·고고도 접근 기술, 극한환경 생존 솔루션, 인재·교육 및 SPACE IDEAS 오픈 이노베이션 플랫폼",
    images: ["/images/og-image.png"],
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
