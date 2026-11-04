import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "이용약관 (Terms of Use)",
};

export default function TermsPage() {
  return (
    <div className="py-16 lg:py-24 bg-white">
      <div className="container-shell max-w-3xl space-y-8">
        <div className="border-b border-[#E5EAF0] pb-6 space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-[#147FC5]">
            TERMS OF USE · VERSION 1.0 (2026-10-08)
          </p>
          <h1 className="text-3xl font-bold text-[#17212B]">웹사이트 이용약관</h1>
        </div>

        <div className="space-y-6 text-sm sm:text-base text-[#17212B] leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold">제1조 (목적)</h2>
            <p className="text-[#5D6B78]">
              본 약관은 HOOK INTERSTELLAR 공식 웹사이트 및 SPACE IDEAS 플랫폼이 제공하는
              정보, 커뮤니티, 문의 서비스의 이용 조건과 권리·의무 관계를 규정합니다.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold">제2조 (정보의 성격 및 사실 고지)</h2>
            <p className="text-[#5D6B78]">
              본 웹사이트에 소개된 세부 사업 및 기술 연구 주제는 현재 상용 운영 중인
              활동과 연구·구상 단계의 계획을 구분하여 표시합니다. 웹사이트의 어떠한
              내용도 증권 매수 권유, 투자 수익 보장, 또는 법률·특허 자문을 구성하지
              않습니다.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold">제3조 (저작권 및 게시물 권리)</h2>
            <p className="text-[#5D6B78]">
              웹사이트의 공식 브랜드 콘텐츠 및 텍스트의 저작권은 후크인터스텔라(주)에
              있습니다. 사용자가 SPACE IDEAS에 등록한 게시물의 지식재산권은 작성자
              본인에게 귀속됩니다.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
