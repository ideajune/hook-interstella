"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { TechnologyTopic, ActivityStatus } from "@/lib/types";
import { StatusBadge } from "@/components/StatusBadge";
import {
  AlertCircle,
  ArrowRight,
  Cpu,
  FlaskConical,
  Handshake,
  Layers,
} from "lucide-react";

const DOMAINS = [
  "ALL",
  "우주 기술",
  "우주 운송 및 추진",
  "우주 생존 기술",
  "우주식품 및 생명과학",
  "극한환경 장비",
  "미래 우주 연구 주제",
] as const;

export default function TechnologyPage() {
  const [topics, setTopics] = useState<TechnologyTopic[]>([]);
  const [selectedDomain, setSelectedDomain] = useState<string>("ALL");
  const [selectedStatus, setSelectedStatus] = useState<"ALL" | ActivityStatus>("ALL");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/technology")
      .then((res) => res.json())
      .then((data) => {
        setTopics(data.topics ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = topics.filter((t) => {
    const matchDomain = selectedDomain === "ALL" || t.domain === selectedDomain;
    const matchStatus = selectedStatus === "ALL" || t.status === selectedStatus;
    return matchDomain && matchStatus;
  });

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#07182D] text-white py-20 lg:py-24 border-b border-[#123454]">
        <div className="container-shell max-w-4xl space-y-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#2998D6]">
            TECHNOLOGY DOMAINS & RESEARCH THEMES
          </p>
          <h1 className="text-3xl sm:text-5xl font-bold leading-tight">
            기술 영역 및 미래 우주 연구 주제
          </h1>
          <p className="text-base sm:text-lg text-[#D9E6F2]/85 leading-relaxed">
            HOOK INTERSTELLAR는 과장된 기술 주장을 지양합니다. 각 기술 주제가 해결하려는
            문제, 산업적 중요성, 현재 성숙도(운영 중·개발 중·연구 주제·구상 단계),
            기술적 한계 및 외부 협력 필요 분야를 투명하게 공개합니다.
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="py-10 bg-[#F8FAFC] border-b border-[#E5EAF0]">
        <div className="container-shell space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#5D6B78]">
            <Layers className="w-4 h-4 text-[#147FC5]" />
            <span>6대 기술 도메인 선택</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {DOMAINS.map((dom) => (
              <button
                key={dom}
                type="button"
                onClick={() => setSelectedDomain(dom)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors min-h-[38px] ${
                  selectedDomain === dom
                    ? "bg-[#147FC5] text-white"
                    : "bg-white border border-[#E5EAF0] text-[#17212B] hover:border-[#147FC5]"
                }`}
              >
                {dom === "ALL" ? "전체 도메인 보기" : dom}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-[#E5EAF0]">
            <span className="text-xs font-semibold text-[#5D6B78] mr-1">
              단계 구분:
            </span>
            {(["ALL", "운영 중", "개발 중", "연구 주제", "구상 단계"] as const).map(
              (st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setSelectedStatus(st)}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold border ${
                    selectedStatus === st
                      ? "bg-[#E8F4FC] border-[#147FC5] text-[#0B2340]"
                      : "bg-white border-[#E5EAF0] text-[#5D6B78]"
                  }`}
                >
                  {st === "ALL" ? "전체 상태" : st}
                </button>
              )
            )}
          </div>
        </div>
      </section>

      {/* Technology Topic Cards */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-shell space-y-8">
          {loading ? (
            <div className="space-y-6">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="h-64 rounded-2xl bg-slate-100 animate-pulse"
                />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="rounded-xl p-12 text-center bg-[#F8FAFC] border border-[#E5EAF0] space-y-3">
              <p className="text-base font-semibold text-[#17212B]">
                해당 조건에 부합하는 기술 주제가 없습니다.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedDomain("ALL");
                  setSelectedStatus("ALL");
                }}
                className="px-4 py-2 rounded-lg bg-[#147FC5] text-white text-xs font-semibold"
              >
                필터 초기화
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {filtered.map((topic) => (
                <article
                  key={topic.id}
                  className="rounded-2xl border border-[#E5EAF0] bg-white p-7 sm:p-9 shadow-2xs space-y-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E5EAF0] pb-4">
                    <div className="flex items-center gap-2">
                      <Cpu className="w-4 h-4 text-[#147FC5]" />
                      <span className="text-xs font-bold uppercase tracking-wider text-[#147FC5]">
                        {topic.domain}
                      </span>
                    </div>
                    <StatusBadge status={topic.status} />
                  </div>

                  <div className="space-y-3">
                    <h2 className="text-2xl font-bold text-[#17212B]">
                      {topic.title}
                    </h2>
                    <p className="text-base text-[#5D6B78] leading-relaxed">
                      {topic.summary}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="rounded-xl bg-[#F8FAFC] p-5 border border-[#E5EAF0] space-y-2">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[#147FC5]">
                        해결하려는 기술적 문제 (Problem Statement)
                      </h3>
                      <p className="text-sm text-[#17212B] leading-relaxed">
                        {topic.problemStatement}
                      </p>
                    </div>

                    <div className="rounded-xl bg-[#F8FAFC] p-5 border border-[#E5EAF0] space-y-2">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[#147FC5]">
                        왜 중요한가 (Relevance & Spin-off)
                      </h3>
                      <p className="text-sm text-[#17212B] leading-relaxed">
                        {topic.relevance}
                      </p>
                    </div>

                    <div className="rounded-xl bg-amber-50/60 p-5 border border-amber-200/80 space-y-2">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>기술적 한계 및 선결 과제 (Limitations & Dependencies)</span>
                      </h3>
                      <p className="text-sm text-amber-950/90 leading-relaxed">
                        {topic.limitations}
                      </p>
                    </div>

                    <div className="rounded-xl bg-[#E8F4FC]/60 p-5 border border-[#147FC5]/30 space-y-2">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-[#0B2340] flex items-center gap-1.5">
                        <Handshake className="w-3.5 h-3.5 text-[#147FC5]" />
                        <span>협력 필요 파트너 (Collaboration Needs)</span>
                      </h3>
                      <p className="text-sm text-[#0B2340] leading-relaxed">
                        {topic.collaborationNeeds}
                      </p>
                    </div>
                  </div>

                  {/* Concept/Illustration disclosure (FR-042) */}
                  <div className="pt-4 border-t border-[#E5EAF0] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#5D6B78]">
                    <span className="inline-flex items-center gap-1.5">
                      <FlaskConical className="w-3.5 h-3.5 text-[#147FC5]" />
                      <span>구분 고지: {topic.conceptNote}</span>
                    </span>
                    <div className="flex items-center gap-4">
                      <Link
                        href={`/partnership?topic=${encodeURIComponent(topic.title)}`}
                        className="font-semibold text-[#147FC5] hover:text-[#0B2340] inline-flex items-center gap-1"
                      >
                        <span>이 주제 공동 연구 제안하기</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        href="/space-ideas/submit"
                        className="font-semibold text-[#5D6B78] hover:text-[#17212B]"
                      >
                        관련 아이디어 등록 →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
