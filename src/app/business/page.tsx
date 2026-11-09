"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  BusinessActivity,
  BusinessGroup,
  TechnologyTopic,
} from "@/lib/types";
import { StatusBadge } from "@/components/StatusBadge";
import { ArrowRight, ChevronDown, ChevronUp, Cpu } from "lucide-react";

export default function BusinessPage() {
  const [groups, setGroups] = useState<BusinessGroup[]>([]);
  const [activities, setActivities] = useState<BusinessActivity[]>([]);
  const [topics, setTopics] = useState<TechnologyTopic[]>([]);
  const [showAllPurposes, setShowAllPurposes] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/business").then((r) => r.json()),
      fetch("/api/technology").then((r) => r.json()),
    ])
      .then(([bizData, techData]) => {
        setGroups(bizData.groups ?? []);
        setActivities(bizData.activities ?? []);
        setTopics(techData.topics ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#07182D] text-white py-16 lg:py-20 border-b border-[#123454]">
        <div className="container-shell max-w-4xl space-y-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#2998D6]">
            BUSINESS & TECHNOLOGY
          </p>
          <h1 className="text-3xl sm:text-5xl font-bold leading-tight">
            5대 핵심 사업 및 기술 연구 분야
          </h1>
          <p className="text-base sm:text-lg text-[#D9E6F2]/85 leading-relaxed">
            우주 접근 기술, 극한 생존 솔루션, 인재·교육 커뮤니티, 수익·IP 사업화,
            글로벌 네트워크의 5대 영역과 핵심 기술 주제를 소개합니다.
          </p>
        </div>
      </section>

      {/* 1. 5 Business Groups */}
      <section className="py-14 lg:py-18 bg-white border-b border-[#E5EAF0]">
        <div className="container-shell space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#17212B]">
                5대 비즈니스 그룹
              </h2>
              <p className="text-sm text-[#5D6B78] mt-1">
                각 그룹을 클릭하면 세부 추진 과제와 협력 분야를 확인할 수 있습니다.
              </p>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[1, 2, 3, 4, 5].map((n) => (
                <div
                  key={n}
                  className="h-44 rounded-xl bg-slate-100 animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {groups.map((group) => (
                <Link
                  key={group.id}
                  href={`/business/${group.slug}`}
                  className="group rounded-xl border border-[#E5EAF0] p-6 bg-[#F8FAFC] hover:bg-white hover:border-[#147FC5] transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#147FC5]">
                        {group.titleEn}
                      </span>
                      <StatusBadge status={group.primaryStatus} />
                    </div>
                    <h3 className="text-xl font-bold text-[#17212B] group-hover:text-[#147FC5] transition-colors">
                      {group.titleKo}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5D6B78] leading-relaxed">
                      {group.summary}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-[#E5EAF0] flex items-center justify-between text-xs font-semibold text-[#147FC5]">
                    <span>그룹 상세 보기</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Collapsible 31 Activities Toggle */}
          <div className="pt-4">
            <button
              type="button"
              onClick={() => setShowAllPurposes(!showAllPurposes)}
              className="w-full py-3.5 px-5 rounded-xl bg-[#F8FAFC] hover:bg-[#E8F4FC]/60 border border-[#E5EAF0] flex items-center justify-between text-xs sm:text-sm font-semibold text-[#17212B] transition-colors"
            >
              <span>
                법인 등기부 기준 31개 세부 사업목적 및 상태 전체 보기 ({activities.length}개)
              </span>
              {showAllPurposes ? (
                <ChevronUp className="w-4 h-4 text-[#147FC5]" />
              ) : (
                <ChevronDown className="w-4 h-4 text-[#147FC5]" />
              )}
            </button>

            {showAllPurposes && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {activities.map((act) => (
                  <div
                    key={act.id}
                    className="rounded-lg p-4 bg-white border border-[#E5EAF0] space-y-1.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-mono font-bold text-[#147FC5]">
                        #{String(act.codeNumber).padStart(2, "0")}
                      </span>
                      <StatusBadge status={act.activityStatus} />
                    </div>
                    <h4 className="text-sm font-bold text-[#17212B]">
                      {act.title}
                    </h4>
                    <p className="text-xs text-[#5D6B78] line-clamp-2">
                      {act.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 2. Core Technology Themes (Compact Grid) */}
      <section className="py-14 lg:py-18 bg-[#F8FAFC]">
        <div className="container-shell space-y-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#147FC5]">
              CORE TECHNOLOGY THEMES
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#17212B] mt-1">
              핵심 기술 및 연구 주제
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {topics.map((topic) => (
              <div
                key={topic.id}
                className="rounded-xl bg-white border border-[#E5EAF0] p-6 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#147FC5]">
                      <Cpu className="w-3.5 h-3.5" />
                      {topic.domain}
                    </span>
                    <StatusBadge status={topic.status} />
                  </div>
                  <h3 className="text-lg font-bold text-[#17212B]">
                    {topic.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5D6B78] leading-relaxed">
                    {topic.summary}
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E5EAF0] flex items-center justify-between text-xs">
                  <span className="text-[#5D6B78] truncate max-w-[70%]">
                    협력 분야: {topic.collaborationNeeds}
                  </span>
                  <Link
                    href="/contact"
                    className="font-semibold text-[#147FC5] hover:underline shrink-0"
                  >
                    협력 문의 →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
