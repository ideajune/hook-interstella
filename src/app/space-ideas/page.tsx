"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Idea, IdeaCategory } from "@/lib/types";
import {
  ArrowRight,
  Award,
  Fingerprint,
  GitBranch,
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

type PostFilter = "ALL" | "idea" | "hookchain" | "discussion";

type EnrichedBoardIdea = Idea & {
  commentCount?: number;
  hookChainCount?: number;
  parentTitle?: string;
  parentStampId?: string;
};

export default function SpaceIdeasPage() {
  const [postFilter, setPostFilter] = useState<PostFilter>("ALL");
  const [ideas, setIdeas] = useState<EnrichedBoardIdea[]>([]);
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
    if (postFilter === "idea" && item.postType !== "idea") return false;
    if (postFilter === "discussion" && item.postType !== "discussion")
      return false;
    if (
      postFilter === "hookchain" &&
      (item.postType !== "idea" ||
        ((item.chainDepth ?? 1) <= 1 && (item.hookChainCount ?? 0) <= 1))
    ) {
      return false;
    }

    const matchCat = category === "ALL" || item.category === category;
    const q = search.trim().toLowerCase();
    const matchQuery =
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      (item.stampId && item.stampId.toLowerCase().includes(q));
    return matchCat && matchQuery;
  });

  return (
    <div>
      {/* Hero: Hooksum Anti-Patent & Stamping Philosophy */}
      <section className="bg-[#07182D] text-white py-14 lg:py-18 border-b border-[#123454]">
        <div className="container-shell space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#123454] text-[#5CC3FF] text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>SPACE IDEAS · HOOKSUM ARCHIVE</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
                우주 아이디어 토론광장 (훅섬, Hooksum)
              </h1>
              <p className="text-sm sm:text-base text-[#D9E6F2]/85 leading-relaxed">
                &ldquo;가두지 말고 먼저 박제하라.&rdquo; 아이디어를 명확한 시점 증명과
                함께 공개해 <strong className="text-white">선행기술(Prior Art)</strong>로
                남기고, 거대 자본의 특허 독점을 막으며 창작의 족보(Hook Chain)를
                이어가는 안티-특허 오픈 플랫폼입니다.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href="/space-ideas/submit"
                className="px-5 py-3 rounded-lg bg-[#147FC5] hover:bg-[#2998D6] text-white font-semibold text-sm inline-flex items-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>아이디어 박제 / 토론 등록</span>
              </Link>
            </div>
          </div>

          {/* 3-Step Hooksum Core Mechanism */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-2">
            <div className="rounded-xl bg-[#0B2340] border border-[#123454] p-4 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#5CC3FF]">
                <Fingerprint className="w-4 h-4" />
                <span>01 · 타임스탬프 박제 (Stamping)</span>
              </div>
              <p className="text-xs text-[#D9E6F2]/80 leading-relaxed">
                등록 즉시 고유 박제 번호(HOOK-YYYY-NNNN)와 SHA-256 디지털 인감을
                기록해 제3자의 독점 특허 등록을 막는 선행기술 지위를 확보합니다.
              </p>
            </div>

            <div className="rounded-xl bg-[#0B2340] border border-[#123454] p-4 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#5CC3FF]">
                <Award className="w-4 h-4" />
                <span>02 · 원작자 명예 증명서 (Certificate)</span>
              </div>
              <p className="text-xs text-[#D9E6F2]/80 leading-relaxed">
                독점 권리증 대신 &lsquo;내가 이 아이디어의 명예로운 시작점&rsquo;임을 공식
                선언하는 원작자 명예 증명서를 즉시 열람·출력할 수 있습니다.
              </p>
            </div>

            <div className="rounded-xl bg-[#0B2340] border border-[#123454] p-4 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#5CC3FF]">
                <GitBranch className="w-4 h-4" />
                <span>03 · 창작 족보 연결 (Hook Chain)</span>
              </div>
              <p className="text-xs text-[#D9E6F2]/80 leading-relaxed">
                최초 아이디어(제네시스 훅)에 영감을 받은 2차·3차 파생 아이디어를
                연결(Hooking)하여 모든 기여자의 창작 계보를 투명하게 남깁니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Balanced Defensive Publication & IP Notice */}
      <div className="bg-[#E8F4FC] border-b border-[#147FC5]/20 py-3">
        <div className="container-shell flex flex-wrap items-center justify-between gap-2 text-xs text-[#0B2340]">
          <span className="inline-flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#147FC5] shrink-0" />
            <span>
              공개 박제된 아이디어는 <strong>방어적 공개(선행기술)</strong>로 작동하여 타인의 특허 독점을 차단하며 권리는 원작자에게 유지됩니다. (직접 독점 특허를 출원할 기밀은 비공개 협력 문의를 이용해 주세요)
            </span>
          </span>
          <Link
            href="/community-rules"
            className="font-semibold text-[#147FC5] hover:underline shrink-0"
          >
            안티-특허 &amp; 운영원칙 보기 →
          </Link>
        </div>
      </div>

      {/* Main Board */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="container-shell space-y-6">
          {/* Search & Filter Bar */}
          <div className="bg-[#F8FAFC] rounded-xl p-4 border border-[#E5EAF0] space-y-3">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex flex-wrap gap-1.5 shrink-0">
                {[
                  { id: "ALL", label: "전체" },
                  { id: "idea", label: "박제 아이디어" },
                  { id: "hookchain", label: "훅체인 계보" },
                  { id: "discussion", label: "오픈 토론" },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setPostFilter(t.id as PostFilter)}
                    className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors ${
                      postFilter === t.id
                        ? "bg-[#07182D] text-white"
                        : "bg-white border border-[#E5EAF0] text-[#5D6B78]"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#5D6B78] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="박제 번호(HOOK-2026-...), 제목 또는 내용 검색..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-white border border-[#E5EAF0] text-sm"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {IDEA_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                    category === cat
                      ? "bg-[#147FC5] text-white"
                      : "bg-white border border-[#E5EAF0] text-[#5D6B78] hover:border-[#147FC5]"
                  }`}
                >
                  {cat === "ALL" ? "전체 분야" : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Ideas List */}
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="h-32 rounded-xl bg-slate-100 animate-pulse"
                />
              ))}
            </div>
          ) : filteredIdeas.length === 0 ? (
            <div className="rounded-xl p-10 text-center bg-[#F8FAFC] border border-[#E5EAF0] space-y-3">
              <p className="text-sm font-semibold text-[#17212B]">
                조건에 맞는 박제 아이디어 또는 토론이 없습니다.
              </p>
              <Link
                href="/space-ideas/submit"
                className="inline-block px-4 py-2 rounded-lg bg-[#147FC5] text-white text-xs font-semibold"
              >
                첫 아이디어 박제하기
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredIdeas.map((idea) => {
                const isIdea = idea.postType === "idea";
                const depth = idea.chainDepth ?? 1;
                const chainCount = idea.hookChainCount ?? 1;

                return (
                  <Link
                    key={idea.id}
                    href={`/space-ideas/${idea.id}`}
                    className="group rounded-xl border border-[#E5EAF0] hover:border-[#147FC5] p-5 bg-white transition-all space-y-2.5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                      <div className="flex flex-wrap items-center gap-2">
                        {isIdea && idea.stampId && (
                          <span className="px-2.5 py-0.5 rounded bg-[#07182D] text-[#5CC3FF] font-mono font-bold tracking-tight">
                            {idea.stampId}
                          </span>
                        )}
                        <span className="px-2.5 py-0.5 rounded-full bg-[#E8F4FC] text-[#147FC5] font-semibold">
                          {idea.category}
                        </span>
                        {isIdea ? (
                          <span
                            className={`px-2 py-0.5 rounded font-semibold ${
                              depth > 1
                                ? "bg-indigo-50 text-indigo-700 border border-indigo-200"
                                : "bg-slate-100 text-[#0B2340]"
                            }`}
                          >
                            {depth === 1 ? "제네시스 훅" : `${depth}차 파생 훅`}
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded bg-slate-100 text-[#5D6B78] font-medium">
                            오픈 토론
                          </span>
                        )}
                      </div>
                      <span className="text-[#5D6B78] tabular-nums">
                        {idea.createdAt.slice(0, 10)}
                      </span>
                    </div>

                    {isIdea && depth > 1 && idea.parentTitle && (
                      <div className="text-xs text-indigo-700 bg-indigo-50/70 px-3 py-1.5 rounded-lg inline-flex items-center gap-1.5 max-w-full">
                        <GitBranch className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">
                          연결된 상위 훅:{" "}
                          <strong>
                            {idea.parentStampId ? `[${idea.parentStampId}] ` : ""}
                            {idea.parentTitle}
                          </strong>
                        </span>
                      </div>
                    )}

                    <h2 className="text-lg font-bold text-[#17212B] group-hover:text-[#147FC5] transition-colors">
                      {idea.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-[#5D6B78] line-clamp-2">
                      {idea.description}
                    </p>

                    <div className="pt-3 border-t border-[#E5EAF0] flex flex-wrap items-center justify-between gap-2 text-xs text-[#5D6B78]">
                      <div className="flex flex-wrap items-center gap-3">
                        <span>
                          원작자:{" "}
                          <strong className="text-[#17212B]">
                            {idea.displayMode === "anonymous"
                              ? "익명 참여자"
                              : idea.authorName}
                          </strong>
                        </span>
                        {isIdea && idea.stampHash && (
                          <span className="hidden sm:inline-flex items-center gap-1 font-mono text-[11px] text-slate-500">
                            <Fingerprint className="w-3.5 h-3.5 text-[#147FC5]" />
                            SHA-256: {idea.stampHash.slice(0, 10)}…
                            {idea.stampHash.slice(-6)}
                          </span>
                        )}
                        {isIdea && chainCount > 1 && (
                          <span className="inline-flex items-center gap-1 text-indigo-700 font-semibold">
                            <GitBranch className="w-3.5 h-3.5" />
                            족보 {chainCount}세대
                          </span>
                        )}
                        <span className="inline-flex items-center gap-1">
                          <MessageSquare className="w-3.5 h-3.5 text-[#147FC5]" />
                          {idea.commentCount ?? 0}
                        </span>
                      </div>
                      <span className="font-semibold text-[#147FC5] inline-flex items-center gap-1">
                        {isIdea ? "박제 증명 & 족보 보기" : "토론 참여하기"}{" "}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
