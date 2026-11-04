"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BusinessActivity, BusinessGroup, ActivityStatus } from "@/lib/types";
import { StatusBadge } from "@/components/StatusBadge";
import { ArrowRight, Filter, Info } from "lucide-react";

const STATUS_FILTERS: ("ALL" | ActivityStatus)[] = [
  "ALL",
  "운영 중",
  "개발 중",
  "연구 주제",
  "협력 모집 중",
  "구상 단계",
];

export default function BusinessPage() {
  const [groups, setGroups] = useState<BusinessGroup[]>([]);
  const [activities, setActivities] = useState<BusinessActivity[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<string>("ALL");
  const [selectedStatus, setSelectedStatus] = useState<"ALL" | ActivityStatus>("ALL");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/business")
      .then((res) => res.json())
      .then((data) => {
        setGroups(data.groups ?? []);
        setActivities(data.activities ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredActivities = activities.filter((act) => {
    const matchGroup = selectedGroup === "ALL" || act.groupSlug === selectedGroup;
    const matchStatus =
      selectedStatus === "ALL" || act.activityStatus === selectedStatus;
    return matchGroup && matchStatus;
  });

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#07182D] text-white py-20 lg:py-24 border-b border-[#123454]">
        <div className="container-shell max-w-4xl space-y-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#2998D6]">
            BUSINESS AREAS & ROADMAP
          </p>
          <h1 className="text-3xl sm:text-5xl font-bold leading-tight">
            5대 핵심 사업 영역과 세부 추진 과제
          </h1>
          <p className="text-base sm:text-lg text-[#D9E6F2]/85 leading-relaxed">
            후크인터스텔라(주)의 사업은 우주 접근 기술부터 극한 생존, 인재·교육
            커뮤니티, 수익·IP 개발, 글로벌 네트워크까지 5개 영역으로 구성됩니다. 각
            세부 사업 과제는 현재 실제 운영 여부와 연구·구상 단계를 투명하게 구분하여
            표시합니다.
          </p>
        </div>
      </section>

      {/* 5 Business Groups Cards */}
      <section className="py-16 lg:py-20 bg-white border-b border-[#E5EAF0]">
        <div className="container-shell space-y-10">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#17212B]">
              5대 비즈니스 그룹 포트폴리오
            </h2>
            <p className="text-sm sm:text-base text-[#5D6B78]">
              각 그룹을 클릭하면 해결하려는 문제, 제안 가치, 세부 추진 사업 및 협력
              가능 분야를 상세히 확인할 수 있습니다.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4, 5].map((n) => (
                <div
                  key={n}
                  className="h-56 rounded-xl bg-slate-100 animate-pulse border border-[#E5EAF0]"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {groups.map((group) => (
                <div
                  key={group.id}
                  className="rounded-xl border border-[#E5EAF0] p-7 bg-[#F8FAFC] hover:border-[#147FC5] transition-colors flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#147FC5]">
                        {group.titleEn}
                      </span>
                      <StatusBadge status={group.primaryStatus} />
                    </div>
                    <h3 className="text-2xl font-bold text-[#17212B]">
                      {group.titleKo}
                    </h3>
                    <p className="text-sm text-[#5D6B78] leading-relaxed">
                      {group.description}
                    </p>
                    <div className="rounded-lg bg-white p-4 border border-[#E5EAF0] space-y-2 text-xs">
                      <p className="text-[#17212B]">
                        <strong className="text-[#147FC5]">해결 과제:</strong>{" "}
                        {group.customerProblem}
                      </p>
                      <p className="text-[#17212B]">
                        <strong className="text-[#147FC5]">제안 가치:</strong>{" "}
                        {group.proposedValue}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#E5EAF0] flex flex-wrap items-center justify-between gap-3">
                    <Link
                      href={`/business/${group.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#147FC5] hover:text-[#0B2340]"
                    >
                      <span>그룹 상세 및 협력 분야 보기</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedGroup(group.slug);
                        document
                          .getElementById("purposes-directory")
                          ?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="text-xs font-semibold text-[#5D6B78] hover:text-[#17212B] underline"
                    >
                      세부 사업 항목 필터링
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Business Activities Directory */}
      <section
        id="purposes-directory"
        className="py-16 lg:py-24 bg-[#F8FAFC] scroll-mt-20"
      >
        <div className="container-shell space-y-8">
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#17212B]">
              세부 추진 사업 및 연구 과제 현황
            </h2>
            <div className="rounded-xl bg-[#E8F4FC] border border-[#147FC5]/30 p-4 flex items-start gap-3 text-xs sm:text-sm text-[#0B2340]">
              <Info className="w-5 h-5 text-[#147FC5] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-semibold">
                  신뢰성 고지: 현재 상용 운영 중인 사업과 미래 연구 과제를 투명하게 구분합니다.
                </p>
                <p className="text-[#0B2340]/80">
                  후크인터스텔라(주)는 각 세부 사업을 <strong>운영 중</strong>(실제 제공 중),{" "}
                  <strong>개발 중</strong>(기획·시제품 준비 중),{" "}
                  <strong>연구 주제</strong>(기술·실험 연구 중),{" "}
                  <strong>협력 모집 중</strong>(파트너 발굴 중),{" "}
                  <strong>구상 단계</strong>(중장기 로드맵)로 명확히 구분하여 관리합니다.
                </p>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl p-5 border border-[#E5EAF0] space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#5D6B78]">
              <Filter className="w-4 h-4 text-[#147FC5]" />
              <span>사업 그룹 및 상태별 필터</span>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSelectedGroup("ALL")}
                className={`px-3.5 py-2 rounded-full text-xs font-semibold transition-colors min-h-[36px] ${
                  selectedGroup === "ALL"
                    ? "bg-[#07182D] text-white"
                    : "bg-slate-100 text-[#17212B] hover:bg-slate-200"
                }`}
              >
                전체 그룹
              </button>
              {groups.map((g) => (
                <button
                  key={g.slug}
                  type="button"
                  onClick={() => setSelectedGroup(g.slug)}
                  className={`px-3.5 py-2 rounded-full text-xs font-semibold transition-colors min-h-[36px] ${
                    selectedGroup === g.slug
                      ? "bg-[#147FC5] text-white"
                      : "bg-slate-100 text-[#17212B] hover:bg-slate-200"
                  }`}
                >
                  {g.titleEn}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[#E5EAF0]">
              <div className="flex flex-wrap gap-2">
                {STATUS_FILTERS.map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setSelectedStatus(st)}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold border transition-colors ${
                      selectedStatus === st
                        ? "bg-[#E8F4FC] border-[#147FC5] text-[#0B2340]"
                        : "bg-white border-[#E5EAF0] text-[#5D6B78] hover:text-[#17212B]"
                    }`}
                  >
                    {st === "ALL" ? "모든 상태" : st}
                  </button>
                ))}
              </div>
              {(selectedGroup !== "ALL" || selectedStatus !== "ALL") && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedGroup("ALL");
                    setSelectedStatus("ALL");
                  }}
                  className="text-xs font-semibold text-[#147FC5] hover:underline"
                >
                  필터 초기화
                </button>
              )}
            </div>
          </div>

          {/* List of Activities */}
          {filteredActivities.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center border border-[#E5EAF0] space-y-3">
              <p className="text-base font-semibold text-[#17212B]">
                선택한 필터 조건에 해당하는 사업 항목이 없습니다.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedGroup("ALL");
                  setSelectedStatus("ALL");
                }}
                className="px-4 py-2 rounded-lg bg-[#147FC5] text-white text-xs font-semibold"
              >
                전체 항목 다시 보기
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredActivities.map((act) => {
                const grp = groups.find((g) => g.slug === act.groupSlug);
                return (
                  <div
                    key={act.id}
                    className="bg-white rounded-xl p-6 border border-[#E5EAF0] flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-mono font-bold text-[#147FC5] bg-[#E8F4FC] px-2.5 py-1 rounded">
                          #{String(act.codeNumber).padStart(2, "0")} · {grp?.titleEn}
                        </span>
                        <StatusBadge status={act.activityStatus} />
                      </div>
                      <h3 className="text-base font-bold text-[#17212B] leading-snug">
                        {act.title}
                      </h3>
                      <p className="text-sm text-[#5D6B78] leading-relaxed">
                        {act.description}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-[#E5EAF0] flex items-center justify-between text-xs text-[#5D6B78]">
                      <span>최근 상태 검토일: {act.updatedAt}</span>
                      {grp && (
                        <Link
                          href={`/business/${grp.slug}`}
                          className="font-semibold text-[#147FC5] hover:underline"
                        >
                          그룹 상세 →
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
