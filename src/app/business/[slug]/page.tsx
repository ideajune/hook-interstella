import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { readDb } from "@/lib/db";
import { StatusBadge } from "@/components/StatusBadge";
import { ArrowLeft, ArrowRight, CheckCircle, Handshake } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function BusinessGroupDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const db = readDb();
  const group = db.businessGroups.find((g) => g.slug === slug);

  if (!group) {
    notFound();
  }

  const activities = db.businessActivities
    .filter((a) => a.groupSlug === group.slug)
    .sort((a, b) => a.codeNumber - b.codeNumber);

  const relatedArticles = db.articles
    .filter((a) => a.status === "published")
    .slice(0, 2);

  return (
    <div>
      {/* Hero */}
      <section className="bg-[#07182D] text-white py-16 lg:py-24 border-b border-[#123454]">
        <div className="container-shell space-y-6">
          <Link
            href="/business"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D9E6F2] hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>전체 사업 영역(BUSINESS)으로 돌아가기</span>
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#2998D6]">
              {group.titleEn}
            </span>
            <StatusBadge status={group.primaryStatus} variant="dark" />
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold leading-tight max-w-3xl">
            {group.titleKo}
          </h1>

          <p className="text-base sm:text-lg text-[#D9E6F2]/85 leading-relaxed max-w-3xl">
            {group.description}
          </p>
        </div>
      </section>

      {/* Problem, Value & Collaboration */}
      <section className="py-16 bg-white border-b border-[#E5EAF0]">
        <div className="container-shell grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="rounded-xl p-7 bg-[#F8FAFC] border border-[#E5EAF0] space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#147FC5]">
              PROBLEM & CONTEXT
            </span>
            <h2 className="text-lg font-bold text-[#17212B]">해결하고자 하는 문제</h2>
            <p className="text-sm text-[#5D6B78] leading-relaxed">
              {group.customerProblem}
            </p>
          </div>

          <div className="rounded-xl p-7 bg-[#F8FAFC] border border-[#E5EAF0] space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#147FC5]">
              PROPOSED VALUE
            </span>
            <h2 className="text-lg font-bold text-[#17212B]">제안 가치 및 방향</h2>
            <p className="text-sm text-[#5D6B78] leading-relaxed">
              {group.proposedValue}
            </p>
          </div>

          <div className="rounded-xl p-7 bg-[#0B2340] text-white border border-[#123454] space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#2998D6]">
              COLLABORATION NEEDS
            </span>
            <h2 className="text-lg font-bold">주요 협력 가능 분야</h2>
            <ul className="space-y-2.5 text-sm text-[#D9E6F2]/90">
              {group.collaborationAreas.map((area, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-[#2998D6] shrink-0 mt-0.5" />
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Detailed Mapped Activities */}
      <section className="py-16 lg:py-20 bg-[#F8FAFC] border-b border-[#E5EAF0]">
        <div className="container-shell space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#17212B]">
              세부 추진 사업 및 현재 상태
            </h2>
            <p className="text-sm text-[#5D6B78]">
              각 세부 사업 항목의 실제 운영·개발·연구 단계입니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {activities.map((act) => (
              <div
                key={act.id}
                className="bg-white rounded-xl p-6 border border-[#E5EAF0] space-y-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-mono font-bold text-[#147FC5] bg-[#E8F4FC] px-2.5 py-1 rounded">
                    과제 #{String(act.codeNumber).padStart(2, "0")}
                  </span>
                  <StatusBadge status={act.activityStatus} />
                </div>
                <h3 className="text-lg font-bold text-[#17212B]">{act.title}</h3>
                <p className="text-sm text-[#5D6B78] leading-relaxed">
                  {act.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Insights & CTA */}
      <section className="py-16 bg-white">
        <div className="container-shell grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <h2 className="text-2xl font-bold text-[#17212B]">관련 인사이트</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedArticles.map((art) => (
                <Link
                  key={art.id}
                  href={`/insights/${art.slug}`}
                  className="p-5 rounded-xl border border-[#E5EAF0] hover:border-[#147FC5] space-y-2 block"
                >
                  <span className="text-xs font-semibold text-[#147FC5]">
                    {art.category}
                  </span>
                  <h3 className="text-sm font-bold text-[#17212B] line-clamp-2">
                    {art.title}
                  </h3>
                  <p className="text-xs text-[#5D6B78] line-clamp-2">{art.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 rounded-2xl bg-[#07182D] text-white p-8 space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#2998D6]">
              <Handshake className="w-4 h-4" />
              <span>PARTNERSHIP INQUIRY</span>
            </div>
            <h3 className="text-xl font-bold">
              {group.titleKo} 분야의 협력 파트너를 찾습니다
            </h3>
            <p className="text-sm text-[#D9E6F2]/85 leading-relaxed">
              관련 기술을 보유한 기업, 연구실, 교육기관이라면 협력 제안을 남겨주세요.
            </p>
            <div className="pt-2">
              <Link
                href={`/partnership?category=${encodeURIComponent(group.titleEn)}`}
                className="px-5 py-3 rounded-lg bg-[#147FC5] hover:bg-[#2998D6] text-white text-sm font-semibold inline-flex items-center gap-2"
              >
                <span>이 분야 협력 제안하기</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
