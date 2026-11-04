import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "개인정보처리방침 (Privacy Policy)",
};

export default function PrivacyPage() {
  return (
    <div className="py-16 lg:py-24 bg-white">
      <div className="container-shell max-w-3xl space-y-8">
        <div className="border-b border-[#E5EAF0] pb-6 space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-[#147FC5]">
            PRIVACY POLICY · VERSION 1.0 (2026-10-08)
          </p>
          <h1 className="text-3xl font-bold text-[#17212B]">개인정보처리방침</h1>
        </div>

        <div className="space-y-6 text-sm sm:text-base text-[#17212B] leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold">1. 개인정보의 수집 항목 및 최소 수집 원칙</h2>
            <p className="text-[#5D6B78]">
              HOOK INTERSTELLAR는 서비스 제공, 커뮤니티 운영, 파트너십 및 일반 문의
              응대에 필요한 최소한의 개인정보만을 수집합니다.
            </p>
            <ul className="list-disc pl-5 text-[#5D6B78] space-y-1">
              <li>
                <strong>회원 가입 및 SPACE IDEAS 참여 시:</strong> 이메일 주소, 표시
                이름(닉네임), 비밀번호 해시, 소속(선택), 약관 동의 버전 및 시각
              </li>
              <li>
                <strong>PARTNERSHIP 및 CONTACT 문의 시:</strong> 성함, 소속 기관명,
                이메일 주소, 연락처(선택), 문의 내용
              </li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold">2. 공개 표시 이름과 비공개 계정 정보의 분리</h2>
            <p className="text-[#5D6B78]">
              SPACE IDEAS 게시물 또는 댓글 작성 시 사용자가 ‘익명 표시’를 선택할 경우,
              대중에게 노출되는 화면과 공개 API에는 계정 식별자나 실명이 노출되지 않으며
              ‘익명 참여자’로만 표시됩니다. 단, 법령 위반이나 권리 침해 대응을 위해
              내부 서버에는 작성자 계정이 안전하게 기록됩니다.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold">3. 필수 동의와 선택 동의의 분리</h2>
            <p className="text-[#5D6B78]">
              커뮤니티 이용 및 개인정보 처리에 관한 필수 동의와, 향후 아이디어 후속
              논의를 위한 연락 수신 동의(선택)는 별도의 체크박스로 분리하여 수집합니다.
              선택 항목에 동의하지 않아도 아이디어 게시 및 서비스 이용이 가능합니다.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold">4. 보관 기간 및 파기 요청</h2>
            <p className="text-[#5D6B78]">
              수집된 정보는 목적 달성 시 또는 회원의 계정/게시물 삭제 요청 시 관련
              법령에 따른 보존 의무가 없는 한 지체 없이 파기됩니다. 관련 요청은 CONTACT
              페이지의 ‘웹사이트 및 개인정보 관련 문의’를 통해 접수하실 수 있습니다.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
