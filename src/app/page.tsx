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
  ChevronDown,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const db = readDb();
  const businessGroups = [...db.businessGroups].sort(
    (a, b) => a.displayOrder - b.displayOrder
  );
  const highlightedTech = db.technologyTopics.slice(0, 4);
  const publicIdeas = db.ideas
    .filter((i) => i.moderationStatus === "published")
    .slice(0, 3);
  const recentArticles = db.articles
    .filter((a) => a.status === "published")
    .slice(0, 3);

  const groupIcons: Record<string, React.ReactNode> = {
    "space-technology": <Compass className="w-6 h-6 text-[#147FC5]" />,
    "space-survival": <ShieldAlert className="w-6 h-6 text-[#147FC5]" />,
    "education-community": <Users className="w-6 h-6 text-[#147FC5]" />,
    "revenue-ip": <Lightbulb className="w-6 h-6 text-[#147FC5]" />,
    "global-network": <Globe2 className="w-6 h-6 text-[#147FC5]" />,
  };

  return (
    <div>
      {/* 1. HERO SECTION */}
      <section className="relative bg-[#07182D] text-white overflow-hidden">
        {/* High-resolution NASA orbital horizon & spacecraft module photograph (original vivid brightness) */}
        <div
          className="absolute inset-0 bg-cover bg-center hero-bg-kenburns"
          style={{
            backgroundImage: "url('/images/hero-space.jpg')",
          }}
          role="img"
          aria-label="저궤도 우주정거장 모듈과 푸른 지구의 지평선 실사 이미지"
        />
        {/* Light localized gradient behind left text only, keeping original photo bright and clear */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(7,24,45,0.62) 0%, rgba(7,24,45,0.32) 45%, rgba(7,24,45,0) 75%)",
          }}
        />
        {/* Subtle bottom-edge fade for the boundary transition */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(7,24,45,0) 0%, rgba(7,24,45,0) 80%, rgba(7,24,45,0.75) 94%, #07182D 100%)",
          }}
        />

        <div
          className="container-shell relative py-24 sm:py-32 lg:py-40"
          style={{ paddingBottom: "2.25rem" }}
        >
          <div className="max-w-3xl space-y-6">
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
              className="text-lg sm:text-xl text-white font-medium leading-relaxed max-w-2xl"
              style={{
                textShadow:
                  "0 2px 12px rgba(7, 24, 45, 0.95), 0 1px 3px rgba(0, 0, 0, 0.9)",
              }}
            >
              HOOK INTERSTELLAR는 고고도·우주 접근 기술, 극한환경 생존 솔루션,
              인재·교육 커뮤니티, 지식재산(IP) 사업화 및 대중 참여형 우주 아이디어
              플랫폼을 연결하는 우주산업 혁신 생태계입니다.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/business"
                className="px-6 py-3.5 rounded-lg bg-[#147FC5] hover:bg-[#2998D6] text-white font-semibold text-sm sm:text-base transition-colors inline-flex items-center gap-2 min-h-[48px]"
              >
                <span>사업 분야 살펴보기</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                href="/space-ideas"
                className="px-6 py-3.5 rounded-lg text-white font-semibold text-sm sm:text-base transition-colors inline-flex items-center gap-2 min-h-[48px]"
                style={{
                  backgroundColor: "rgba(7, 24, 45, 0.72)",
                  border: "1px solid rgba(255, 255, 255, 0.5)",
                }}
              >
                <span>우주 아이디어 참여하기</span>
              </Link>
            </div>
          </div>

          <div
            className="mt-16 pt-8 border-t flex flex-wrap items-center justify-between gap-4 text-xs text-white font-medium"
            style={{
              borderColor: "rgba(255, 255, 255, 0.28)",
              textShadow: "0 1px 6px rgba(7, 24, 45, 0.95)",
            }}
          >
            <div className="flex items-center gap-2">
              <ChevronDown className="w-4 h-4 text-[#5CC3FF]" aria-hidden="true" />
              <span>5대 핵심 비즈니스 그룹 · 단계별 기술 연구 로드맵 · SPACE IDEAS 오픈 플랫폼</span>
            </div>
            <span>투명성 원칙: 운영 중 · 개발 중 · 연구 주제 · 구상 단계 명시</span>
          </div>
        </div>
      </section>

      {/* Compact gradient boundary (50% reduced height: 68px) transitioning smoothly to white */}
      <div
        aria-hidden="true"
        className="w-full"
        style={{
          height: "68px",
          background:
            "linear-gradient(180deg, #07182D 0%, #1B3B63 25%, #567CA6 55%, #B8CDE2 82%, #FFFFFF 100%)",
        }}
      />

      {/* 2. BRAND INTRODUCTION */}
      <section className="pt-12 pb-20 lg:pt-16 lg:pb-28 bg-white border-b border-[#E5EAF0]">
        <div className="container-shell">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#147FC5]">
                BRAND IDENTITY & DIRECTION
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#17212B] leading-tight">
                거대 자본의 독점을 넘어,
                <br />
                유연한 기술과 열린 연대로 우주를 열어갑니다.
              </h2>
              <p className="text-base sm:text-lg text-[#5D6B78] leading-relaxed">
                오늘날 우주 탐사와 관련 산업은 여전히 막대한 비용과 높은 진입장벽에
                둘러싸여 있습니다. 후크인터스텔라(주)는 고고도 성층권 실험부터 극한환경
                생존 기술, 과학 콘텐츠와 오픈 커뮤니티까지 현실적이고 단계적인 접근법을
                추구합니다.
              </p>
              <p className="text-base text-[#5D6B78] leading-relaxed">
                우리는 현재 수행 중인 출판·콘텐츠·커뮤니티 사업과 중장기적으로 탐구하는
                발사체·생존장비·투자 구상을 투명하게 구분하며, 연구자·기업·시민이 함께
                참여할 수 있는 신뢰할 수 있는 플랫폼을 지향합니다.
              </p>
              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#147FC5] hover:text-[#0B2340]"
                >
                  <span>회사 소개 및 비전 자세히 보기</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-[#0B2340] text-white p-8 border border-[#123454] space-y-6">
                <div className="space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#2998D6]">
                    OUR MISSION STATEMENT
                  </span>
                  <p className="text-xl font-bold leading-snug">
                    “정해진 항로를 따르기보다, 최소한의 자원으로 최대의 가능성을
                    여는 새로운 우주 생태계를 설계합니다.”
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#123454] text-sm">
                  <div>
                    <p className="text-2xl font-bold text-white tabular-nums">5 Groups</p>
                    <p className="text-xs text-[#D9E6F2]/80 mt-1">핵심 비즈니스 포트폴리오</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white tabular-nums">31 Projects</p>
                    <p className="text-xs text-[#D9E6F2]/80 mt-1">세부 추진 사업 및 연구 과제</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white tabular-nums">6 Domains</p>
                    <p className="text-xs text-[#D9E6F2]/80 mt-1">핵심 기술 및 연구 주제</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white tabular-nums">Open IP</p>
                    <p className="text-xs text-[#D9E6F2]/80 mt-1">권리 보호형 아이디어 광장</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. BUSINESS PORTFOLIO (5 GROUPS) */}
      <section className="py-20 lg:py-28 bg-[#F8FAFC] border-b border-[#E5EAF0]">
        <div className="container-shell space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#147FC5]">
                BUSINESS PORTFOLIO
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#17212B]">
                5대 핵심 사업 분야
              </h2>
              <p className="text-base text-[#5D6B78]">
                유기적으로 연결된 5개 비즈니스 그룹을 중심으로 단계별 연구·개발 및 운영
                현황을 투명하게 공개합니다.
              </p>
            </div>
            <Link
              href="/business"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#147FC5] hover:text-[#0B2340]"
            >
              <span>전체 세부 사업 현황 보기</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {businessGroups.map((group) => (
              <Link
                key={group.id}
                href={`/business/${group.slug}`}
                className="group bg-white rounded-xl p-7 border border-[#E5EAF0] hover:border-[#147FC5] transition-all duration-200 hover:-translate-y-0.5 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <div className="w-12 h-12 rounded-lg bg-[#E8F4FC] flex items-center justify-center">
                      {groupIcons[group.slug]}
                    </div>
                    <StatusBadge status={group.primaryStatus} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#147FC5] tracking-wider uppercase">
                      {group.titleEn}
                    </p>
                    <h3 className="text-xl font-bold text-[#17212B] mt-1 group-hover:text-[#147FC5] transition-colors">
                      {group.titleKo}
                    </h3>
                  </div>
                  <p className="text-sm text-[#5D6B78] leading-relaxed">
                    {group.summary}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#E5EAF0] flex items-center justify-between text-xs font-semibold text-[#17212B] group-hover:text-[#147FC5]">
                  <span>세부 사업 및 협력 분야 보기</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. TECHNOLOGY & FUTURE THEMES */}
      <section className="py-20 lg:py-28 bg-[#0B2340] text-white border-b border-[#123454]">
        <div className="container-shell space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#2998D6]">
                TECHNOLOGY & RESEARCH THEMES
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white">
                핵심 기술 및 미래 연구 분야
              </h2>
              <p className="text-base text-[#D9E6F2]/85">
                현재 개발 중인 생존 장비 기획부터 중장기 연구 주제인 성층권 플랫폼·폐쇄형
                생태계까지 각 주제의 기술적 과제를 투명하게 공유합니다.
              </p>
            </div>
            <Link
              href="/technology"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#2998D6] hover:text-white"
            >
              <span>전체 기술 도메인 살펴보기</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {highlightedTech.map((tech) => (
              <div
                key={tech.id}
                className="rounded-xl bg-[#123454]/80 border border-[#D9E6F2]/20 p-7 flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-[#2998D6] uppercase tracking-wider">
                      {tech.domain}
                    </span>
                    <StatusBadge status={tech.status} variant="dark" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{tech.title}</h3>
                  <p className="text-sm text-[#D9E6F2]/85 leading-relaxed">
                    {tech.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#D9E6F2]/15 space-y-2 text-xs text-[#D9E6F2]/80">
                  <p>
                    <strong className="text-white">협력 필요 분야:</strong>{" "}
                    {tech.collaborationNeeds}
                  </p>
                  <p className="text-[11px] text-[#D9E6F2]/60 italic">
                    * {tech.conceptNote}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. ECOSYSTEM INTRODUCTION */}
      <section className="py-20 lg:py-28 bg-white border-b border-[#E5EAF0]">
        <div className="container-shell space-y-12">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#147FC5]">
              ECOSYSTEM & PARTICIPATION
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#17212B]">
              누구나 자신의 전문성으로 참여하는 우주산업 생태계
            </h2>
            <p className="text-base text-[#5D6B78]">
              일반 시민과 학생부터 연구자, 기술 기업, 교육기관까지 각자의 위치에서
              HOOK INTERSTELLAR 생태계와 연결될 수 있습니다.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                target: "개인 · 우주 관심층",
                title: "우주 아이디어 & 지식 교류",
                desc: "SPACE IDEAS에서 우주 기술, 생존, 주거에 관한 질문과 아이디어를 제안하고 토론에 참여합니다.",
                link: "/space-ideas",
                cta: "아이디어 광장 가기",
              },
              {
                target: "학생 · 교육기관",
                title: "과학·생존 교육 및 콘텐츠",
                desc: "출판물, 고고도 과학 실험 개념, 극한환경 생존 원리를 다루는 교육 콘텐츠와 체험 프로그램을 탐색합니다.",
                link: "/ecosystem",
                cta: "교육 생태계 보기",
              },
              {
                target: "연구자 · 엔지니어",
                title: "고고도 실험 & 극한기술 연구",
                desc: "성층권 탑재체 시험, 폐쇄형 생태계, 특수 소재 및 식품 공학 등 다학제 공동 연구 주제를 논의합니다.",
                link: "/technology",
                cta: "연구 주제 확인하기",
              },
              {
                target: "기업 · 기관 파트너",
                title: "공동 R&D · IP · 공급 협력",
                desc: "보유 기술의 우주/재난 스핀오프 사업화, IP 라이선싱, 시제품 제작 및 글로벌 소싱 협력을 제안합니다.",
                link: "/partnership",
                cta: "협력 제안하기",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="rounded-xl p-6 bg-[#F8FAFC] border border-[#E5EAF0] flex flex-col justify-between space-y-6"
              >
                <div className="space-y-2.5">
                  <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded bg-[#E8F4FC] text-[#147FC5]">
                    {item.target}
                  </span>
                  <h3 className="text-lg font-bold text-[#17212B]">{item.title}</h3>
                  <p className="text-sm text-[#5D6B78] leading-relaxed">{item.desc}</p>
                </div>
                <Link
                  href={item.link}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#147FC5] hover:text-[#0B2340]"
                >
                  <span>{item.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. SPACE IDEAS FEATURE */}
      <section className="py-20 lg:py-28 bg-[#F8FAFC] border-b border-[#E5EAF0]">
        <div className="container-shell space-y-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#147FC5]">
                <MessageSquarePlus className="w-4 h-4" />
                <span>SPACE IDEAS — OPEN INNOVATION COMMUNITY</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#17212B]">
                당신의 질문과 아이디어가 새로운 항로가 됩니다
              </h2>
              <p className="text-base text-[#5D6B78]">
                우주 기술, 우주식품·생존, 주거·생활, 교육까지 자유롭게 아이디어를
                공유하세요. 공개 게시물의 지식재산권은 작성자에게 유지되며, 명확한
                운영 원칙과 모더레이션 아래 안전하게 소통합니다.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/space-ideas"
                className="px-5 py-3 rounded-lg border border-[#17212B]/20 bg-white hover:border-[#147FC5] text-[#17212B] text-sm font-semibold transition-colors min-h-[44px] inline-flex items-center"
              >
                아이디어 둘러보기
              </Link>
              <Link
                href="/space-ideas/submit"
                className="px-5 py-3 rounded-lg bg-[#147FC5] hover:bg-[#2998D6] text-white text-sm font-semibold transition-colors min-h-[44px] inline-flex items-center gap-2"
              >
                <span>아이디어 등록하기</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {publicIdeas.map((idea) => (
              <Link
                key={idea.id}
                href={`/space-ideas/${idea.id}`}
                className="bg-white rounded-xl p-6 border border-[#E5EAF0] hover:border-[#147FC5] transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#E8F4FC] text-[#147FC5] font-semibold">
                      {idea.category}
                    </span>
                    <span className="text-[#5D6B78]">
                      {idea.postType === "discussion" ? "토론 프롬프트" : "아이디어"}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#17212B] line-clamp-2">
                    {idea.title}
                  </h3>
                  <p className="text-sm text-[#5D6B78] line-clamp-3 leading-relaxed">
                    {idea.description}
                  </p>
                </div>
                <div className="pt-4 border-t border-[#E5EAF0] flex items-center justify-between text-xs text-[#5D6B78]">
                  <span>
                    작성자:{" "}
                    {idea.displayMode === "anonymous" ? "익명 참여자" : idea.authorName}
                  </span>
                  <span>{idea.createdAt.slice(0, 10)}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7. INSIGHTS PREVIEW */}
      <section className="py-20 lg:py-28 bg-white border-b border-[#E5EAF0]">
        <div className="container-shell space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#147FC5]">
                <BookOpen className="w-4 h-4" />
                <span>INSIGHTS & EDITORIAL</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#17212B]">
                최신 인사이트 및 연구 노트
              </h2>
              <p className="text-base text-[#5D6B78]">
                우주산업 동향, 고고도 실험 연구, 극한 생존 기술 및 커뮤니티 운영
                리포트를 전합니다.
              </p>
            </div>
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#147FC5] hover:text-[#0B2340]"
            >
              <span>전체 인사이트 보기</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentArticles.map((article) => (
              <Link
                key={article.id}
                href={`/insights/${article.slug}`}
                className="group rounded-xl border border-[#E5EAF0] hover:border-[#147FC5] p-6 transition-all flex flex-col justify-between space-y-5 bg-white"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-[#5D6B78]">
                    <span className="font-semibold text-[#147FC5]">
                      {article.category}
                    </span>
                    <span className="tabular-nums">{article.publishedAt}</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#17212B] group-hover:text-[#147FC5] transition-colors leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-sm text-[#5D6B78] line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
                <div className="pt-4 border-t border-[#E5EAF0] flex items-center justify-between text-xs font-semibold text-[#17212B] group-hover:text-[#147FC5]">
                  <span>아티클 전문 읽기</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 8. PARTNERSHIP CTA */}
      <section className="py-20 lg:py-24 bg-[#07182D] text-white">
        <div className="container-shell">
          <div className="rounded-2xl bg-[#0B2340] border border-[#123454] p-8 sm:p-12 lg:p-14 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#2998D6]">
                <Handshake className="w-4 h-4" />
                <span>PARTNERSHIP & COLLABORATION</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                기술 연구, 생존 솔루션, 교육·콘텐츠 협력을 기다립니다
              </h2>
              <p className="text-sm sm:text-base text-[#D9E6F2]/85 leading-relaxed">
                대학·연구실의 공동 실험 제안부터 소재·식품·장비 기업의 기술 제휴,
                교육 및 출판 프로젝트까지 HOOK INTERSTELLAR와 함께할 파트너십을
                제안해 주세요.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <Link
                href="/partnership"
                className="px-6 py-3.5 rounded-lg bg-[#147FC5] hover:bg-[#2998D6] text-white font-semibold text-sm sm:text-base transition-colors inline-flex items-center gap-2 min-h-[48px]"
              >
                <span>협력 제안하기</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3.5 rounded-lg border border-[#D9E6F2]/30 hover:bg-white/10 text-white font-semibold text-sm sm:text-base transition-colors inline-flex items-center min-h-[48px]"
              >
                일반 문의하기
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
