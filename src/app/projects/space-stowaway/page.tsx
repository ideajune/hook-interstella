import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { StatusBadge } from "@/components/StatusBadge";
import {
  Compass,
  FlaskConical,
  FileText,
  Repeat,
  Share2,
  ClipboardList,
  MessageSquarePlus,
  Handshake,
  ShieldAlert,
  Microscope,
} from "lucide-react";

export const metadata: Metadata = {
  title: "SPACE STOWAWAY PROJECT · 후크인터스텔라 우주밀항 프로젝트",
  description:
    "도착보다 중요한 것은 항해다. 개인의 존재를 상징하는 초소형 캡슐을 우주로 보내기 위한 후크인터스텔라의 실험 구상과 항해 철학을 소개합니다.",
};

export default function SpaceStowawayProjectPage() {
  return (
    <div>
      {/* 1) PROJECT HERO & CONCEPT DIAGRAM */}
      <section className="bg-[#07182D] text-white py-16 lg:py-22 border-b border-[#123454]">
        <div className="container-shell grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#123454] text-[#D9E6F2] border border-[#2998D6]/40">
                <Compass className="w-3.5 h-3.5 text-[#2998D6]" />
                <span>SPACE STOWAWAY PROJECT</span>
              </span>
              <StatusBadge status="구상 단계" variant="dark" />
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
              도착보다 중요한 것은 항해다.
            </h1>

            <p className="text-base sm:text-lg text-[#D9E6F2]/90 leading-relaxed">
              거대한 국가 프로그램이나 천문학적 자본의 허가를 기다리는 대신,
              개인의 존재를 상징하는 가장 작은 캡슐(모근 포함 머리카락 1올)을
              우주로 보내기 위해 시도를 이어가는 도전 과제입니다.
            </p>

            <div className="rounded-xl bg-[#0B2340] border border-[#2998D6]/40 p-4 sm:p-5">
              <p className="text-sm sm:text-base font-bold text-white">
                “본 프로젝트는 발사 시점을 보장하지 않는다. 단, 도달할 때까지
                시도를 멈추지 않을 것을 보장한다.”
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-[#0B2340] border border-[#123454] p-6 space-y-4">
              <div className="flex items-center justify-between text-xs text-[#D9E6F2]/80">
                <span className="font-semibold text-[#2998D6]">항해 개념도</span>
                <span>성층권 실증 → 우주 경계</span>
              </div>
              <div className="rounded-xl bg-[#07182D] border border-[#123454] p-5">
                <svg
                  viewBox="0 0 360 180"
                  className="w-full h-auto"
                  role="img"
                  aria-label="지구 곡면과 대기권 경계를 넘어 상승하는 초소형 캡슐의 개념 다이어그램"
                >
                  <defs>
                    <linearGradient id="earthGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#2998D6" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#07182D" stopOpacity="0.95" />
                    </linearGradient>
                  </defs>
                  <path d="M -40 180 Q 180 95 400 180 Z" fill="url(#earthGlow)" />
                  <path
                    d="M -40 180 Q 180 95 400 180"
                    fill="none"
                    stroke="#2998D6"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M 100 145 Q 165 90 235 42"
                    fill="none"
                    stroke="#2998D6"
                    strokeWidth="1.75"
                    strokeDasharray="5 4"
                  />
                  <circle cx="100" cy="145" r="3.5" fill="#D9E6F2" />
                  <circle cx="168" cy="88" r="3.5" fill="#2998D6" />
                  <g transform="translate(235, 42) rotate(-28)">
                    <rect
                      x="-14"
                      y="-7"
                      width="28"
                      height="14"
                      rx="7"
                      fill="#D9E6F2"
                      stroke="#FFFFFF"
                    />
                    <circle cx="5" cy="0" r="2.2" fill="#07182D" />
                  </g>
                </svg>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-lg bg-[#123454]/60 p-3">
                  <p className="text-[#D9E6F2]/70">상징적 페이로드</p>
                  <p className="font-bold text-white mt-0.5">모근 포함 머리카락 1올</p>
                </div>
                <div className="rounded-lg bg-[#123454]/60 p-3">
                  <p className="text-[#D9E6F2]/70">핵심 가치</p>
                  <p className="font-bold text-white mt-0.5">반복 시도와 투명한 기록</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2) EXPERIMENT & 4 PRINCIPLES (COMBINED) */}
      <section className="py-14 lg:py-18 bg-white border-b border-[#E5EAF0]">
        <div className="container-shell space-y-12">
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#17212B]">
              실험 설계의 3대 핵심 요소
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="rounded-xl p-6 bg-[#F8FAFC] border border-[#E5EAF0] space-y-2.5">
                <Microscope className="w-6 h-6 text-[#147FC5]" />
                <h3 className="text-base font-bold text-[#17212B]">
                  1. 최소 단위 상징 페이로드
                </h3>
                <p className="text-xs sm:text-sm text-[#5D6B78] leading-relaxed">
                  세포핵 DNA가 보존되는 모근 포함 머리카락 1올(수 mg 이하)을
                  활용해 무게와 부피를 극단적으로 줄입니다.
                </p>
              </div>

              <div className="rounded-xl p-6 bg-[#F8FAFC] border border-[#E5EAF0] space-y-2.5">
                <FlaskConical className="w-6 h-6 text-[#147FC5]" />
                <h3 className="text-base font-bold text-[#17212B]">
                  2. 극한 환경용 초소형 캡슐
                </h3>
                <p className="text-xs sm:text-sm text-[#5D6B78] leading-relaxed">
                  진공·극저온·자외선 환경에서 시료 변성을 늦추는 기밀 밀폐 구조와
                  경량 차폐 캡슐을 단계적으로 설계합니다.
                </p>
              </div>

              <div className="rounded-xl p-6 bg-[#F8FAFC] border border-[#E5EAF0] space-y-2.5">
                <ShieldAlert className="w-6 h-6 text-[#147FC5]" />
                <h3 className="text-base font-bold text-[#17212B]">
                  3. 성층권 실증부터 단계적 접근
                </h3>
                <p className="text-xs sm:text-sm text-[#5D6B78] leading-relaxed">
                  고고도 성층권(20~35km) 환경 실증부터 시작하여 소형 발사체
                  합승(Rideshare) 등 법규를 준수한 경로를 검토합니다.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6 pt-4 border-t border-[#E5EAF0]">
            <h2 className="text-2xl font-bold text-[#17212B]">4대 항해 원칙</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  icon: <Compass className="w-5 h-5 text-[#147FC5]" />,
                  title: "결과보다 과정",
                  desc: "확정된 발사 날짜를 파는 대신 시도를 지속하는 과정을 핵심 가치로 삼습니다.",
                },
                {
                  icon: <FileText className="w-5 h-5 text-[#147FC5]" />,
                  title: "실패의 투명한 기록",
                  desc: "실패를 숨기지 않고 데이터와 원인을 다음 도전을 위한 자산으로 공개합니다.",
                },
                {
                  icon: <Repeat className="w-5 h-5 text-[#147FC5]" />,
                  title: "최소 비용 반복 시도",
                  desc: "1회 실험 비용을 낮춰 단발성 이벤트가 아닌 반복 가능한 실험 구조를 만듭니다.",
                },
                {
                  icon: <Share2 className="w-5 h-5 text-[#147FC5]" />,
                  title: "열린 협력과 공유",
                  desc: "시행착오의 기록을 개방하여 연구자·시민 동료들과 함께 개선합니다.",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-xl p-5 bg-white border border-[#E5EAF0] space-y-2"
                >
                  {item.icon}
                  <h3 className="text-sm font-bold text-[#17212B]">{item.title}</h3>
                  <p className="text-xs text-[#5D6B78] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3) FLIGHT LOG & PARTICIPATION CTA */}
      <section className="py-14 lg:py-18 bg-[#F8FAFC]">
        <div className="container-shell space-y-8">
          <div className="rounded-2xl border border-[#E5EAF0] bg-white p-6 sm:p-8 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="inline-flex items-center gap-2 text-sm font-bold text-[#17212B]">
                <ClipboardList className="w-4 h-4 text-[#147FC5]" />
                <span>항해 일지 (Flight Log)</span>
              </div>
              <span className="text-xs font-semibold text-[#5D6B78] bg-[#F8FAFC] px-3 py-1 rounded border border-[#E5EAF0]">
                누적 실증 기록: 0건 (구상 단계 · 준비 중)
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#5D6B78] leading-relaxed">
              향후 지상 밀폐 시험 및 고고도 성층권 실증이 진행될 때마다 성공·실패
              여부와 관계없이 <strong>날짜 · 목표 · 결과 · 배운 점 · 다음 계획</strong>이
              이곳에 투명하게 기록됩니다.
            </p>
          </div>

          <div className="rounded-2xl bg-[#07182D] text-white p-7 sm:p-9 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1.5">
              <h3 className="text-xl font-bold">
                아이디어 제안 및 기술 자문으로 항해에 동참하세요
              </h3>
              <p className="text-xs sm:text-sm text-[#D9E6F2]/80">
                캡슐 보존 아이디어는 SPACE IDEAS에서, 연구·장비 협력은 문의 페이지에서
                접수하실 수 있습니다.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Link
                href="/space-ideas/submit"
                className="px-5 py-2.5 rounded-lg bg-[#147FC5] hover:bg-[#2998D6] text-white text-xs sm:text-sm font-semibold inline-flex items-center gap-1.5"
              >
                <MessageSquarePlus className="w-4 h-4" />
                <span>아이디어 제안하기</span>
              </Link>
              <Link
                href="/contact"
                className="px-5 py-2.5 rounded-lg border border-[#D9E6F2]/30 hover:bg-white/10 text-white text-xs sm:text-sm font-semibold inline-flex items-center gap-1.5"
              >
                <Handshake className="w-4 h-4" />
                <span>협력 문의하기</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
