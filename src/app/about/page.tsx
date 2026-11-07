import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Compass,
  ShieldCheck,
  Users,
  Sparkles,
  Scale,
  ArrowRight,
  Building2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "ABOUT — 회사 소개 및 비전",
  description:
    "후크인터스텔라(주)의 시작과 비전, 미션, 그리고 우주 시대를 준비하는 우리의 방식을 소개합니다.",
};

export default function AboutPage() {
  return (
    <div>
      {/* Page Hero */}
      <section className="bg-[#07182D] text-white py-20 lg:py-24 border-b border-[#123454]">
        <div className="container-shell max-w-4xl space-y-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#2998D6]">
            ABOUT HOOK INTERSTELLAR
          </p>
          <h1 className="text-3xl sm:text-5xl font-bold leading-tight">
            새로운 우주 시대,
            <br />
            우리만의 항로를 개척하다.
          </h1>
          <p className="text-base sm:text-lg text-[#D9E6F2]/85 leading-relaxed max-w-3xl">
            우주는 오랫동안 국가 기관이나 천문학적인 자본을 가진 소수만의 무대였습니다.
            후크인터스텔라(주)는 그 높은 벽 앞에서 발길을 돌리는 대신, 지금 우리가 가진
            아이디어와 실용적인 기술, 그리고 사람들의 연대로 우주로 향하는 또 다른 길을
            열어가고 있습니다.
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-16 lg:py-24 bg-white border-b border-[#E5EAF0]">
        <div className="container-shell grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#17212B] leading-snug">
              거창한 구호보다, 지금 할 수 있는 도전부터 시작합니다
            </h2>
            <p className="text-base text-[#5D6B78] leading-relaxed">
              후크인터스텔라(주)가 그리는 우주는 멀리 떨어진 공상과학 속 이야기가
              아닙니다. 성층권 고고도 풍선을 띄워 우주와 닮은 환경에서 장비를 시험해
              보는 일, 극한의 추위와 고립 속에서도 사람을 지켜줄 보호복과 비상식량을
              고민하는 일, 그리고 우주에 관심 있는 누구나 질문을 던지고 지식을 나눌 수
              있는 마당을 여는 일에서 우리의 항해는 시작됩니다.
            </p>
            <p className="text-base text-[#5D6B78] leading-relaxed">
              우리는 우주 접근 기술, 극한 생존 솔루션, 인재·교육 커뮤니티, 수익·IP 개발,
              글로벌 네트워크라는 다섯 갈래의 여정을 차근차근 걸어가고 있습니다. 당장
              거대한 로켓을 쏘아 올린다고 과장하지 않습니다. 현재 우리가 직접 운영하고
              있는 콘텐츠와 오픈 커뮤니티(SPACE IDEAS)를 단단한 디딤돌로 삼고, 뜻이 맞는
              연구자·엔지니어·파트너 기업들과 손을 잡아 고고도 실험과 생존 기술 연구로
              보폭을 넓혀가고 있습니다.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-xl bg-[#F8FAFC] border border-[#E5EAF0] p-7 space-y-5">
              <div className="flex items-center gap-2.5 text-[#147FC5] font-semibold text-sm">
                <Building2 className="w-5 h-5" />
                <span>기업 기본 정보</span>
              </div>
              <dl className="space-y-3.5 text-sm border-t border-[#E5EAF0] pt-4">
                <div className="grid grid-cols-3 gap-2">
                  <dt className="text-[#5D6B78] font-medium">운영 법인</dt>
                  <dd className="col-span-2 font-semibold text-[#17212B]">
                    후크인터스텔라(주)
                  </dd>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <dt className="text-[#5D6B78] font-medium">영문 브랜드</dt>
                  <dd className="col-span-2 font-semibold text-[#17212B]">
                    HOOK INTERSTELLAR
                  </dd>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <dt className="text-[#5D6B78] font-medium">슬로건</dt>
                  <dd className="col-span-2 text-[#17212B]">
                    새로운 우주 시대, 우리만의 항로를 개척하다 (Beyond the Horizon)
                  </dd>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <dt className="text-[#5D6B78] font-medium">주요 영역</dt>
                  <dd className="col-span-2 text-[#17212B]">
                    우주·고고도 기술 연구, 극한 생존 솔루션, 교육·콘텐츠 및 오픈
                    아이디어 플랫폼 운영
                  </dd>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <dt className="text-[#5D6B78] font-medium">소재지</dt>
                  <dd className="col-span-2 text-[#17212B]">
                    서울특별시 강남구 삼성로103길 6
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 lg:py-24 bg-[#0B2340] text-white border-b border-[#123454]">
        <div className="container-shell grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-2xl bg-[#123454]/80 border border-[#D9E6F2]/20 p-8 sm:p-10 space-y-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#2998D6]">
              VISION
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold leading-snug">
              누구나 자기만의 재능으로 참여할 수 있는 열린 우주 생태계
            </h2>
            <p className="text-sm sm:text-base text-[#D9E6F2]/85 leading-relaxed">
              우주가 일부 거대 기업만의 전유물로 남지 않도록, 호기심 많은 시민과 학생,
              현장의 연구자와 기술 기업이 함께 모여 새로운 기술과 생존 방식을 실험하는
              기회의 바다를 만듭니다.
            </p>
          </div>

          <div className="rounded-2xl bg-[#123454]/80 border border-[#D9E6F2]/20 p-8 sm:p-10 space-y-4">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#2998D6]">
              MISSION
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold leading-snug">
              유연한 기술 실험, 실전 생존 솔루션, 그리고 동료들의 연대
            </h2>
            <p className="text-sm sm:text-base text-[#D9E6F2]/85 leading-relaxed">
              고고도 실증 실험과 극한환경 생존 기술을 연구하고, 콘텐츠와 아이디어 광장을
              통해 같은 꿈을 꾸는 동료와 파트너를 모아 지속 가능한 비즈니스로 이어갑니다.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values & Operating Principles */}
      <section className="py-16 lg:py-24 bg-white border-b border-[#E5EAF0]">
        <div className="container-shell space-y-12">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#147FC5]">
              CORE VALUES & PRINCIPLES
            </p>
            <h2 className="text-3xl font-bold text-[#17212B]">
              우리가 일하고 나아가는 기준
            </h2>
            <p className="text-base text-[#5D6B78]">
              후크인터스텔라(주)는 뜨거운 도전 정신만큼이나 정직한 신뢰를 중요하게
              생각합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Compass className="w-6 h-6 text-[#147FC5]" />,
                title: "우리만의 항로 개척",
                desc: "남들이 만든 무겁고 비싼 방식을 그대로 따라가기보다, 성층권 풍선 활용처럼 작고 유연하게 시도할 수 있는 현실적인 돌파구를 찾습니다.",
              },
              {
                icon: <ShieldCheck className="w-6 h-6 text-[#147FC5]" />,
                title: "생존을 지키는 기술",
                desc: "우주를 화려한 환상이 아닌 혹독한 환경으로 직시하고, 지상 재난 현장에서도 사람의 생명을 지킬 수 있는 보호장비와 식량·생태 기술을 우선합니다.",
              },
              {
                icon: <Users className="w-6 h-6 text-[#147FC5]" />,
                title: "열린 지식과 동료애",
                desc: "지식을 소수가 독점하지 않고 투명하게 나누며, 서로 다른 분야의 전문가와 시민들이 아이디어를 보태는 열린 커뮤니티를 가꿔 나갑니다.",
              },
              {
                icon: <Scale className="w-6 h-6 text-[#147FC5]" />,
                title: "정직한 현재와 투명성",
                desc: "지금 실제로 운영 중인 일과 앞으로 연구·구상 중인 목표를 있는 그대로 구분해 알리고, 참여자의 지식재산권을 소중히 보호합니다.",
              },
            ].map((val, i) => (
              <div
                key={i}
                className="rounded-xl p-6 bg-[#F8FAFC] border border-[#E5EAF0] space-y-4"
              >
                <div className="w-12 h-12 rounded-lg bg-[#E8F4FC] flex items-center justify-center">
                  {val.icon}
                </div>
                <h3 className="text-lg font-bold text-[#17212B]">{val.title}</h3>
                <p className="text-sm text-[#5D6B78] leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR PHILOSOPHY */}
      <section className="py-16 lg:py-24 bg-[#07182D] text-white border-b border-[#123454]">
        <div className="container-shell">
          <div className="rounded-2xl bg-[#0B2340] border border-[#123454] p-8 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#2998D6]">
                OUR PHILOSOPHY
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                우리는 도착보다 항해를 중요하게 생각합니다.
              </h2>
              <p className="text-base sm:text-lg text-[#D9E6F2]/90 leading-relaxed">
                우주에는 아직 누구나 이용할 수 있는 표준 항로가 없습니다. 우리는 정해진
                길을 기다리기보다 작은 가능성을 찾아 직접 시도합니다. 성공만을 약속하지
                않습니다. 실패를 숨기지 않고 시도와 배움의 과정을 기록하며 다음 도전을
                이어갑니다.
              </p>
              <div className="pt-2">
                <Link
                  href="/projects/space-stowaway"
                  className="px-6 py-3.5 rounded-lg bg-[#147FC5] hover:bg-[#2998D6] text-white text-sm sm:text-base font-semibold transition-colors inline-flex items-center gap-2 min-h-[48px]"
                >
                  <span>SPACE STOWAWAY 프로젝트 자세히 보기</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-xl bg-[#07182D] border border-[#2998D6]/40 p-7 sm:p-8 space-y-4">
                <span className="text-xs font-semibold tracking-wider text-[#2998D6]">
                  우리의 약속
                </span>
                <blockquote className="text-xl sm:text-2xl font-bold text-white leading-snug">
                  &ldquo;도달할 때까지 시도를 멈추지 않는다.&rdquo;
                </blockquote>
                <p className="text-xs sm:text-sm text-[#D9E6F2]/75 leading-relaxed pt-2 border-t border-[#123454]">
                  불확실한 발사 시점이나 결과를 섣불리 보장하기보다, 시도를 지속하는
                  태도와 투명한 항해 일지를 정직한 약속으로 삼습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Future Direction & Roadmap */}
      <section className="py-16 lg:py-24 bg-[#F8FAFC]">
        <div className="container-shell max-w-4xl space-y-10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#147FC5]">
              <Sparkles className="w-4 h-4" />
              <span>STEP-BY-STEP DIRECTION</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#17212B]">
              후크인터스텔라(주)가 걸어가는 단계별 여정
            </h2>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-xl p-6 border border-[#E5EAF0] flex flex-col sm:flex-row sm:items-center gap-4">
              <span className="px-3 py-1 rounded-full bg-[#E8F4FC] text-[#147FC5] text-xs font-bold tabular-nums shrink-0">
                기반 수립
              </span>
              <div>
                <h3 className="font-bold text-[#17212B]">
                  5대 핵심 사업 영역 및 단계별 연구·개발 로드맵 수립
                </h3>
                <p className="text-sm text-[#5D6B78] mt-1">
                  우주 기술, 극한 생존, 인재·교육·커뮤니티, 수익·IP 사업화, 글로벌
                  네트워크로 이어지는 다섯 갈래의 사업 방향을 세웠습니다.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-[#E5EAF0] flex flex-col sm:flex-row sm:items-center gap-4">
              <span className="px-3 py-1 rounded-full bg-[#E8F4FC] text-[#147FC5] text-xs font-bold tabular-nums shrink-0">
                현재 집중 단계
              </span>
              <div>
                <h3 className="font-bold text-[#17212B]">
                  SPACE IDEAS 오픈 플랫폼 · 과학 콘텐츠 운영 및 생존용품 기획
                </h3>
                <p className="text-sm text-[#5D6B78] mt-1">
                  우주와 미래 기술에 관한 인사이트를 나누고, 누구나 아이디어를 제안할 수
                  있는 커뮤니티를 운영하며 지상·재난 겸용 생존장비를 기획하고 있습니다.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-[#E5EAF0] flex flex-col sm:flex-row sm:items-center gap-4">
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold tabular-nums shrink-0">
                중장기 확장
              </span>
              <div>
                <h3 className="font-bold text-[#17212B]">
                  고고도 성층권 실증 실험 협력, 생존 훈련 공간 및 글로벌 기술 연대
                </h3>
                <p className="text-sm text-[#5D6B78] mt-1">
                  대학·연구실·기술 기업과의 파트너십을 통해 성층권 관측 실험과 폐쇄형
                  생태계 연구를 추진하고, 국내외 유망 스타트업과 연합 생태계를 넓혀갈
                  계획입니다.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap gap-4">
            <Link
              href="/business"
              className="px-5 py-3 rounded-lg bg-[#147FC5] hover:bg-[#2998D6] text-white text-sm font-semibold inline-flex items-center gap-2"
            >
              <span>5대 사업 분야 살펴보기</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/space-ideas"
              className="px-5 py-3 rounded-lg border border-[#E5EAF0] bg-white hover:border-[#147FC5] text-[#17212B] text-sm font-semibold inline-flex items-center"
            >
              SPACE IDEAS 참여하기
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
