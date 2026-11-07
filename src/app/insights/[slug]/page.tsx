import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { readDb } from "@/lib/db";
import { ArrowLeft, ArrowRight, Calendar, ExternalLink, User } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function InsightDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const db = readDb();
  const article = db.articles.find(
    (a) => a.slug === slug && a.status === "published"
  );

  if (!article) {
    notFound();
  }

  const related = db.articles
    .filter((a) => a.status === "published" && a.id !== article.id)
    .slice(0, 2);

  return (
    <div>
      {/* Article Header */}
      <section className="bg-[#07182D] text-white py-16 lg:py-20 border-b border-[#123454]">
        <div className="container-shell max-w-3xl space-y-5">
          <Link
            href="/insights"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D9E6F2] hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>INSIGHTS 목록으로 돌아가기</span>
          </Link>

          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="px-3 py-1 rounded-full bg-[#147FC5] text-white font-semibold">
              {article.category}
            </span>
            <span className="inline-flex items-center gap-1 text-[#D9E6F2]/80 tabular-nums">
              <Calendar className="w-3.5 h-3.5" />
              게시일: {article.publishedAt}
            </span>
            {article.updatedAt && article.updatedAt !== article.publishedAt && (
              <span className="text-[#D9E6F2]/70 tabular-nums">
                (최종 업데이트: {article.updatedAt})
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl font-bold leading-tight">
            {article.title}
          </h1>

          <div className="pt-2 flex items-center gap-2 text-xs text-[#D9E6F2]/85">
            <User className="w-4 h-4 text-[#2998D6]" />
            <span>
              {article.authorName} · {article.authorRole}
            </span>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <section className="py-14 lg:py-20 bg-white border-b border-[#E5EAF0]">
        <div className="container-shell max-w-3xl space-y-8">
          {article.excerpt && (
            <div className="p-6 rounded-xl bg-[#F8FAFC] border border-[#E5EAF0] text-base font-medium text-[#17212B] leading-relaxed">
              {article.excerpt}
            </div>
          )}

          <div className="space-y-5 text-base text-[#17212B] leading-relaxed">
            {article.body
              .replace(/^#{1,6}\s*/gm, "")
              .replace(/\*\*/g, "")
              .split(/\n\n+/)
              .map((block, idx) => {
                const trimmed = block.trim();
                const isSubheading =
                  !trimmed.includes("\n") &&
                  trimmed.length < 52 &&
                  !trimmed.endsWith("다.") &&
                  !trimmed.endsWith("요.");

                if (isSubheading) {
                  return (
                    <h2
                      key={idx}
                      className="text-xl font-bold text-[#17212B] pt-3"
                    >
                      {trimmed}
                    </h2>
                  );
                }

                return (
                  <p key={idx} className="whitespace-pre-line leading-relaxed">
                    {trimmed}
                  </p>
                );
              })}
          </div>

          {article.slug === "space-stowaway-project-why-we-chose-voyage" && (
            <div className="rounded-xl bg-[#0B2340] text-white p-6 sm:p-8 border border-[#123454] flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              <div className="space-y-1.5">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#2998D6]">
                  SPACE STOWAWAY PROJECT
                </p>
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  후크인터스텔라 우주밀항 프로젝트 상세 보기
                </h2>
                <p className="text-xs sm:text-sm text-[#D9E6F2]/80">
                  초소형 캡슐 실험 구상과 운영 원칙, 항해 일지 구조를 확인해 보세요.
                </p>
              </div>
              <Link
                href="/projects/space-stowaway"
                className="px-5 py-3 rounded-lg bg-[#147FC5] hover:bg-[#2998D6] text-white text-sm font-semibold transition-colors inline-flex items-center gap-2 shrink-0 min-h-[44px]"
              >
                <span>프로젝트 상세 페이지</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          )}

          {article.sourceLinks && article.sourceLinks.length > 0 && (
            <div className="pt-6 border-t border-[#E5EAF0] space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#5D6B78]">
                관련 페이지 및 참고 자료
              </h2>
              <ul className="space-y-1.5 text-sm">
                {article.sourceLinks.map((src, i) => (
                  <li key={i}>
                    {src.url.startsWith("/") ? (
                      <Link
                        href={src.url}
                        className="inline-flex items-center gap-1.5 font-semibold text-[#147FC5] hover:underline"
                      >
                        <span>{src.label}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    ) : (
                      <a
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[#147FC5] hover:underline"
                      >
                        <span>{src.label}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* Related Articles */}
      <section className="py-14 bg-[#F8FAFC]">
        <div className="container-shell max-w-3xl space-y-6">
          <h2 className="text-xl font-bold text-[#17212B]">다른 인사이트 읽기</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {related.map((rel) => (
              <Link
                key={rel.id}
                href={`/insights/${rel.slug}`}
                className="bg-white rounded-xl p-5 border border-[#E5EAF0] hover:border-[#147FC5] space-y-2 block"
              >
                <span className="text-xs font-semibold text-[#147FC5]">
                  {rel.category}
                </span>
                <h3 className="text-base font-bold text-[#17212B] line-clamp-2">
                  {rel.title}
                </h3>
                <p className="text-xs text-[#5D6B78] line-clamp-2">{rel.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
