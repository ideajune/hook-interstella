import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { StatusBadge } from "@/components/StatusBadge";
import {
  ArrowRight,
  Compass,
  FlaskConical,
  FileText,
  Repeat,
  Share2,
  Layers,
  Database,
  RefreshCw,
  DollarSign,
  ClipboardList,
  MessageSquarePlus,
  Handshake,
  ShieldAlert,
  Microscope,
  CheckCircle2,
  BookOpen,
} from "lucide-react";

export const metadata: Metadata = {
  title: "SPACE STOWAWAY PROJECT · 후크인터스텔라 우주밀항 프로젝트",
  description:
    "도착보다 중요한 것은 항해다. 개인의 존재를 상징하는 초소형 캡슐을 우주로 보내기 위한 후크인터스텔라의 실험 구상과 항해 철학을 소개합니다.",
};

export default function SpaceStowawayProjectPage() {
  return (
    <div>
      {/* 1) PROJECT INTRO */}
      <section className="relative bg-[#07182D] text-white py-20 lg:py-28 border-b border-[#123454] overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 90% 55% at 50% 105%, rgba(20, 127, 197, 0.28) 0%, rgba(11, 35, 64, 0.45) 45%, rgba(7, 24, 45, 0.98) 80%)",
          }}
        />

        <div className="container-shell relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider bg-[#123454] text-[#D9E6F2] border border-[#2998D6]/40">
                  <Compass className="w-3.5 h-3.5 text-[#2998D6]" aria-hidden="true" />
                  <span>SPACE STOWAWAY PROJECT</span>
                </span>
                <StatusBadge status="구상 단계" variant="dark" />
              </div>

              <div className="space-y-3">
                <p className="text-xs sm:text-sm font-semibold tracking-wider text-[#2998D6]">
                  후크인터스텔라 우주밀항 프로젝트
                </p>
                <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-[1.18] text-white">
                  도착보다 중요한 것은
                  <br />
                  항해다.
                </h1>
              </div>

              <p className="text-base sm:text-lg text-[#D9E6F2]/90 leading-relaxed">
                우주밀항 프로젝트는 거대한 국가 프로그램이나 천문학적 자본의 허가를
                기다리는 대신, 개인의 존재를 상징하는 가장 작은 단위의 캡슐을 우주로
                보내기 위해 시도를 이어가는 후크인터스텔라의 도전 과제입니다.
              </p>

              <div className="rounded-xl bg-[#0B2340]/90 border border-[#2998D6]/40 p-5 sm:p-6 space-y-2">
                <p className="text-xs font-semibold tracking-wider text-[#2998D6]">
                  프로젝트의 중심 문장
                </p>
                <p className="text-base sm:text-lg font-bold text-white leading-snug">
                  “본 프로젝트는 발사 시점을 보장하지 않는다.
                  <br className="hidden sm:inline" /> 단, 도달할 때까지 시도를 멈추지
                  않을 것을 보장한다.”
                </p>
              </div>

              <p className="text-sm text-[#D9E6F2]/75 leading-relaxed">
                현재 물리적 발사나 궤도 진입이 이루어진 실적이 아니라, 개념을 정립하고
                기초 실험 방식을 검토하는 구상 단계의 프로젝트입니다.
              </p>
            </div>

            {/* Concept Visualization Card: Earth Curvature & Micro-Capsule */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-[#0B2340] border border-[#123454] p-6 sm:p-8 space-y-6 relative overflow-hidden">
                <div className="flex items-center justify-between gap-2 text-xs text-[#D9E6F2]/80">
                  <span className="font-semibold tracking-wider text-[#2998D6]">
                    항해 개념도
                  </span>
                  <span className="px-2.5 py-0.5 rounded bg-[#123454] text-[#D9E6F2] text-[11px]">
                    개념 구상 이미지
                  </span>
                </div>

                {/* Minimalist Architectural SVG of Earth Horizon, Trajectory & Micro-Capsule */}
                <div className="rounded-xl bg-[#07182D] border border-[#123454] p-6 flex flex-col items-center justify-center">
                  <svg
                    viewBox="0 0 360 220"
                    className="w-full max-w-[340px] h-auto"
                    role="img"
                    aria-label="지구 곡면과 대기권 경계를 넘어 상승하는 초소형 캡슐의 개념 다이어그램"
                  >
                    <defs>
                      <linearGradient id="earthGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#2998D6" stopOpacity="0.45" />
                        <stop offset="40%" stopColor="#147FC5" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#07182D" stopOpacity="0.95" />
                      </linearGradient>
                      <linearGradient id="capsuleBody" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FFFFFF" />
                        <stop offset="60%" stopColor="#D9E6F2" />
                        <stop offset="100%" stopColor="#2998D6" />
                      </linearGradient>
                    </defs>

                    <line
                      x1="24"
                      y1="45"
                      x2="336"
                      y2="45"
                      stroke="#123454"
                      strokeDasharray="3 3"
                      strokeWidth="1"
                    />
                    <text x="28" y="38" fill="#D9E6F2" fillOpacity="0.6" fontSize="9">
                      우주 경계
                    </text>

                    <line
                      x1="24"
                      y1="105"
                      x2="336"
                      y2="105"
                      stroke="#123454"
                      strokeDasharray="3 3"
                      strokeWidth="1"
                    />
                    <text x="28" y="98" fill="#D9E6F2" fillOpacity="0.6" fontSize="9">
                      성층권 실증 영역
                    </text>

                    {/* Earth curvature arc */}
                    <path
                      d="M -40 220 Q 180 120 400 220 Z"
                      fill="url(#earthGlow)"
                    />
                    <path
                      d="M -40 220 Q 180 120 400 220"
                      fill="none"
                      stroke="#2998D6"
                      strokeWidth="1.5"
                      strokeOpacity="0.8"
                    />
                    <path
                      d="M -40 205 Q 180 102 400 205"
                      fill="none"
                      stroke="#D9E6F2"
                      strokeWidth="0.75"
                      strokeOpacity="0.3"
                      strokeDasharray="4 4"
                    />

                    {/* Trajectory arc */}
                    <path
                      d="M 110 172 Q 165 110 230 56"
                      fill="none"
                      stroke="#2998D6"
                      strokeWidth="1.75"
                      strokeDasharray="5 4"
                    />
                    <circle cx="110" cy="172" r="3.5" fill="#D9E6F2" />
                    <circle cx="168" cy="105" r="3.5" fill="#2998D6" />

                    {/* Micro-capsule icon at top of trajectory */}
                    <g transform="translate(230, 56) rotate(-32)">
                      <rect
                        x="-14"
                        y="-7"
                        width="28"
                        height="14"
                        rx="7"
                        fill="url(#capsuleBody)"
                        stroke="#FFFFFF"
                        strokeWidth="1"
                      />
                      <line
                        x1="-2"
                        y1="-7"
                        x2="-2"
                        y2="7"
                        stroke="#07182D"
                        strokeWidth="1.2"
                      />
                      <circle cx="5" cy="0" r="2.2" fill="#07182D" />
                    </g>
                  </svg>

                  <p className="text-[11px] text-[#D9E6F2]/70 text-center mt-3">
                    성층권 실증을 거쳐 우주 경계로 나아가는 소형 캡슐 실험 개념도
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="rounded-lg bg-[#123454]/60 p-3.5 border border-[#D9E6F2]/10">
                    <p className="text-[#D9E6F2]/70">상징적 페이로드</p>
                    <p className="font-bold text-white mt-1">
                      모근 포함 머리카락 1올
                    </p>
                  </div>
                  <div className="rounded-lg bg-[#123454]/60 p-3.5 border border-[#D9E6F2]/10">
                    <p className="text-[#D9E6F2]/70">핵심 가치</p>
                    <p className="font-bold text-white mt-1">
                      시도의 지속과 과정 기록
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2) WHY SPACE? */}
      <section className="py-16 lg:py-24 bg-white border-b border-[#E5EAF0]">
        <div className="container-shell space-y-12">
          <div className="max-w-3xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#147FC5]">
              WHY SPACE?
            </p>
            <h2 className="text-2xl sm:text-4xl font-bold text-[#17212B] leading-tight">
              높은 진입장벽 너머, 개인이 우주에 도전하는 새로운 접근 방식
            </h2>
            <p className="text-base text-[#5D6B78] leading-relaxed">
              우주에는 아직 누구나 자유롭게 이용할 수 있는 표준 항로가 없습니다. 우리는
              정해진 절차와 거대한 자본의 문을 기다리는 대신, 가장 작고 현실적인 틈에서
              출발합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="rounded-2xl bg-[#F8FAFC] border border-[#E5EAF0] p-7 sm:p-9 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/80 text-[#17212B] text-xs font-semibold">
                기존 우주 접근의 현실
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#17212B]">
                거대 자본과 기관 중심의 높은 진입장벽
              </h3>
              <p className="text-sm sm:text-base text-[#5D6B78] leading-relaxed">
                국가 주도 프로젝트와 대형 민간 우주기업의 발사 일정조차 기술적 난관,
                부품 공급망, 기상 및 행정 절차 등 수많은 변수로 인해 수년씩 지연되곤
                합니다. 막대한 비용과 까다로운 절차는 일반 개인이나 소규모 팀이 우주라는
                영역에 직접 시도를 해보는 것 자체를 어렵게 만듭니다.
              </p>
              <ul className="space-y-2.5 text-sm text-[#5D6B78] border-t border-[#E5EAF0] pt-4">
                <li className="flex items-start gap-2">
                  <span className="text-[#147FC5] font-bold">·</span>
                  <span>대형 발사체 및 상업 우주여행의 높은 비용 장벽</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#147FC5] font-bold">·</span>
                  <span>단 한 번의 발사 성공 여부에 모든 자원이 종속되는 고위험 구조</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#147FC5] font-bold">·</span>
                  <span>일정 지연 시 실패 원인이 외부에 투명하게 공유되지 않는 관행</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl bg-[#0B2340] text-white border border-[#123454] p-7 sm:p-9 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#147FC5]/25 text-[#2998D6] border border-[#2998D6]/40 text-xs font-semibold">
                우주밀항 프로젝트의 관점
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                도착 티켓이 아닌 함께 항해할 방법론의 개척
              </h3>
              <p className="text-sm sm:text-base text-[#D9E6F2]/85 leading-relaxed">
                우리는 거대 기업의 우주여행 상품을 구매하거나 공식 우주비행사가 되기를
                기다리지 않습니다. 보내야 할 대상을 극단적으로 경량화하고, 실패 비용을
                낮추며, 아이디어를 내고 데이터를 분석해 다시 시도하는 항해의 전 과정을
                개인과 동료들이 함께 참여할 수 있는 실험으로 전환합니다.
              </p>
              <ul className="space-y-2.5 text-sm text-[#D9E6F2]/85 border-t border-[#123454] pt-4">
                <li className="flex items-start gap-2">
                  <span className="text-[#2998D6] font-bold">·</span>
                  <span>유인 우주선 대신 개인의 존재를 상징하는 초경량 시료 캡슐 구상</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#2998D6] font-bold">·</span>
                  <span>단발성 이벤트가 아닌 반복 시도가 가능한 저비용 실험 체계 지향</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#2998D6] font-bold">·</span>
                  <span>성공과 실패의 모든 데이터를 다음 도전자들을 위한 지도로 공개</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3) THE EXPERIMENT */}
      <section className="py-16 lg:py-24 bg-[#F8FAFC] border-b border-[#E5EAF0]">
        <div className="container-shell space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl space-y-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#147FC5]">
                THE EXPERIMENT
              </p>
              <h2 className="text-2xl sm:text-4xl font-bold text-[#17212B] leading-tight">
                존재의 최소 단위: 초소형 캡슐 실험 구상과 기술적 검토 과제
              </h2>
              <p className="text-base text-[#5D6B78] leading-relaxed">
                인간을 직접 우주로 보내는 대신, 개인의 생물학적 정보를 담은 가장 가벼운
                상징물을 초소형 캡슐에 담아 고고도 및 우주 경계 너머로 보내는 실험을
                구상합니다.
              </p>
            </div>
            <div className="shrink-0">
              <StatusBadge status="구상 단계" />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Card 1: Symbolic Payload & DNA Accuracy */}
            <div className="bg-white rounded-xl p-7 border border-[#E5EAF0] space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-lg bg-[#E8F4FC] flex items-center justify-center">
                  <Microscope className="w-6 h-6 text-[#147FC5]" aria-hidden="true" />
                </div>
                <span className="inline-block text-xs font-semibold text-[#147FC5]">
                  상징적 페이로드
                </span>
                <h3 className="text-xl font-bold text-[#17212B]">
                  모근을 포함한 머리카락 한 올의 과학적 의미
                </h3>
                <p className="text-sm text-[#5D6B78] leading-relaxed">
                  머리카락의 줄기(모간)는 주로 각질화된 케라틴 단백질로 이루어져 있어
                  세포핵 DNA가 거의 남아 있지 않습니다. 반면,{" "}
                  <strong className="text-[#17212B]">
                    모근(모낭 세포)이 포함된 머리카락
                  </strong>
                  에는 핵을 가진 세포가 존재하여 개인 고유의 유전 정보(핵 DNA)가
                  보존됩니다.
                </p>
              </div>
              <div className="pt-4 border-t border-[#E5EAF0] text-xs text-[#5D6B78] leading-relaxed">
                질량과 부피가 거의 없는 수 밀리그램(mg) 이하의 시료이면서도, 생물학적
                관점에서 한 개인의 고유성을 대표할 수 있는 상징적 페이로드입니다.
              </div>
            </div>

            {/* Card 2: Capsule Protection Engineering */}
            <div className="bg-white rounded-xl p-7 border border-[#E5EAF0] space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-lg bg-[#E8F4FC] flex items-center justify-center">
                  <FlaskConical className="w-6 h-6 text-[#147FC5]" aria-hidden="true" />
                </div>
                <span className="inline-block text-xs font-semibold text-[#147FC5]">
                  캡슐 설계 검토
                </span>
                <h3 className="text-xl font-bold text-[#17212B]">
                  극한 환경용 초소형 캡슐의 기술 과제
                </h3>
                <p className="text-sm text-[#5D6B78] leading-relaxed">
                  고고도 성층권 및 우주 환경에서는 급격한 기압 강하(진공), 영하 50°C
                  이하의 극저온과 태양 복사열, 강한 자외선 및 우주 방사선에 노출됩니다.
                  유전 물질의 변성을 늦추기 위해서는 습기와 산소를 차단하는 기밀 밀폐
                  구조와 경량 차폐 소재에 대한 공학적 검증이 필요합니다.
                </p>
              </div>
              <div className="pt-4 border-t border-[#E5EAF0] text-xs text-[#5D6B78] leading-relaxed">
                현재 캡슐의 규격, 밀폐 방식, 열·방사선 차폐 소재 및 회수용 비콘 구성은{" "}
                <strong className="text-[#17212B]">기초 개념 구상 단계</strong>에
                있습니다.
              </div>
            </div>

            {/* Card 3: Launch Method & Altitude Distinction */}
            <div className="bg-white rounded-xl p-7 border border-[#E5EAF0] space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-lg bg-[#E8F4FC] flex items-center justify-center">
                  <ShieldAlert className="w-6 h-6 text-[#147FC5]" aria-hidden="true" />
                </div>
                <span className="inline-block text-xs font-semibold text-[#147FC5]">
                  고도와 발사 방식의 구분
                </span>
                <h3 className="text-xl font-bold text-[#17212B]">
                  성층권 실증·우주 경계·궤도 진입의 명확한 구분
                </h3>
                <p className="text-sm text-[#5D6B78] leading-relaxed">
                  고고도 풍선이 도달하는 <strong className="text-[#17212B]">성층권(고도 약 20~35km)</strong>은
                  우주 유사 환경을 시험하는 근우주 테스트베드이며, 국제적 우주 경계인{" "}
                  <strong className="text-[#17212B]">카르만 라인(고도 약 100km) 도달</strong>이나
                  초속 약 7.8km의 속도가 필요한{" "}
                  <strong className="text-[#17212B]">지구 저궤도(LEO) 진입</strong>과는
                  물리적·기술적 난이도와 인허가 절차가 완전히 다릅니다.
                </p>
              </div>
              <div className="pt-4 border-t border-[#E5EAF0] text-xs text-[#5D6B78] leading-relaxed">
                성층권 환경 실증부터 소형 발사체 합승(Rideshare) 또는 추진체 연구까지
                항공·우주 관련 법규를 준수하며 단계적으로 타당성을 검토합니다.
              </div>
            </div>
          </div>

          {/* Explicit Status & Honesty Notice */}
          <div className="rounded-xl bg-white border border-[#147FC5]/30 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <p className="text-xs font-bold text-[#147FC5]">
                현재 진행 단계 안내
              </p>
              <p className="text-sm text-[#17212B] leading-relaxed">
                이 실험은 현재 <strong>구상 단계</strong>로, 캡슐 사양 정의 및 고고도 실증
                절차를 검토하기 전 단계입니다. 후크인터스텔라는 생체시료의 외부 모집이나
                상업적 발사 예약 상품을 판매하고 있지 않으며, 향후 모든 연구·실험 과정은
                실제 검증된 사실에 한해 공개됩니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4) OUR PRINCIPLES */}
      <section className="py-16 lg:py-24 bg-white border-b border-[#E5EAF0]">
        <div className="container-shell space-y-12">
          <div className="max-w-3xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#147FC5]">
              OUR PRINCIPLES
            </p>
            <h2 className="text-2xl sm:text-4xl font-bold text-[#17212B] leading-tight">
              우주밀항 프로젝트를 관통하는 4가지 원칙
            </h2>
            <p className="text-base text-[#5D6B78] leading-relaxed">
              통제할 수 없는 미래의 성공 날짜를 가볍게 약속하는 대신, 우리가 통제할 수
              있는 현재의 정직한 행동과 기록의 원칙을 지킵니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Compass className="w-6 h-6 text-[#147FC5]" aria-hidden="true" />,
                title: "결과보다 과정",
                desc: "성공적인 발사라는 단 하나의 결과물이나 확정된 날짜를 파는 대신, 목표를 향해 시도를 이어가는 과정과 항해의 지속 자체를 핵심 가치로 삼습니다.",
              },
              {
                icon: <FileText className="w-6 h-6 text-[#147FC5]" aria-hidden="true" />,
                title: "실패의 투명한 기록",
                desc: "실패를 숨겨야 할 치부가 아닌 가장 중요한 데이터로 다룹니다. 미사여구나 변명 없이 실패 직후의 사실, 수치, 의사결정 맥락을 투명하게 기록하고 공개합니다.",
              },
              {
                icon: <Repeat className="w-6 h-6 text-[#147FC5]" aria-hidden="true" />,
                title: "최소 비용과 반복 시도",
                desc: "단 한 번의 화려한 시도에 모든 자원을 걸지 않습니다. 페이로드와 시스템 규모를 최소화하여 실패 비용을 낮추고, 감당 가능한 범위에서 반복 실험을 이어갑니다.",
              },
              {
                icon: <Share2 className="w-6 h-6 text-[#147FC5]" aria-hidden="true" />,
                title: "열린 협력과 지식 공유",
                desc: "실패 기록에서 개인에 대한 비난을 배제하고 시스템 보완에 집중합니다. 축적된 시행착오의 지도를 개방하여 외부 연구자와 미래의 동료들이 함께 활용할 수 있게 합니다.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="rounded-xl p-6 sm:p-7 bg-[#F8FAFC] border border-[#E5EAF0] flex flex-col justify-between space-y-5"
              >
                <div className="space-y-4">
                  <div className="w-11 h-11 rounded-lg bg-[#E8F4FC] flex items-center justify-center">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold text-[#17212B]">{item.title}</h3>
                  <p className="text-sm text-[#5D6B78] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5) HOW WE CONTINUE */}
      <section className="py-16 lg:py-24 bg-[#0B2340] text-white border-b border-[#123454]">
        <div className="container-shell space-y-12">
          <div className="max-w-3xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#2998D6]">
              HOW WE CONTINUE
            </p>
            <h2 className="text-2xl sm:text-4xl font-bold text-white leading-tight">
              멈추지 않는 시도를 가능하게 하는 시스템 설계
            </h2>
            <p className="text-base text-[#D9E6F2]/85 leading-relaxed">
              멈추지 않겠다는 선언은 의지만으로 유지되지 않습니다. 실패의 충격을 흡수하고
              다음 시도로 자연스럽게 이어지도록 네 가지 운영 구조를 지향합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                icon: <DollarSign className="w-5 h-5 text-[#2998D6]" aria-hidden="true" />,
                title: "저비용 실험 구조",
                desc: "초경량 시료 캡슐과 검증된 상용 부품 조합을 우선 검토하여 1회 실험 비용을 낮추고, 한정된 재원으로 더 많은 실증 기회를 확보합니다.",
              },
              {
                step: "02",
                icon: <Layers className="w-5 h-5 text-[#2998D6]" aria-hidden="true" />,
                title: "기술 및 운영 모듈화",
                desc: "캡슐 밀폐, 센서·통신, 상승 플랫폼, 회수 절차를 독립된 모듈로 분리하여 특정 영역의 오류가 프로젝트 전체의 마비로 이어지지 않도록 방화벽을 둡니다.",
              },
              {
                step: "03",
                icon: <Database className="w-5 h-5 text-[#2998D6]" aria-hidden="true" />,
                title: "실패 데이터 축적",
                desc: "즉시성·완전성·공개성·비난 배제의 원칙에 따라 기술적 결함뿐 아니라 준비 과정과 의사결정 맥락까지 표준화된 로그로 데이터베이스화합니다.",
              },
              {
                step: "04",
                icon: <RefreshCw className="w-5 h-5 text-[#2998D6]" aria-hidden="true" />,
                title: "다음 시도를 위한 개선",
                desc: "각 단계의 목표를 단발성 성공이 아닌 다음 시도를 위한 데이터와 개선안 확보로 정의하여, 배운 점을 즉시 다음 실험 설계에 반영합니다.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="rounded-xl bg-[#123454]/80 border border-[#D9E6F2]/20 p-6 sm:p-7 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold tracking-widest text-[#2998D6]">
                      {item.step}
                    </span>
                    <div className="w-9 h-9 rounded-lg bg-[#07182D] border border-[#123454] flex items-center justify-center">
                      {item.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  <p className="text-sm text-[#D9E6F2]/85 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6) FLIGHT LOG */}
      <section className="py-16 lg:py-24 bg-white border-b border-[#E5EAF0]">
        <div className="container-shell space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#147FC5]">
                <ClipboardList className="w-4 h-4" aria-hidden="true" />
                <span>FLIGHT LOG</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-[#17212B] leading-tight">
                항해 일지
              </h2>
              <p className="text-base text-[#5D6B78] leading-relaxed">
                모든 실험과 시도는 성공 여부와 관계없이 아래 6개 표준 항목에 따라 기록되고
                공개됩니다. 후크인터스텔라는 검증되지 않은 실험 실적을 임의로 생성하지
                않습니다.
              </p>
            </div>
            <div className="text-xs font-semibold text-[#5D6B78] bg-[#F8FAFC] px-4 py-2.5 rounded-lg border border-[#E5EAF0]">
              누적 실증 비행 기록: <strong className="text-[#17212B] tabular-nums">0건</strong>{" "}
              (구상 단계 · 기록 준비 중)
            </div>
          </div>

          {/* Flight Log Schema & Honest Empty State */}
          <div className="rounded-2xl border border-[#E5EAF0] overflow-hidden bg-white">
            {/* Desktop Table Header showing the 6 structured fields */}
            <div className="hidden lg:grid lg:grid-cols-12 bg-[#F8FAFC] border-b border-[#E5EAF0] px-6 py-4 text-xs font-bold text-[#5D6B78]">
              <div className="col-span-2">날짜</div>
              <div className="col-span-2">목표</div>
              <div className="col-span-2">진행 상태</div>
              <div className="col-span-2">결과</div>
              <div className="col-span-2">배운 점</div>
              <div className="col-span-2">다음 계획</div>
            </div>

            {/* Mobile Field Pills */}
            <div className="lg:hidden bg-[#F8FAFC] border-b border-[#E5EAF0] p-4 space-y-2">
              <p className="text-xs font-bold text-[#17212B]">
                항해 일지 표준 기록 항목
              </p>
              <div className="flex flex-wrap gap-1.5">
                {["날짜", "목표", "진행 상태", "결과", "배운 점", "다음 계획"].map(
                  (field) => (
                    <span
                      key={field}
                      className="px-2.5 py-1 rounded bg-white border border-[#E5EAF0] text-xs font-medium text-[#5D6B78]"
                    >
                      {field}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Empty / Preparing State Body */}
            <div className="p-8 sm:p-14 text-center space-y-5 bg-white">
              <div className="w-12 h-12 rounded-full bg-[#E8F4FC] text-[#147FC5] flex items-center justify-center mx-auto">
                <ClipboardList className="w-6 h-6" aria-hidden="true" />
              </div>
              <div className="space-y-2 max-w-xl mx-auto">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#147FC5]" aria-hidden="true" />
                  <span>실제 실험 기록 준비 중</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#17212B]">
                  아직 등록된 실제 발사 및 실험 기록이 없습니다.
                </h3>
                <p className="text-sm text-[#5D6B78] leading-relaxed">
                  현재 우주밀항 프로젝트는 실험 개념 정의 및 기술·법규 검토를 준비하는{" "}
                  <strong className="text-[#17212B]">구상 단계</strong>입니다. 향후 지상
                  밀폐 시험이나 고고도 성층권 실증 등 첫 번째 시도가 실행되면, 성공과 실패
                  여부를 가리지 않고 <strong>날짜 · 목표 · 진행 상태 · 결과 · 배운 점 · 다음 계획</strong>이
                  이곳에 기록됩니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7) JOIN THE JOURNEY */}
      <section className="py-16 lg:py-24 bg-[#F8FAFC]">
        <div className="container-shell space-y-12">
          <div className="max-w-3xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#147FC5]">
              JOIN THE JOURNEY
            </p>
            <h2 className="text-2xl sm:text-4xl font-bold text-[#17212B] leading-tight">
              이 항해를 함께 만들어갈 동료와 파트너를 찾습니다
            </h2>
            <p className="text-base text-[#5D6B78] leading-relaxed">
              우주밀항 프로젝트는 완성된 결과를 판매하는 상업 상품이 아니라, 작은 시도를
              모아 가능성을 넓혀가는 열린 실험입니다. 여러분의 아이디어와 전문성을 보태어
              첫 번째 항해 일지를 함께 열어주세요.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-7 border border-[#E5EAF0] flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded bg-[#E8F4FC] text-[#147FC5]">
                  우주 관심자 · 학생 · 시민
                </span>
                <h3 className="text-xl font-bold text-[#17212B]">
                  실험 아이디어 제안 및 열린 토론
                </h3>
                <p className="text-sm text-[#5D6B78] leading-relaxed">
                  초소형 캡슐의 보존 아이디어, 고고도 실험 과제, 혹은 우주 접근성에 관한
                  질문과 제안을 SPACE IDEAS 광장에서 자유롭게 공유해 주세요.
                </p>
              </div>
              <div className="pt-4 border-t border-[#E5EAF0] flex flex-wrap gap-3">
                <Link
                  href="/space-ideas"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#147FC5] hover:text-[#0B2340]"
                >
                  <MessageSquarePlus className="w-4 h-4" aria-hidden="true" />
                  <span>SPACE IDEAS 둘러보기</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl p-7 border border-[#E5EAF0] flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded bg-[#E8F4FC] text-[#147FC5]">
                  연구자 · 엔지니어
                </span>
                <h3 className="text-xl font-bold text-[#17212B]">
                  고고도 실증 · 캡슐 공학 기술 자문
                </h3>
                <p className="text-sm text-[#5D6B78] leading-relaxed">
                  생체시료 밀폐·단열 패키징, 성층권 과학 풍선 운용, 경량 위치 추적 비콘 및
                  회수 시스템 설계를 함께 검토할 연구자와 엔지니어의 참여를 기다립니다.
                </p>
              </div>
              <div className="pt-4 border-t border-[#E5EAF0] flex flex-wrap gap-3">
                <Link
                  href="/partnership"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#147FC5] hover:text-[#0B2340]"
                >
                  <Handshake className="w-4 h-4" aria-hidden="true" />
                  <span>공동 연구 및 기술 자문 제안</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-xl p-7 border border-[#E5EAF0] flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded bg-[#E8F4FC] text-[#147FC5]">
                  기업 · 교육기관 · 미디어
                </span>
                <h3 className="text-xl font-bold text-[#17212B]">
                  파트너십 · 콘텐츠 및 장비 협력
                </h3>
                <p className="text-sm text-[#5D6B78] leading-relaxed">
                  특수 소재·센서 지원, 과학 교육 프로그램 연계, 다큐멘터리·출판 기록 프로젝트
                  등 유연하고 의미 있는 실험을 함께할 기관 파트너십을 제안해 주세요.
                </p>
              </div>
              <div className="pt-4 border-t border-[#E5EAF0] flex flex-wrap gap-3">
                <Link
                  href="/partnership"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#147FC5] hover:text-[#0B2340]"
                >
                  <Handshake className="w-4 h-4" aria-hidden="true" />
                  <span>PARTNERSHIP 문의하기</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom CTA Banner */}
          <div className="rounded-2xl bg-[#07182D] text-white p-8 sm:p-10 border border-[#123454] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#2998D6]">
                OPEN PARTICIPATION & COLLABORATION
              </p>
              <h3 className="text-xl sm:text-2xl font-bold">
                당신의 아이디어와 전문성으로 항해에 동참하세요
              </h3>
              <p className="text-sm text-[#D9E6F2]/80 leading-relaxed">
                공개 아이디어 제안은 SPACE IDEAS에서, 기업·연구실 단위의 협력 문의는
                PARTNERSHIP 페이지에서 접수하실 수 있습니다.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href="/space-ideas/submit"
                className="px-5 py-3 rounded-lg bg-[#147FC5] hover:bg-[#2998D6] text-white text-sm font-semibold transition-colors min-h-[44px] inline-flex items-center gap-2"
              >
                <MessageSquarePlus className="w-4 h-4" aria-hidden="true" />
                <span>아이디어 제안하기</span>
              </Link>
              <Link
                href="/partnership"
                className="px-5 py-3 rounded-lg border border-[#D9E6F2]/30 hover:bg-white/10 text-white text-sm font-semibold transition-colors min-h-[44px] inline-flex items-center gap-2"
              >
                <Handshake className="w-4 h-4" aria-hidden="true" />
                <span>협력 문의하기</span>
              </Link>
              <Link
                href="/insights/space-stowaway-project-why-we-chose-voyage"
                className="px-5 py-3 rounded-lg border border-[#123454] bg-[#0B2340] hover:border-[#2998D6] text-[#D9E6F2] hover:text-white text-sm font-semibold transition-colors min-h-[44px] inline-flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-[#2998D6]" aria-hidden="true" />
                <span>인사이트 아티클 보기</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
