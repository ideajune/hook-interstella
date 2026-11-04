import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Users,
  GraduationCap,
  Microscope,
  Building2,
  Globe,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "ECOSYSTEM — 우주산업 생태계 및 참여 경로",
  description:
    "우주산업 인재, 교육 및 체험, 연구자 및 전문가, 기업·기관 협력, 글로벌 네트워크가 연결되는 HOOK INTERSTELLAR 생태계를 안내합니다.",
};

export default function EcosystemPage() {
  const pillars = [
    {
      icon: <Users className="w-6 h-6 text-[#147FC5]" />,
      title: "1. 우주산업 인재 (Space Industry Talent)",
      target: "엔지니어 · 디자이너 · 기획자 · 창작자",
      description:
        "학벌이나 정형화된 스펙보다 극한 문제 해결력과 도전 정신을 가진 인재들이 모이는 커뮤니티를 지향합니다. 향후 공유주거(코리빙 베이스캠프) 구상과 프로젝트 단위의 유연한 협업을 통해 새로운 우주 인재 네트워크를 형성합니다.",
      actionLabel: "인재 교류 및 문의하기",
      actionHref: "/contact?type=talent",
    },
    {
      icon: <GraduationCap className="w-6 h-6 text-[#147FC5]" />,
      title: "2. 교육 및 체험 (Education & Experience)",
      target: "학생 · 교육기관 · 과학 문화 대중",
      description:
        "출판물과 과학 콘텐츠를 통해 우주와 생존 과학의 원리를 알기 쉽게 전달합니다. 고고도 과학 실험 키트와 극한환경 생존 교육 프로그램 기획을 통해 이론을 넘어선 체험형 학습 기회를 넓혀갑니다.",
      actionLabel: "교육·콘텐츠 협력 제안",
      actionHref: "/partnership?category=Education",
    },
    {
      icon: <Microscope className="w-6 h-6 text-[#147FC5]" />,
      title: "3. 연구자 및 전문가 (Researchers & Experts)",
      target: "대학 연구실 · 과학자 · 분야별 엔지니어",
      description:
        "성층권 관측·측정 실험, 생체시료 보존, 폐쇄형 생태계 제어, 특수 단열 소재 등 다학제 연구 주제를 중심으로 연구자들과 열린 기술 논의를 진행합니다.",
      actionLabel: "기술 주제 살펴보기",
      actionHref: "/technology",
    },
    {
      icon: <Building2 className="w-6 h-6 text-[#147FC5]" />,
      title: "4. 기업 및 기관 협력 (Corporate & Institutional)",
      target: "소재·식품·장비 제조사 · 연구기관",
      description:
        "보유 기술을 우주 및 지상 재난 대응 시장(Dual-Use)으로 확장하고자 하는 기업들과 공동 R&D 기획, 시제품 검증, 지식재산권(IP) 라이선싱 협력을 추진합니다.",
      actionLabel: "기업 파트너십 제안",
      actionHref: "/partnership",
    },
    {
      icon: <Globe className="w-6 h-6 text-[#147FC5]" />,
      title: "5. 글로벌 네트워크 (Global Network)",
      target: "국내외 우주·극한기술 스타트업 및 공급망",
      description:
        "특정 국가나 지역에 국한되지 않고 글로벌 부품·장비 교역과 유망 스타트업 간 전략적 연대를 통해 상호 보완적인 우주산업 밸류체인을 지향합니다.",
      actionLabel: "글로벌 협력 문의",
      actionHref: "/partnership?category=Global",
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#07182D] text-white py-20 lg:py-24 border-b border-[#123454]">
        <div className="container-shell max-w-4xl space-y-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#2998D6]">
            HOOK INTERSTELLAR ECOSYSTEM
          </p>
          <h1 className="text-3xl sm:text-5xl font-bold leading-tight">
            교육, 콘텐츠, 커뮤니티와 연구가 연결되는 생태계
          </h1>
          <p className="text-base sm:text-lg text-[#D9E6F2]/85 leading-relaxed">
            우주 시대는 소수 연구자만의 영역이 아닙니다. HOOK INTERSTELLAR는 인재,
            교육, 연구, 기업 협력, 글로벌 네트워크가 선순환하는 참여 구조를 설계합니다.
          </p>
        </div>
      </section>

      {/* Ecosystem Connection Diagram */}
      <section className="py-16 bg-[#F8FAFC] border-b border-[#E5EAF0]">
        <div className="container-shell space-y-8">
          <div className="max-w-2xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#17212B]">
              생태계 선순환 구조
            </h2>
            <p className="text-sm sm:text-base text-[#5D6B78]">
              콘텐츠와 교육으로 비전에 공감한 참여자들이 아이디어를 나누고, 검증된
              과제가 공동 연구와 사업화로 이어지는 단계적 흐름입니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              {
                step: "STEP 01",
                name: "콘텐츠 · 출판 · 교육",
                detail: "우주산업 인사이트와 출판물을 통해 지식과 문제의식을 확산합니다.",
              },
              {
                step: "STEP 02",
                name: "SPACE IDEAS 커뮤니티",
                detail: "일반 시민·학생·연구자가 질문과 아이디어를 제안하고 토론합니다.",
              },
              {
                step: "STEP 03",
                name: "공동 연구 · 실증 기획",
                detail: "고고도 실험, 극한 생존 기술 등 산학연 파트너와 R&D를 기획합니다.",
              },
              {
                step: "STEP 04",
                name: "IP 사업화 · 글로벌 연대",
                detail: "도출된 기술·브랜드 IP를 라이선싱하고 글로벌 네트워크로 확장합니다.",
              },
            ].map((node, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 border border-[#E5EAF0] space-y-2"
              >
                <span className="text-xs font-mono font-bold text-[#147FC5]">
                  {node.step}
                </span>
                <h3 className="text-base font-bold text-[#17212B]">{node.name}</h3>
                <p className="text-xs text-[#5D6B78] leading-relaxed">{node.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 Ecosystem Pillars */}
      <section className="py-16 lg:py-24 bg-white border-b border-[#E5EAF0]">
        <div className="container-shell space-y-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#17212B]">
            5대 생태계 구성원 및 참여 경로
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-[#E5EAF0] p-7 bg-[#F8FAFC] flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="w-12 h-12 rounded-lg bg-[#E8F4FC] flex items-center justify-center">
                      {pillar.icon}
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-white border border-[#E5EAF0] text-[#5D6B78]">
                      대상: {pillar.target}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[#17212B]">{pillar.title}</h3>
                  <p className="text-sm text-[#5D6B78] leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E5EAF0]">
                  <Link
                    href={pillar.actionHref}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#147FC5] hover:text-[#0B2340]"
                  >
                    <span>{pillar.actionLabel}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Partner Proof Policy (FR-052) */}
          <div className="rounded-xl bg-[#0B2340] text-white p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#2998D6]">
                <ShieldCheck className="w-4 h-4" />
                <span>파트너십 표기 신뢰 원칙 (Partner Verification Policy)</span>
              </div>
              <p className="text-sm text-[#D9E6F2]/85 leading-relaxed">
                HOOK INTERSTELLAR는 공식 협약 및 로고 게시 허가가 문서로 확인된
                파트너만을 웹사이트에 공개하며, 확인되지 않은 제휴 관계를 임의로
                표시하지 않습니다.
              </p>
            </div>
            <Link
              href="/partnership"
              className="px-5 py-3 rounded-lg bg-[#147FC5] hover:bg-[#2998D6] text-white text-sm font-semibold shrink-0"
            >
              공식 협력 제안하기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
