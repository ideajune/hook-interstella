"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Idea, IdeaCategory } from "@/lib/types";
import {
  AlertTriangle,
  ArrowRight,
  Compass,
  FlaskConical,
  MessageSquare,
  PlusCircle,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const IDEA_CATEGORIES: ("ALL" | IdeaCategory)[] = [
  "ALL",
  "우주 기술",
  "우주여행·관광",
  "우주식품·생존",
  "우주 주거·생활",
  "우주 자원·에너지",
  "교육·콘텐츠",
  "기타",
];

type SubTab = "board" | "discussion" | "challenge" | "lab";

export default function SpaceIdeasPage() {
  const [activeTab, setActiveTab] = useState<SubTab>("board");
  const [ideas, setIdeas] = useState<(Idea & { commentCount?: number })[]>([]);
  const [category, setCategory] = useState<"ALL" | IdeaCategory>("ALL");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/space-ideas")
      .then((res) => res.json())
      .then((data) => {
        setIdeas(data.ideas ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredIdeas = ideas.filter((item) => {
    if (activeTab === "board" && item.postType !== "idea") return false;
    if (activeTab === "discussion" && item.postType !== "discussion") return false;
    const matchCat = category === "ALL" || item.category === category;
    const q = search.trim().toLowerCase();
    const matchQuery =
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q);
    return matchCat && matchQuery;
  });

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#07182D] text-white py-20 lg:py-24 border-b border-[#123454]">
        <div className="container-shell space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#123454] text-[#2998D6] text-xs font-semibold tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>SPACE IDEAS — PUBLIC PARTICIPATION PLATFORM</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-bold leading-tight">
                우주 아이디어 & 오픈 디스커션 광장
              </h1>
              <p className="text-base sm:text-lg text-[#D9E6F2]/85 leading-relaxed">
                우주 기술, 극한 생존, 미래 주거, 교육까지 우주에 관한 질문과
                아이디어를 등록하고 의견을 나누세요. 모든 게시물은 작성자의 지식재산권을
                존중하며 투명한 커뮤니티 운영 원칙 아래 관리됩니다.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 shrink-0">
              <Link
                href="/space-ideas/submit"
                className="px-6 py-3.5 rounded-lg bg-[#147FC5] hover:bg-[#2998D6] text-white font-semibold text-sm inline-flex items-center gap-2 min-h-[48px]"
              >
                <PlusCircle className="w-4 h-4" />
                <span>아이디어 / 질문 등록하기</span>
              </Link>
              <Link
                href="/community-rules"
                className="px-4 py-3.5 rounded-lg border border-[#D9E6F2]/30 hover:bg-white/10 text-[#D9E6F2] text-sm font-semibold inline-flex items-center min-h-[48px]"
              >
                IP 보호 및 운영원칙
              </Link>
            </div>
          </div>

          {/* 4 Sub-navigation Tabs */}
          <div
            role="tablist"
            aria-label="SPACE IDEAS 하위 메뉴"
            className="pt-6 border-t border-[#123454] flex flex-wrap gap-2"
          >
            {[
              { id: "board", label: "IDEA BOARD (아이디어 보드)" },
              { id: "discussion", label: "DISCUSSION (주제 토론)" },
              { id: "challenge", label: "IDEA CHALLENGE (향후 확장 안내)" },
              { id: "lab", label: "IDEA LAB (향후 확장 안내)" },
            ].map((tab) => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isSelected}
                  type="button"
                  onClick={() => setActiveTab(tab.id as SubTab)}
                  className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors min-h-[44px] ${
                    isSelected
                      ? "bg-[#147FC5] text-white"
                      : "bg-[#0B2340] text-[#D9E6F2] hover:bg-[#123454] hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mandatory IP Protection & Public Disclosure Notice Banner */}
      <section className="bg-[#E8F4FC] border-b border-[#147FC5]/25 py-5">
        <div className="container-shell flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs sm:text-sm text-[#0B2340]">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#147FC5] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold">
                지식재산권(IP) 보호 및 공개 게시물 유의사항 안내
              </p>
              <p className="text-[#0B2340]/85 leading-relaxed">
                1) 본 게시판에 아이디어를 공개 등록하더라도 아이디어의 소유권은 회사로
                이전되지 않습니다. 2) 사업화·공동개발 검토는 별도의 명시적 동의와 계약을
                전제로 합니다. 3) 공개 게시물은 비밀 유지(NDA) 대상이 아니며, 특허 출원을
                고려 중인 발명은 공개 전 변리사 등 전문가 검토를 권장합니다.
              </p>
            </div>
          </div>
          <Link
            href="/contact?channel=private_proposal"
            className="px-3.5 py-2 rounded-lg bg-white border border-[#147FC5]/40 text-xs font-semibold text-[#0B2340] hover:border-[#147FC5] shrink-0"
          >
            비공개 제안 문의 경로 →
          </Link>
        </div>
      </section>

      {/* Main Content Area by SubTab */}
      {(activeTab === "board" || activeTab === "discussion") && (
        <section className="py-14 lg:py-20 bg-white">
          <div className="container-shell space-y-8">
            {/* Search & Category Filter */}
            <div className="bg-[#F8FAFC] rounded-xl p-5 border border-[#E5EAF0] space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-[#5D6B78] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={
                      activeTab === "board"
                        ? "아이디어 제목 또는 내용 검색..."
                        : "토론 주제 검색..."
                    }
                    aria-label="아이디어 및 토론 검색"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white border border-[#E5EAF0] text-sm text-[#17212B]"
                  />
                </div>
                {(category !== "ALL" || search) && (
                  <button
                    type="button"
                    onClick={() => {
                      setCategory("ALL");
                      setSearch("");
                    }}
                    className="px-4 py-2.5 rounded-lg bg-white border border-[#E5EAF0] text-xs font-semibold text-[#5D6B78] hover:text-[#17212B]"
                  >
                    필터 초기화
                  </button>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {IDEA_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors min-h-[34px] ${
                      category === cat
                        ? "bg-[#147FC5] text-white"
                        : "bg-white border border-[#E5EAF0] text-[#17212B] hover:border-[#147FC5]"
                    }`}
                  >
                    {cat === "ALL" ? "전체 카테고리" : cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Listing */}
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className="h-40 rounded-xl bg-slate-100 animate-pulse"
                  />
                ))}
              </div>
            ) : filteredIdeas.length === 0 ? (
              <div className="rounded-xl p-12 text-center bg-[#F8FAFC] border border-[#E5EAF0] space-y-4">
                <p className="text-base font-semibold text-[#17212B]">
                  조회된 게시물이 없습니다. 첫 번째 아이디어나 질문을 등록해 보세요!
                </p>
                <div className="flex justify-center gap-3">
                  <Link
                    href="/space-ideas/submit"
                    className="px-5 py-2.5 rounded-lg bg-[#147FC5] text-white text-xs font-semibold"
                  >
                    새 아이디어 등록하기
                  </Link>
                  {(category !== "ALL" || search) && (
                    <button
                      type="button"
                      onClick={() => {
                        setCategory("ALL");
                        setSearch("");
                      }}
                      className="px-4 py-2.5 rounded-lg border border-[#E5EAF0] bg-white text-xs font-semibold text-[#17212B]"
                    >
                      전체 목록 보기
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5">
                {filteredIdeas.map((idea) => (
                  <Link
                    key={idea.id}
                    href={`/space-ideas/${idea.id}`}
                    className="group rounded-xl border border-[#E5EAF0] hover:border-[#147FC5] p-6 sm:p-7 bg-white transition-all flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2.5">
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-1 rounded-full bg-[#E8F4FC] text-[#147FC5] font-semibold">
                            {idea.category}
                          </span>
                          <span className="px-2.5 py-1 rounded bg-slate-100 text-[#5D6B78] font-medium">
                            {idea.postType === "discussion"
                              ? "DISCUSSION (토론)"
                              : "IDEA BOARD"}
                          </span>
                        </div>
                        <span className="text-[#5D6B78] tabular-nums">
                          {idea.createdAt.slice(0, 10)}
                        </span>
                      </div>

                      <h2 className="text-xl font-bold text-[#17212B] group-hover:text-[#147FC5] transition-colors">
                        {idea.title}
                      </h2>

                      <p className="text-sm text-[#5D6B78] line-clamp-2 leading-relaxed">
                        {idea.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#E5EAF0] flex flex-wrap items-center justify-between gap-3 text-xs text-[#5D6B78]">
                      <div className="flex items-center gap-4">
                        <span>
                          작성자:{" "}
                          <strong className="text-[#17212B]">
                            {idea.displayMode === "anonymous"
                              ? "익명 참여자"
                              : idea.authorName}
                          </strong>
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <MessageSquare className="w-3.5 h-3.5 text-[#147FC5]" />
                          댓글 {idea.commentCount ?? 0}개
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-1 font-semibold text-[#147FC5]">
                        상세 보기 및 의견 남기기 <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* IDEA CHALLENGE (Phase 2 Transparent Roadmap View) */}
      {activeTab === "challenge" && (
        <section className="py-16 lg:py-24 bg-white">
          <div className="container-shell max-w-3xl space-y-6">
            <div className="rounded-2xl border border-[#E5EAF0] bg-[#F8FAFC] p-8 sm:p-10 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold">
                <Compass className="w-4 h-4" />
                <span>PHASE 2 로드맵 기능 안내 (현재 준비 단계)</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#17212B]">
                IDEA CHALLENGE — 기간 한정 주제별 우주 아이디어 공모
              </h2>
              <p className="text-base text-[#5D6B78] leading-relaxed">
                IDEA CHALLENGE는 성층권 탑재체 경량화, 극한 재난 비상식량 레시피,
                고립 거주 공간 모듈 설계 등 특정 기술·생존 주제를 지정하여 기간 한정으로
                아이디어를 접수하는 프로그램입니다.
              </p>
              <div className="rounded-xl bg-white p-5 border border-[#E5EAF0] space-y-2 text-sm text-[#17212B]">
                <p className="font-bold text-[#147FC5]">
                  투명성 고지 (PRD Phase 2 기준)
                </p>
                <p className="text-[#5D6B78] leading-relaxed">
                  현재 MVP 단계에서는 상시 개방된 <strong>IDEA BOARD</strong>와{" "}
                  <strong>DISCUSSION</strong>을 우선 운영하며, 별도 심사위원단 및 공모
                  규정이 확정된 후 IDEA CHALLENGE가 개설될 예정입니다. 지금 아이디어를
                  공유하고 싶으신 분은 IDEA BOARD를 이용해 주세요.
                </p>
              </div>
              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTab("board")}
                  className="px-5 py-2.5 rounded-lg bg-[#147FC5] text-white text-sm font-semibold"
                >
                  IDEA BOARD 보러가기
                </button>
                <Link
                  href="/space-ideas/submit"
                  className="px-5 py-2.5 rounded-lg border border-[#E5EAF0] bg-white text-[#17212B] text-sm font-semibold"
                >
                  상시 아이디어 등록하기
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* IDEA LAB (Phase 2 Transparent Roadmap View) */}
      {activeTab === "lab" && (
        <section className="py-16 lg:py-24 bg-white">
          <div className="container-shell max-w-3xl space-y-6">
            <div className="rounded-2xl border border-[#E5EAF0] bg-[#F8FAFC] p-8 sm:p-10 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F4FC] text-[#0B2340] text-xs font-bold">
                <FlaskConical className="w-4 h-4 text-[#147FC5]" />
                <span>PHASE 2 로드맵 기능 안내 (후속 연구 검토 워크플로)</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#17212B]">
                IDEA LAB — 우수 아이디어 후속 검토 및 공동개발 매칭
              </h2>
              <p className="text-base text-[#5D6B78] leading-relaxed">
                IDEA LAB은 커뮤니티에 제안된 아이디어 중 기술적 타당성이나 교육·생존
                솔루션 활용 가치가 높은 주제를 선정하여, 제안자의 사전 동의와 별도
                계약을 거쳐 산학연 파트너와 함께 검토하는 후속 프로그램입니다.
              </p>
              <div className="rounded-xl bg-white p-5 border border-[#E5EAF0] space-y-2 text-sm">
                <p className="font-bold text-[#17212B] flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>권리 보호 및 비공개 제안 안내</span>
                </p>
                <p className="text-[#5D6B78] leading-relaxed">
                  현재 IDEA LAB 자동 매칭 워크플로는 Phase 2 확장 대상입니다. 공개
                  게시판에 올리기 어려운 기업/연구실 단위의 비공개 기술 협력 제안은
                  아래 비공개 문의 채널이나 PARTNERSHIP 메뉴를 통해 접수하실 수 있습니다.
                </p>
              </div>
              <div className="pt-2 flex flex-wrap gap-3">
                <Link
                  href="/contact?channel=private_proposal"
                  className="px-5 py-2.5 rounded-lg bg-[#147FC5] text-white text-sm font-semibold"
                >
                  비공개 제안 채널 이동
                </Link>
                <Link
                  href="/partnership"
                  className="px-5 py-2.5 rounded-lg border border-[#E5EAF0] bg-white text-[#17212B] text-sm font-semibold"
                >
                  기업·기관 파트너십 제안
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
