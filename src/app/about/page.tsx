import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Compass,
  ShieldCheck,
  Users,
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
      <section className="bg-[#07182D] text-white py-16 lg:py-20 border-b border-[#123454]">
        <div className="container-shell max-w-4xl space-y-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#2998D6]">
            ABOUT HOOK INTERSTELLAR
          </p>
          <h1 className="text-3xl sm:text-5xl font-bold leading-tight">
            새로운 우주 시대,
            <br />
            우리만의 항로를 개척하다.
          </h1>
          <p className="text-base sm:text-lg text-[#D9E6F2]/85 leading-relaxed max-w-2xl">
            후크인터스텔라(주)는 거대한 자본의 벽 앞에서 발길을 돌리는 대신,
            실용적인 기술 실험과 열린 연대로 우주로 향하는 새로운 항로를
            열어갑니다.
          </p>
        </div>
      </section>

      {/* Company Overview & Basic Info */}
      <section className="py-14 lg:py-18 bg-white border-b border-[#E5EAF0]">
        <div className="container-shell grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7 space-y-5">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#17212B] leading-snug">
              거창한 구호보다, 지금 할 수 있는 도전부터 시작합니다
            </h2>
            <p className="text-base text-[#5D6B78] leading-relaxed">
              성층권 고고도 풍선을 띄워 우주와 닮은 환경에서 장비를 시험하는 일,
              극한의 환경에서도 사람을 지켜줄 보호복과 비상식량을 연구하는 일,
              그리고 우주에 관심 있는 누구나 질문을 던지고 지식을 나눌 수 있는
              광장(SPACE IDEAS)을 여는 일에서 우리의 항해는 시작됩니다.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="rounded-xl bg-[#0B2340] text-white p-5 space-y-2">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-[#2998D6]">
                  VISION
                </span>
                <p className="text-base font-bold leading-snug">
                  누구나 자기만의 전문성으로 참여할 수 있는 열린 우주 생태계
                </p>
              </div>
              <div className="rounded-xl bg-[#0B2340] text-white p-5 space-y-2">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-[#2998D6]">
                  MISSION
                </span>
                <p className="text-base font-bold leading-snug">
                  유연한 고고도 기술 실험, 실전 생존 솔루션, 그리고 동료들의 연대
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-xl bg-[#F8FAFC] border border-[#E5EAF0] p-6 space-y-4">
              <div className="flex items-center gap-2 text-[#147FC5] font-semibold text-sm">
                <Building2 className="w-5 h-5" />
                <span>기업 기본 정보</span>
              </div>
              <dl className="space-y-3 text-sm border-t border-[#E5EAF0] pt-4">
                <div className="grid grid-cols-3 gap-2">
                  <dt className="text-[#5D6B78]">운영 법인</dt>
                  <dd className="col-span-2 font-semibold text-[#17212B]">
                    후크인터스텔라(주) (HOOK INTERSTELLAR)
                  </dd>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <dt className="text-[#5D6B78]">대표자</dt>
                  <dd className="col-span-2 font-semibold text-[#17212B]">
                    최규철
                  </dd>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <dt className="text-[#5D6B78]">주요 영역</dt>
                  <dd className="col-span-2 text-[#17212B]">
                    고고도 기술 연구, 극한 생존 솔루션, 과학 콘텐츠 및 오픈 플랫폼
                  </dd>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <dt className="text-[#5D6B78]">소재지</dt>
                  <dd className="col-span-2 text-[#17212B]">
                    서울특별시 강남구 삼성로103길 6
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values (4 Compact Cards) */}
      <section className="py-14 lg:py-18 bg-[#F8FAFC]">
        <div className="container-shell space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#147FC5]">
                CORE VALUES
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#17212B] mt-1">
                우리가 일하고 나아가는 기준
              </h2>
            </div>
            <Link
              href="/business"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#147FC5] hover:text-[#0B2340]"
            >
              <span>5대 사업·기술 살펴보기</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: <Compass className="w-5 h-5 text-[#147FC5]" />,
                title: "유연한 항로 개척",
                desc: "성층권 풍선 실증처럼 작고 유연하게 반복 시도할 수 있는 현실적인 돌파구를 찾습니다.",
              },
              {
                icon: <ShieldCheck className="w-5 h-5 text-[#147FC5]" />,
                title: "생존을 지키는 기술",
                desc: "우주뿐 아니라 지상 재난 현장에서도 생명을 지키는 보호장비와 식량 기술을 우선합니다.",
              },
              {
                icon: <Users className="w-5 h-5 text-[#147FC5]" />,
                title: "열린 지식과 연대",
                desc: "지식을 독점하지 않고 시민·연구자가 함께 아이디어를 나누는 커뮤니티를 가꿉니다.",
              },
              {
                icon: <Scale className="w-5 h-5 text-[#147FC5]" />,
                title: "정직한 투명성",
                desc: "현재 운영 중인 사업과 연구·구상 단계의 목표를 있는 그대로 구분해 알립니다.",
              },
            ].map((val, i) => (
              <div
                key={i}
                className="rounded-xl p-5 bg-white border border-[#E5EAF0] space-y-3"
              >
                <div className="w-10 h-10 rounded-lg bg-[#E8F4FC] flex items-center justify-center">
                  {val.icon}
                </div>
                <h3 className="text-base font-bold text-[#17212B]">{val.title}</h3>
                <p className="text-xs sm:text-sm text-[#5D6B78] leading-relaxed">
                  {val.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
