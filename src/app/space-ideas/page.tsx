"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Idea, IdeaCategory } from "@/lib/types";
import {
  ArrowRight,
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

type PostFilter = "ALL" | "idea" | "discussion";

export default function SpaceIdeasPage() {
  const [postFilter, setPostFilter] = useState<PostFilter>("ALL");
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
    if (postFilter !== "ALL" && item.postType !== postFilter) return false;
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
      {/* Compact Hero */}
      <section className="bg-[#07182D] text-white py-14 lg:py-18 border-b border-[#123454]">
        <div className="container-shell flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#123454] text-[#2998D6] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SPACE IDEAS</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
              우주 아이디어 & 오픈 토론 광장
            </h1>
            <p className="text-sm sm:text-base text-[#D9E6F2]/85">
              우주 기술, 극한 생존, 미래 주거에 관한 아이디어를 자유롭게
              제안하고 의견을 나누세요.
            </p>
          </div>

          <Link
            href="/space-ideas/submit"
            className="px-5 py-3 rounded-lg bg-[#147FC5] hover:bg-[#2998D6] text-white font-semibold text-sm inline-flex items-center gap-2 shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>아이디어 / 질문 등록하기</span>
          </Link>
        </div>
      </section>

      {/* 1-Line IP Notice */}
      <div className="bg-[#E8F4FC] border-b border-[#147FC5]/20 py-3">
        <div className="container-shell flex flex-wrap items-center justify-between gap-2 text-xs text-[#0B2340]">
          <span className="inline-flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#147FC5] shrink-0" />
            <span>
              공개 등록된 아이디어의 지식재산권은 작성자에게 유지됩니다. (특허 출원 전 기밀은 비공개 문의를 이용해 주세요)
            </span>
          </span>
          <Link href="/community-rules" className="font-semibold text-[#147FC5] hover:underline">
            운영원칙 보기 →
          </Link>
        </div>
      </div>

      {/* Main Board */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="container-shell space-y-6">
          {/* Compact Search & Filter Bar */}
          <div className="bg-[#F8FAFC] rounded-xl p-4 border border-[#E5EAF0] space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex gap-1.5 shrink-0">
                {[
                  { id: "ALL", label: "전체" },
                  { id: "idea", label: "아이디어" },
                  { id: "discussion", label: "토론" },
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
                  placeholder="제목 또는 내용 검색..."
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
                <div key={n} className="h-32 rounded-xl bg-slate-100 animate-pulse" />
              ))}
            </div>
          ) : filteredIdeas.length === 0 ? (
            <div className="rounded-xl p-10 text-center bg-[#F8FAFC] border border-[#E5EAF0] space-y-3">
              <p className="text-sm font-semibold text-[#17212B]">
                조건에 맞는 게시물이 없습니다.
              </p>
              <Link
                href="/space-ideas/submit"
                className="inline-block px-4 py-2 rounded-lg bg-[#147FC5] text-white text-xs font-semibold"
              >
                새 아이디어 등록하기
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredIdeas.map((idea) => (
                <Link
                  key={idea.id}
                  href={`/space-ideas/${idea.id}`}
                  className="group rounded-xl border border-[#E5EAF0] hover:border-[#147FC5] p-5 bg-white transition-all space-y-2.5"
                >
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#E8F4FC] text-[#147FC5] font-semibold">
                        {idea.category}
                      </span>
                      <span className="text-[#5D6B78]">
                        {idea.postType === "discussion" ? "토론" : "아이디어"}
                      </span>
                    </div>
                    <span className="text-[#5D6B78]">{idea.createdAt.slice(0, 10)}</span>
                  </div>

                  <h2 className="text-lg font-bold text-[#17212B] group-hover:text-[#147FC5] transition-colors">
                    {idea.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-[#5D6B78] line-clamp-2">
                    {idea.description}
                  </p>

                  <div className="pt-3 border-t border-[#E5EAF0] flex items-center justify-between text-xs text-[#5D6B78]">
                    <div className="flex items-center gap-3">
                      <span>
                        {idea.displayMode === "anonymous" ? "익명 참여자" : idea.authorName}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <MessageSquare className="w-3.5 h-3.5 text-[#147FC5]" />
                        {idea.commentCount ?? 0}
                      </span>
                    </div>
                    <span className="font-semibold text-[#147FC5] inline-flex items-center gap-1">
                      상세 보기 <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
