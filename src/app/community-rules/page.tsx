import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Award, Fingerprint, GitBranch, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "SPACE IDEAS 안티-특허(방어적 공개) 및 지식재산권(IP) 운영원칙",
};

export default function CommunityRulesPage() {
  return (
    <div className="py-16 lg:py-24 bg-white">
      <div className="container-shell max-w-3xl space-y-10">
        <div className="border-b border-[#E5EAF0] pb-6 space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-[#147FC5]">
            HOOKSUM PRIOR ART &amp; IP RULES · VERSION 1.1
          </p>
          <h1 className="text-3xl font-bold text-[#17212B]">
            SPACE IDEAS 안티-특허(방어적 공개) 철학 및 IP 운영원칙
          </h1>
          <p className="text-sm sm:text-base text-[#5D6B78] leading-relaxed">
            &ldquo;아이디어를 가두지 말고 세상에 먼저 박제하라.&rdquo; 후크인터스텔라의
            SPACE IDEAS는 『훅섬(Hooksum)』의 안티-특허(Anti-Patent) 철학을 바탕으로
            개인과 소규모 연구자의 창의성을 거대 자본의 특허 독점으로부터 지키는 오픈
            아카이브입니다.
          </p>
        </div>

        {/* 3 Core Pillars from Hooksum */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl bg-[#07182D] text-white space-y-2">
            <Fingerprint className="w-5 h-5 text-[#5CC3FF]" />
            <h2 className="text-sm font-bold">선행기술 타임스탬프 박제</h2>
            <p className="text-xs text-[#D9E6F2]/80 leading-relaxed">
              공개 등록 즉시 박제 고유 번호와 SHA-256 해시를 부여해 제3자가 동일
              아이디어로 독점 특허를 등록하지 못하도록 방어합니다.
            </p>
          </div>
          <div className="p-5 rounded-xl bg-[#07182D] text-white space-y-2">
            <Award className="w-5 h-5 text-[#5CC3FF]" />
            <h2 className="text-sm font-bold">원작자 명예 증명</h2>
            <p className="text-xs text-[#D9E6F2]/80 leading-relaxed">
              배타적 독점 대신 &lsquo;이 아이디어의 명예로운 시작점&rsquo;임을 공식
              확인하는 원작자 명예 증명서를 발급합니다.
            </p>
          </div>
          <div className="p-5 rounded-xl bg-[#07182D] text-white space-y-2">
            <GitBranch className="w-5 h-5 text-[#5CC3FF]" />
            <h2 className="text-sm font-bold">창작 족보 훅체인</h2>
            <p className="text-xs text-[#D9E6F2]/80 leading-relaxed">
              원본(제네시스 훅)에서 파생된 2차·3차 개선 아이디어를 투명하게 연결해
              집단 지성의 기여 내역을 보존합니다.
            </p>
          </div>
        </section>

        <div className="space-y-6 text-sm sm:text-base text-[#17212B] leading-relaxed">
          <section className="p-6 rounded-xl bg-[#E8F4FC] border border-[#147FC5]/30 space-y-3">
            <h2 className="text-lg font-bold text-[#0B2340] flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#147FC5]" />
              <span>핵심 지식재산권(IP) 및 방어적 공개 4대 원칙</span>
            </h2>
            <ol className="list-decimal pl-5 space-y-2.5 text-[#0B2340]/90 text-sm">
              <li>
                <strong>소유권 불이전 및 원작자 명예 존중:</strong> SPACE IDEAS에
                아이디어를 박제하더라도 해당 아이디어의 지식재산권이 HOOK
                INTERSTELLAR로 자동 이전되지 않으며, 원작자의 지위와 명예는 작성자에게
                영구히 기록됩니다.
              </li>
              <li>
                <strong>방어적 공개(Defensive Publication) 효력:</strong> 공개 박제된
                기술 구성은 공지된 선행기술(Prior Art)이 되어, 이후 제3자나 특허
                트롤이 동일·유사 개념으로 독점 특허를 출원하더라도 신규성 상실 사유로
                방어·무효화할 수 있는 근거가 됩니다.
              </li>
              <li>
                <strong>직접 특허 출원 희망 시 선택 가이드:</strong> 모든 아이디어가
                공개 박제 길을 따라야 하는 것은 아닙니다. 작성자 본인이 막대한 투자를
                통해 <strong>직접 배타적 특허권을 출원·보유하려는 핵심 기밀</strong>은
                공개 박제 대신{" "}
                <Link href="/contact" className="font-bold underline">
                  비공개 협력 문의
                </Link>
                나 변리사 상담을 먼저 이용하시기 바랍니다.
              </li>
              <li>
                <strong>사업화 및 훅체인 공동개발 시 별도 계약:</strong> 회사가 박제된
                아이디어 또는 특정 훅체인(Hook Chain) 계보를 실제 R&amp;D 과제로
                사업화하고자 할 경우, 원작자 및 주요 기여자의 명시적 동의를 거쳐
                독립된 서면 계약을 체결합니다.
              </li>
            </ol>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold">
              커뮤니티 금지 행위 및 무결성 유지 기준
            </h2>
            <p className="text-[#5D6B78]">
              박제 아카이브와 훅체인 생태계의 신뢰도를 지키기 위해 다음에 해당하는
              게시물이나 댓글은 신고 접수 및 관리자 검토를 거쳐 숨김(Hidden) 또는
              삭제(Removed) 처리됩니다.
            </p>
            <ul className="list-disc pl-5 text-[#5D6B78] space-y-1 text-sm">
              <li>
                타인의 미공개 영업비밀, 기존 특허·저작권을 무단 도용하여 본인 창작물로
                허위 박제한 게시물
              </li>
              <li>
                본인 또는 제3자의 민감한 개인정보(주민등록번호, 계좌번호 등)가 포함된 글
              </li>
              <li>
                무분별한 스팸성 훅체인 연결, 광고, 투자 사기 유도 및 비방·욕설
              </li>
            </ul>
          </section>

          <div className="pt-4 flex flex-wrap gap-3">
            <Link
              href="/space-ideas"
              className="px-5 py-3 rounded-lg bg-[#147FC5] hover:bg-[#2998D6] text-white text-sm font-semibold inline-block"
            >
              SPACE IDEAS 박제소로 돌아가기
            </Link>
            <Link
              href="/space-ideas/submit"
              className="px-5 py-3 rounded-lg border border-[#E5EAF0] text-[#17212B] text-sm font-semibold inline-block"
            >
              새 아이디어 박제하기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
