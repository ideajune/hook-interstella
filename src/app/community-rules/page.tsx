import React from "react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "커뮤니티 및 지식재산권(IP) 운영원칙",
};

export default function CommunityRulesPage() {
  return (
    <div className="py-16 lg:py-24 bg-white">
      <div className="container-shell max-w-3xl space-y-8">
        <div className="border-b border-[#E5EAF0] pb-6 space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-[#147FC5]">
            COMMUNITY & INTELLECTUAL PROPERTY RULES · VERSION 1.0
          </p>
          <h1 className="text-3xl font-bold text-[#17212B]">
            SPACE IDEAS 커뮤니티 및 지식재산권(IP) 보호 원칙
          </h1>
        </div>

        <div className="space-y-6 text-sm sm:text-base text-[#17212B] leading-relaxed">
          <section className="p-6 rounded-xl bg-[#E8F4FC] border border-[#147FC5]/30 space-y-3">
            <h2 className="text-lg font-bold text-[#0B2340]">
              핵심 지식재산권(IP) 보호 4대 원칙
            </h2>
            <ol className="list-decimal pl-5 space-y-2 text-[#0B2340]/90 text-sm">
              <li>
                <strong>소유권 불이전:</strong> SPACE IDEAS에 공개 게시물을 등록하더라도
                해당 아이디어의 소유권이나 지식재산권이 HOOK INTERSTELLAR로 자동
                이전되지 않으며, 권리는 작성자에게 유지됩니다.
              </li>
              <li>
                <strong>사업화 및 공동개발 시 별도 계약:</strong> 회사가 등록된 아이디어를
                실제 연구 과제로 평가하거나 공동개발·라이선싱·사업화하고자 할 경우,
                반드시 작성자의 별도 명시적 동의를 구하고 독립된 서면 계약을 체결합니다.
              </li>
              <li>
                <strong>특허 출원 전 공개 주의(신규성 상실 경고):</strong> 공개 게시판에
                발명의 구체적인 기술 구성을 게시하면 공지된 발명이 되어 특허 출원 시
                신규성 상실 사유가 될 수 있습니다. 특허 가능성이 있는 아이디어는 공개
                게시 전 변리사 등 전문가와 상담하시기 바랍니다.
              </li>
              <li>
                <strong>비밀유지(NDA) 미적용:</strong> SPACE IDEAS 공개 게시물은 누구나
                열람 및 검색할 수 있는 공개 정보이며 비밀 제안이나 NDA 보호 대상이
                아닙니다.
              </li>
            </ol>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold">커뮤니티 금지 행위 및 모더레이션 기준</h2>
            <p className="text-[#5D6B78]">
              다음에 해당하는 게시물이나 댓글은 신고 접수 및 관리자 검토를 거쳐
              숨김(Hidden), 반려(Rejected) 또는 삭제(Removed) 처리될 수 있습니다.
            </p>
            <ul className="list-disc pl-5 text-[#5D6B78] space-y-1">
              <li>타인의 특허, 영업비밀, 저작권을 무단 침해하거나 도용한 게시물</li>
              <li>본인 또는 제3자의 민감한 개인정보(주민등록번호, 계좌번호 등)가 포함된 글</li>
              <li>스팸 광고, 투자 사기 유도, 비방·욕설 및 불법 정보</li>
            </ul>
          </section>

          <div className="pt-4">
            <Link
              href="/space-ideas"
              className="px-5 py-3 rounded-lg bg-[#147FC5] text-white text-sm font-semibold inline-block"
            >
              SPACE IDEAS로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
