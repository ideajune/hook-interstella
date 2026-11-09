import React from "react";
import Link from "next/link";
import { readDb } from "@/lib/db";
import { StatusBadge } from "@/components/StatusBadge";
import {
  ArrowRight,
  Compass,
  ShieldAlert,
  Users,
  Lightbulb,
  Globe2,
  BookOpen,
  MessageSquarePlus,
  Handshake,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const db = readDb();
  const businessGroups = [...db.businessGroups].sort(
    (a, b) => a.displayOrder - b.displayOrder
  );
  const publicIdeas = db.ideas
    .filter((i) => i.moderationStatus === "published")
    .slice(0, 2);
  const recentArticles = db.articles
    .filter((a) => a.status === "published")
    .slice(0, 2);

  const groupIcons: Record<string, React.ReactNode> = {
    "space-technology": <Compass className="w-5 h-5 text-[#147FC5]" />,
    "space-survival": <ShieldAlert className="w-5 h-5 text-[#147FC5]" />,
    "education-community": <Users className="w-5 h-5 text-[#147FC5]" />,
    "revenue-ip": <Lightbulb className="w-5 h-5 text-[#147FC5]" />,
    "global-network": <Globe2 className="w-5 h-5 text-[#147FC5]" />,
  };

  return (
    <div>
      {/* 1. HERO SECTION */}
      <section className="relative bg-[#07182D] text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover hero-bg-kenburns"
          style={{ backgroundImage: "url('/images/hero-space.jpg')" }}
          role="img"
          aria-label="저궤도 우주정거장 모듈과 푸른 지구의 지평선 실사 이미지"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(7,24,45,0.65) 0%, rgba(7,24,45,0.32) 48%, rgba(7,24,45,0) 78%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(7,24,45,0) 0%, rgba(7,24,45,0) 78%, #07182D 100%)",
          }}
        />

        <div className="container-shell relative py-20 sm:py-28 lg:py-32">
          <div className="max-w-2xl space-y-5">
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider text-white"
              style={{
                backgroundColor: "rgba(7, 24, 45, 0.82)",
                border: "1px solid rgba(41, 152, 214, 0.6)",
              }}
            >
              <span>HOOK INTERSTELLAR</span>
              <span aria-hidden="true">·</span>
              <span style={{ color: "#5CC3FF" }}>BEYOND THE HORIZON</span>
            </div>

            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.15] text-white"
              style={{
                textShadow:
                  "0 2px 18px rgba(7, 24, 45, 0.95), 0 1px 4px rgba(0, 0, 0, 0.9)",
              }}
            >
              새로운 우주 시대,
              <br />
              우리만의 항로를 개척하다.
            </h1>

            <p
              className="text-base sm:text-lg text-white font-medium leading-relaxed"
              style={{
                textShadow:
                  "0 2px 12px rgba(7, 24, 45, 0.95), 0 1px 3px rgba(0, 0, 0, 0.9)",
              }}
            >
              고고도·우주 접근 기술, 극한환경 생존 솔루션, 인재 커뮤니티와 오픈
              아이디어 플랫폼을 연결하는 우주산업 혁신 생태계입니다.
            </p>

            <div className="pt-3 flex flex-wrap items-center gap-3">
              <Link
                href="/business"
                className="px-6 py-3 rounded-lg bg-[#147FC5] hover:bg-[#2998D6] text-white font-semibold text-sm sm:text-base transition-colors inline-flex items-center gap-2 min-h-[46px]"
              >
                <span>사업·기술 살펴보기</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                href="/space-ideas"
                className="px-6 py-3 rounded-lg text-white font-semibold text-sm sm:text-base transition-colors inline-flex items-center gap-2 min-h-[46px]"
                style={{
                  backgroundColor: "rgba(7, 24, 45, 0.72)",
                  border: "1px solid rgba(255, 255, 255, 0.5)",
                }}
              >
                <span>우주 아이디어 광장</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BRAND & 5 CORE BUSINESS PORTFOLIO (UNIFIED) */}
      <section className="py-16 lg:py-20 bg-white border-b border-[#E5EAF0]">
        <div className="container-shell space-y-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-2.5">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#147FC5]">
                VISION & 5 CORE BUSINESS AREAS
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#17212B] leading-snug">
                거대 자본의 독점을 넘어, 유연한 기술과 열린 연대로 우주를 엽니다
              </h2>
              <p className="text-sm sm:text-base text-[#5D6B78]">
                현재 운영 중인 콘텐츠·커뮤니티부터 연구·구상 단계의 고고도 실험·생존
                솔루션까지 5대 핵심 영역을 중심으로 나아갑니다.
              </p>
            </div>
            <div className="flex items-center gap-4 shrink-0">
              <Link
                href="/about"
                className="text-xs sm:text-sm font-semibold text-[#5D6B78] hover:text-[#17212B]"
              >
                회사 소개 →
              </Link>
              <Link
                href="/business"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#147FC5] hover:text-[#0B2340]"
              >
                <span>전체 사업·기술 보기</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {businessGroups.map((group) => (
              <Link
                key={group.id}
                href={`/business/${group.slug}`}
                className="group bg-[#F8FAFC] rounded-xl p-5 border border-[#E5EAF0] hover:border-[#147FC5] hover:bg-white transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="w-10 h-10 rounded-lg bg-[#E8F4FC] flex items-center justify-center">
                      {groupIcons[group.slug]}
                    </div>
                    <StatusBadge status={group.primaryStatus} />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-[#147FC5] uppercase tracking-wider">
                      {group.titleEn}
                    </p>
                    <h3 className="text-base font-bold text-[#17212B] mt-0.5 group-hover:text-[#147FC5] transition-colors">
                      {group.titleKo}
                    </h3>
                  </div>
                  <p className="text-xs text-[#5D6B78] line-clamp-2 leading-relaxed">
                    {group.summary}
                  </p>
                </div>
                <span className="text-xs font-semibold text-[#147FC5] inline-flex items-center gap-1">
                  상세 보기 <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SPACE STOWAWAY PROJECT (SIGNATURE) */}
      <section className="py-16 lg:py-20 bg-[#07182D] text-white border-b border-[#123454]">
        <div className="container-shell">
          <div className="rounded-2xl bg-[#0B2340] border border-[#123454] p-7 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#2998D6]">
                  SPACE STOWAWAY PROJECT · 우주밀항 프로젝트
                </span>
                <StatusBadge status="구상 단계" variant="dark" />
              </div>

              <h2 className="text-2xl sm:text-4xl font-bold text-white leading-tight">
                도착보다 중요한 것은 항해다.
              </h2>

              <p className="text-sm sm:text-base text-[#D9E6F2]/85 leading-relaxed max-w-xl">
                개인의 존재를 상징하는 초소형 캡슐(모근 포함 머리카락 1올)을 우주로
                보내기 위한 도전. 발사 기한을 섣불리 약속하는 대신, 성층권 실증부터
                도달할 때까지 시도를 지속하고 전 과정을 투명하게 기록합니다.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  href="/projects/space-stowaway"
                  className="px-5 py-3 rounded-lg bg-[#147FC5] hover:bg-[#2998D6] text-white font-semibold text-sm transition-colors inline-flex items-center gap-2"
                >
                  <span>프로젝트 상세 보기</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/insights/space-stowaway-project-why-we-chose-voyage"
                  className="px-4 py-3 rounded-lg border border-[#D9E6F2]/30 hover:bg-white/10 text-[#D9E6F2] text-sm font-semibold transition-colors"
                >
                  기획 노트 읽기
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-xl bg-[#07182D] border border-[#123454] p-5 space-y-3">
                <svg
                  viewBox="0 0 360 160"
                  className="w-full h-auto"
                  role="img"
                  aria-label="우주와 지구의 경계 곡면 위로 항해하는 소형 캡슐 개념 비주얼"
                >
                  <defs>
                    <linearGradient id="homeHorizonGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#2998D6" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#07182D" stopOpacity="0.95" />
                    </linearGradient>
                  </defs>
                  <path d="M -30 160 Q 180 75 390 160 Z" fill="url(#homeHorizonGlow)" />
                  <path
                    d="M -30 160 Q 180 75 390 160"
                    fill="none"
                    stroke="#2998D6"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M 90 130 Q 165 75 245 36"
                    fill="none"
                    stroke="#2998D6"
                    strokeWidth="1.75"
                    strokeDasharray="5 4"
                  />
                  <circle cx="90" cy="130" r="3" fill="#D9E6F2" />
                  <circle cx="166" cy="76" r="3" fill="#2998D6" />
                  <g transform="translate(245, 36) rotate(-25)">
                    <rect
                      x="-14"
                      y="-6.5"
                      width="28"
                      height="13"
                      rx="6.5"
                      fill="#D9E6F2"
                      stroke="#FFFFFF"
                    />
                    <circle cx="5" cy="0" r="2" fill="#07182D" />
                  </g>
                </svg>
                <div className="flex items-center justify-between text-[11px] text-[#D9E6F2]/75 pt-2 border-t border-[#123454]">
                  <span>상징적 페이로드: 모근 포함 머리카락 1올</span>
                  <span className="text-[#2998D6] font-semibold">항해 일지 공개</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SPACE IDEAS & INSIGHTS (COMPACT 2-COLUMN BOARD) */}
      <section className="py-16 lg:py-20 bg-[#F8FAFC] border-b border-[#E5EAF0]">
        <div className="container-shell grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left: SPACE IDEAS */}
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#147FC5]">
                  <MessageSquarePlus className="w-4 h-4" />
                  <span>SPACE IDEAS</span>
                </div>
                <h2 className="text-2xl font-bold text-[#17212B]">
                  우주 아이디어 광장
                </h2>
              </div>
              <Link
                href="/space-ideas"
                className="text-xs font-semibold text-[#147FC5] hover:underline inline-flex items-center gap-1"
              >
                전체 보기 <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {publicIdeas.map((idea) => (
                <Link
                  key={idea.id}
                  href={`/space-ideas/${idea.id}`}
                  className="block bg-white rounded-xl p-5 border border-[#E5EAF0] hover:border-[#147FC5] transition-colors space-y-2"
                >
                  <div className="flex items-center justify-between text-xs text-[#5D6B78]">
                    <span className="px-2 py-0.5 rounded-full bg-[#E8F4FC] text-[#147FC5] font-semibold">
                      {idea.category}
                    </span>
                    <span>{idea.createdAt.slice(0, 10)}</span>
                  </div>
                  <h3 className="text-base font-bold text-[#17212B] line-clamp-1">
                    {idea.title}
                  </h3>
                  <p className="text-xs text-[#5D6B78] line-clamp-2">
                    {idea.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* Right: INSIGHTS */}
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#147FC5]">
                  <BookOpen className="w-4 h-4" />
                  <span>INSIGHTS</span>
                </div>
                <h2 className="text-2xl font-bold text-[#17212B]">
                  최신 인사이트 & 리포트
                </h2>
              </div>
              <Link
                href="/insights"
                className="text-xs font-semibold text-[#147FC5] hover:underline inline-flex items-center gap-1"
              >
                전체 보기 <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {recentArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/insights/${article.slug}`}
                  className="block bg-white rounded-xl p-5 border border-[#E5EAF0] hover:border-[#147FC5] transition-colors space-y-2"
                >
                  <div className="flex items-center justify-between text-xs text-[#5D6B78]">
                    <span className="font-semibold text-[#147FC5]">
                      {article.category}
                    </span>
                    <span>{article.publishedAt}</span>
                  </div>
                  <h3 className="text-base font-bold text-[#17212B] line-clamp-1">
                    {article.title}
                  </h3>
                  {article.excerpt && (
                    <p className="text-xs text-[#5D6B78] line-clamp-2">
                      {article.excerpt}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. COMPACT CONTACT & PARTNERSHIP CTA */}
      <section className="py-14 lg:py-16 bg-white">
        <div className="container-shell">
          <div className="rounded-2xl bg-[#0B2340] text-white p-7 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#2998D6]">
                <Handshake className="w-4 h-4" />
                <span>CONTACT & PARTNERSHIP</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold">
                기술 연구, 생존 솔루션, 교육·콘텐츠 협력을 기다립니다
              </h2>
              <p className="text-xs sm:text-sm text-[#D9E6F2]/80">
                공동 실험 제안, 기업 파트너십, 일반 문의를 단일 창구에서 간편하게 접수하세요.
              </p>
            </div>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-lg bg-[#147FC5] hover:bg-[#2998D6] text-white font-semibold text-sm transition-colors inline-flex items-center gap-2 shrink-0"
            >
              <span>문의 및 협력 제안하기</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
