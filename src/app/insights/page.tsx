"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Article, ArticleCategory } from "@/lib/types";
import { ArrowRight, BookOpen, Search } from "lucide-react";

const CATEGORIES: ("ALL" | ArticleCategory)[] = [
  "ALL",
  "News",
  "Research & Technology",
  "Space Industry",
  "Education",
  "Opinion",
  "Reports",
];

export default function InsightsPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [category, setCategory] = useState<"ALL" | ArticleCategory>("ALL");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/insights")
      .then((res) => res.json())
      .then((data) => {
        setArticles(data.articles ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = articles.filter((art) => {
    const matchCat = category === "ALL" || art.category === category;
    const q = query.trim().toLowerCase();
    const matchQuery =
      !q ||
      art.title.toLowerCase().includes(q) ||
      art.excerpt.toLowerCase().includes(q) ||
      art.body.toLowerCase().includes(q);
    return matchCat && matchQuery;
  });

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#07182D] text-white py-20 lg:py-24 border-b border-[#123454]">
        <div className="container-shell max-w-4xl space-y-5">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#2998D6]">
            <BookOpen className="w-4 h-4" />
            <span>INSIGHTS & KNOWLEDGE ARCHIVE</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold leading-tight">
            우주산업, 과학기술, 미래 생존에 관한 인사이트
          </h1>
          <p className="text-base sm:text-lg text-[#D9E6F2]/85 leading-relaxed">
            HOOK INTERSTELLAR의 연구 노트, 우주산업 분석, 극한 생존 기술 리포트 및
            커뮤니티 운영 소식을 공유합니다.
          </p>
        </div>
      </section>

      {/* Search & Category Filter */}
      <section className="py-10 bg-[#F8FAFC] border-b border-[#E5EAF0]">
        <div className="container-shell space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#5D6B78] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="인사이트 제목, 키워드(예: 성층권, 생존, 우주경제) 검색..."
                aria-label="인사이트 검색"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white border border-[#E5EAF0] text-sm text-[#17212B] focus:border-[#147FC5]"
              />
            </div>
            {(category !== "ALL" || query) && (
              <button
                type="button"
                onClick={() => {
                  setCategory("ALL");
                  setQuery("");
                }}
                className="px-4 py-2.5 rounded-lg border border-[#E5EAF0] bg-white text-xs font-semibold text-[#5D6B78] hover:text-[#17212B]"
              >
                검색·필터 초기화
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`px-3.5 py-2 rounded-full text-xs font-semibold transition-colors min-h-[36px] ${
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
      </section>

      {/* Articles Grid */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-shell">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((n) => (
                <div
                  key={n}
                  className="h-56 rounded-xl bg-slate-100 animate-pulse"
                />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="rounded-xl p-12 text-center bg-[#F8FAFC] border border-[#E5EAF0] space-y-3">
              <p className="text-base font-semibold text-[#17212B]">
                조건에 맞는 인사이트 게시물이 없습니다.
              </p>
              <button
                type="button"
                onClick={() => {
                  setCategory("ALL");
                  setQuery("");
                }}
                className="px-4 py-2 rounded-lg bg-[#147FC5] text-white text-xs font-semibold"
              >
                전체 게시물 보기
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filtered.map((art) => (
                <Link
                  key={art.id}
                  href={`/insights/${art.slug}`}
                  className="group rounded-xl border border-[#E5EAF0] hover:border-[#147FC5] p-7 bg-white transition-all flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className="px-2.5 py-1 rounded bg-[#E8F4FC] text-[#147FC5] font-semibold">
                        {art.category}
                      </span>
                      <span className="text-[#5D6B78] tabular-nums">
                        게시일: {art.publishedAt}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-[#17212B] group-hover:text-[#147FC5] transition-colors leading-snug">
                      {art.title}
                    </h2>
                    <p className="text-sm text-[#5D6B78] leading-relaxed">
                      {art.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E5EAF0] flex items-center justify-between text-xs text-[#5D6B78]">
                    <span>
                      작성: <strong className="text-[#17212B]">{art.authorName}</strong>
                    </span>
                    <span className="inline-flex items-center gap-1 font-semibold text-[#147FC5]">
                      전문 읽기 <ArrowRight className="w-3.5 h-3.5" />
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
