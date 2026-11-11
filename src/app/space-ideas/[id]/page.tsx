"use client";

import React, { useState, useEffect, use, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Idea, Comment } from "@/lib/types";
import type { HookChainNode } from "@/lib/hooksum";
import {
  ArrowLeft,
  Award,
  Check,
  Copy,
  Fingerprint,
  Flag,
  GitBranch,
  MessageSquare,
  Paperclip,
  Printer,
  Send,
  ShieldCheck,
  X,
} from "lucide-react";

interface HookChainData {
  genesisId: string;
  parentIdea: HookChainNode | null;
  nodes: HookChainNode[];
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function IdeaDetailContent({ id }: { id: string }) {
  const searchParams = useSearchParams();
  const [idea, setIdea] = useState<Idea | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [hookChain, setHookChain] = useState<HookChainData | null>(null);
  const [user, setUser] = useState<{
    id: string;
    displayName: string;
    role: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  // Certificate & Hash Copy state
  const [showCertificate, setShowCertificate] = useState(false);
  const [copiedHash, setCopiedHash] = useState(false);

  // Comment state
  const [commentBody, setCommentBody] = useState("");
  const [commentDisplayMode, setCommentDisplayMode] = useState<
    "public" | "anonymous"
  >("public");
  const [commentError, setCommentError] = useState("");
  const [commentSubmitting, setCommentSubmitting] = useState(false);

  // Report Modal state
  const [reportTarget, setReportTarget] = useState<{
    type: "idea" | "comment";
    id: string;
    label: string;
  } | null>(null);
  const [reportReason, setReportReason] = useState("스팸 또는 부적절한 홍보");
  const [reportDetails, setReportDetails] = useState("");
  const [reportSuccess, setReportSuccess] = useState("");

  const loadData = () => {
    Promise.all([
      fetch(`/api/space-ideas/${id}`).then((r) => r.json()),
      fetch("/api/auth/me").then((r) => r.json()),
    ])
      .then(([ideaData, authData]) => {
        setIdea(ideaData.idea ?? null);
        setComments(ideaData.comments ?? []);
        setHookChain(ideaData.hookChain ?? null);
        setUser(authData.user ?? null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (
      !loading &&
      idea &&
      idea.postType === "idea" &&
      searchParams.get("cert") === "1"
    ) {
      setShowCertificate(true);
    }
  }, [loading, idea, searchParams]);

  const handleQuickDemoLogin = async () => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "researcher@example.com",
        password: "member1234",
      }),
    });
    if (res.ok) {
      loadData();
    }
  };

  const handleCopyHash = () => {
    if (!idea?.stampHash) return;
    navigator.clipboard?.writeText(idea.stampHash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const handlePrintCertificate = () => {
    if (!idea) return;
    const creatorLabel =
      idea.displayMode === "anonymous" ? "익명 참여자 (계정 보호)" : idea.authorName;
    const depth = idea.chainDepth ?? 1;
    const lineageLabel =
      depth === 1
        ? "제네시스 훅 (1세대 원본 아이디어)"
        : `${depth}차 파생 훅 (Hook Chain 연결 아이디어)`;

    const printWin = window.open("", "_blank", "width=860,height=980");
    if (!printWin) {
      window.print();
      return;
    }

    const html = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="utf-8" />
  <title>원작자 명예 증명서 - ${escapeHtml(idea.stampId || idea.id)}</title>
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 32px;
      font-family: "Pretendard", "Malgun Gothic", -apple-system, sans-serif;
      background: #ffffff;
      color: #0B2340;
    }
    .cert-outer {
      max-width: 760px;
      margin: 0 auto;
      border: 3px solid #0B2340;
      padding: 10px;
    }
    .cert-inner {
      border: 1px solid #147FC5;
      padding: 40px 44px;
    }
    .badge {
      font-size: 11px;
      letter-spacing: 2px;
      color: #147FC5;
      font-weight: 700;
      text-align: center;
      margin-bottom: 8px;
    }
    h1 {
      font-size: 28px;
      text-align: center;
      margin: 0 0 6px 0;
      color: #07182D;
    }
    .sub {
      text-align: center;
      font-size: 13px;
      color: #5D6B78;
      margin-bottom: 28px;
    }
    .stamp-id-box {
      text-align: center;
      background: #07182D;
      color: #5CC3FF;
      padding: 10px 16px;
      border-radius: 8px;
      font-family: monospace;
      font-size: 16px;
      font-weight: 700;
      margin-bottom: 26px;
    }
    .table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 24px;
    }
    .table th, .table td {
      border-bottom: 1px solid #E5EAF0;
      padding: 11px 8px;
      text-align: left;
      font-size: 13px;
      vertical-align: top;
    }
    .table th {
      width: 150px;
      color: #5D6B78;
      font-weight: 600;
    }
    .table td {
      color: #17212B;
      font-weight: 600;
      word-break: break-all;
    }
    .hash {
      font-family: monospace;
      font-size: 11.5px;
      color: #0B2340;
    }
    .declaration {
      background: #F8FAFC;
      border-left: 4px solid #147FC5;
      padding: 16px 18px;
      font-size: 12.5px;
      line-height: 1.7;
      color: #17212B;
      margin-bottom: 28px;
    }
    .footer {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      padding-top: 12px;
      border-top: 1px solid #E5EAF0;
      font-size: 12px;
      color: #5D6B78;
    }
    .issuer {
      text-align: right;
      font-weight: 700;
      color: #07182D;
      font-size: 15px;
    }
    @media print {
      body { padding: 0; }
    }
  </style>
</head>
<body>
  <div class="cert-outer">
    <div class="cert-inner">
      <div class="badge">HOOKSUM CERTIFICATE OF ORIGIN · PRIOR ART STAMP</div>
      <h1>원작자 명예 증명서</h1>
      <div class="sub">후크인터스텔라(주) 우주 아이디어 선행기술 박제 아카이브</div>

      <div class="stamp-id-box">박제 고유 번호: ${escapeHtml(
        idea.stampId || idea.id
      )}</div>

      <table class="table">
        <tr>
          <th>아이디어 제목</th>
          <td>${escapeHtml(idea.title)}</td>
        </tr>
        <tr>
          <th>원작자 (창작자)</th>
          <td>${escapeHtml(creatorLabel)}</td>
        </tr>
        <tr>
          <th>기술 분야 / 계보</th>
          <td>${escapeHtml(idea.category)} · ${escapeHtml(lineageLabel)}</td>
        </tr>
        <tr>
          <th>최초 박제 시점 (UTC)</th>
          <td>${escapeHtml(idea.createdAt)}</td>
        </tr>
        <tr>
          <th>디지털 인감 (SHA-256)</th>
          <td class="hash">${escapeHtml(idea.stampHash || "-")}</td>
        </tr>
      </table>

      <div class="declaration">
        <strong>[선행기술(Prior Art) 공개 및 원작자 명예 선언]</strong><br/>
        본 증명서는 배타적 독점 권리증이 아니라, 위 아이디어가 명기된 시점에 대중에게 공개·박제되어 누구도 부당하게 독점 특허화할 수 없는 <strong>인류 공동의 선행기술(Prior Art)</strong>이 되었으며, 위 원작자가 이 아이디어의 명예로운 시작점(Origin)임을 공식 증명합니다.
      </div>

      <div class="footer">
        <div>발급 플랫폼: https://hookinterstellar.com/space-ideas/${escapeHtml(
          idea.id
        )}</div>
        <div class="issuer">HOOK INTERSTELLAR · 후크인터스텔라(주)</div>
      </div>
    </div>
  </div>
  <script>
    window.onload = function() {
      window.print();
    };
  </script>
</body>
</html>`;

    printWin.document.open();
    printWin.document.write(html);
    printWin.document.close();
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCommentError("");
    if (!user) {
      setCommentError("댓글을 작성하려면 먼저 로그인해 주세요.");
      return;
    }
    if (commentBody.trim().length < 3) {
      setCommentError("댓글 내용을 3자 이상 입력해 주세요.");
      return;
    }

    setCommentSubmitting(true);
    try {
      const res = await fetch(`/api/space-ideas/${id}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          body: commentBody.trim(),
          displayMode: commentDisplayMode,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setCommentError(data.error || "댓글 등록에 실패했습니다.");
      } else {
        setCommentBody("");
        loadData();
      }
    } catch {
      setCommentError("네트워크 오류가 발생했습니다.");
    } finally {
      setCommentSubmitting(false);
    }
  };

  const handleReportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportTarget) return;

    const res = await fetch("/api/reports", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        targetType: reportTarget.type,
        targetId: reportTarget.id,
        targetTitlePreview: reportTarget.label,
        reason: reportReason,
        details: reportDetails.trim(),
      }),
    });

    if (res.ok) {
      setReportSuccess(
        "신고가 접수되었습니다. 관리자가 운영원칙에 따라 검토합니다."
      );
      setReportDetails("");
      setTimeout(() => {
        setReportTarget(null);
        setReportSuccess("");
      }, 2000);
    }
  };

  if (loading) {
    return (
      <div className="container-shell py-20 max-w-3xl">
        <div className="h-64 rounded-2xl bg-slate-100 animate-pulse" />
      </div>
    );
  }

  if (!idea) {
    return (
      <div className="container-shell py-20 max-w-2xl text-center space-y-4">
        <h1 className="text-2xl font-bold text-[#17212B]">
          요청하신 게시물을 찾을 수 없거나 비공개 상태입니다.
        </h1>
        <Link
          href="/space-ideas"
          className="inline-block px-5 py-2.5 rounded-lg bg-[#147FC5] text-white text-sm font-semibold"
        >
          SPACE IDEAS 목록으로 돌아가기
        </Link>
      </div>
    );
  }

  const isIdea = idea.postType === "idea";
  const depth = idea.chainDepth ?? 1;

  return (
    <div className="bg-[#F8FAFC] py-14 lg:py-20">
      <div className="container-shell max-w-3xl space-y-8">
        <Link
          href="/space-ideas"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#147FC5] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>SPACE IDEAS 전체 목록으로</span>
        </Link>

        {/* Main Idea / Discussion Card */}
        <article className="bg-white rounded-2xl border border-[#E5EAF0] p-7 sm:p-9 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E5EAF0] pb-4">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              {isIdea && idea.stampId && (
                <span className="px-2.5 py-1 rounded bg-[#07182D] text-[#5CC3FF] font-mono font-bold">
                  {idea.stampId}
                </span>
              )}
              <span className="px-3 py-1 rounded-full bg-[#E8F4FC] text-[#147FC5] font-semibold">
                {idea.category}
              </span>
              {isIdea ? (
                <span
                  className={`px-2.5 py-1 rounded font-semibold ${
                    depth > 1
                      ? "bg-indigo-50 text-indigo-700 border border-indigo-200"
                      : "bg-slate-100 text-[#0B2340]"
                  }`}
                >
                  {depth === 1 ? "제네시스 훅 (원본)" : `${depth}차 파생 훅`}
                </span>
              ) : (
                <span className="px-2.5 py-1 rounded bg-slate-100 text-[#5D6B78] font-medium">
                  오픈 토론
                </span>
              )}
              {idea.moderationStatus !== "published" && (
                <span className="px-2.5 py-1 rounded bg-amber-100 text-amber-900 font-bold">
                  상태: {idea.moderationStatus}
                </span>
              )}
            </div>
            <span className="text-xs text-[#5D6B78] tabular-nums">
              박제일: {idea.createdAt.slice(0, 10)}
            </span>
          </div>

          {isIdea && hookChain?.parentIdea && (
            <div className="p-3.5 rounded-xl bg-indigo-50/70 border border-indigo-200/80 flex flex-wrap items-center justify-between gap-2 text-xs text-indigo-900">
              <div className="inline-flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-indigo-600 shrink-0" />
                <span>
                  상위 훅에서 파생됨:{" "}
                  <Link
                    href={`/space-ideas/${hookChain.parentIdea.id}`}
                    className="font-bold underline hover:text-[#147FC5]"
                  >
                    [{hookChain.parentIdea.stampId}] {hookChain.parentIdea.title}
                  </Link>
                </span>
              </div>
            </div>
          )}

          <h1 className="text-2xl sm:text-3xl font-bold text-[#17212B] leading-snug">
            {idea.title}
          </h1>

          <div className="text-base text-[#17212B] leading-relaxed whitespace-pre-line">
            {idea.description}
          </div>

          {idea.attachmentName && (
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#F8FAFC] border border-[#E5EAF0] text-xs text-[#5D6B78]">
              <Paperclip className="w-3.5 h-3.5 text-[#147FC5]" />
              <span>참조 첨부자료: {idea.attachmentName}</span>
            </div>
          )}

          {/* Hooksum Stamping Metadata & Certificate / Hook Chain Actions */}
          {isIdea && (
            <div className="rounded-xl bg-[#07182D] text-white p-5 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-[#5CC3FF]">
                  <Fingerprint className="w-4 h-4" />
                  <span>HOOKSUM PRIOR ART STAMP · 선행기술 타임스탬프 박제 정보</span>
                </div>
                <span className="text-[11px] text-[#D9E6F2]/75 font-mono">
                  UTC {idea.createdAt}
                </span>
              </div>

              {idea.stampHash && (
                <div className="bg-[#0B2340] border border-[#123454] rounded-lg px-3.5 py-2.5 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[10px] uppercase tracking-wider text-[#5CC3FF] font-semibold">
                      SHA-256 디지털 인감 (위변조 검증 해시)
                    </p>
                    <p className="font-mono text-xs text-[#D9E6F2] truncate mt-0.5">
                      {idea.stampHash}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyHash}
                    className="px-2.5 py-1.5 rounded bg-[#123454] hover:bg-[#147FC5] text-xs font-semibold text-white inline-flex items-center gap-1 shrink-0 transition-colors"
                  >
                    {copiedHash ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>복사됨</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>해시 복사</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setShowCertificate(true)}
                  className="px-4 py-2.5 rounded-lg bg-[#147FC5] hover:bg-[#2998D6] text-white text-xs sm:text-sm font-semibold inline-flex items-center gap-2 transition-colors"
                >
                  <Award className="w-4 h-4" />
                  <span>원작자 명예 증명서 보기 / 인쇄</span>
                </button>

                <Link
                  href={`/space-ideas/submit?parentId=${idea.id}`}
                  className="px-4 py-2.5 rounded-lg border border-[#5CC3FF]/50 hover:bg-white/10 text-[#D9E6F2] text-xs sm:text-sm font-semibold inline-flex items-center gap-2 transition-colors"
                >
                  <GitBranch className="w-4 h-4 text-[#5CC3FF]" />
                  <span>이 아이디어에 훅(Hook) 연결하기</span>
                </Link>
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-[#E5EAF0] flex flex-wrap items-center justify-between gap-4 text-xs text-[#5D6B78]">
            <div>
              원작자(제안자):{" "}
              <strong className="text-[#17212B]">
                {idea.displayMode === "anonymous"
                  ? "익명 참여자"
                  : idea.authorName}
              </strong>
            </div>

            <button
              type="button"
              onClick={() =>
                setReportTarget({
                  type: "idea",
                  id: idea.id,
                  label: idea.title,
                })
              }
              className="inline-flex items-center gap-1 text-[#5D6B78] hover:text-red-600 font-medium"
            >
              <Flag className="w-3.5 h-3.5" />
              <span>게시물 신고</span>
            </button>
          </div>
        </article>

        {/* Hook Chain Genealogy Tree (창작 족보) */}
        {isIdea && hookChain && (
          <section className="bg-white rounded-2xl border border-[#E5EAF0] p-7 sm:p-9 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="space-y-1">
                <h2 className="text-lg font-bold text-[#17212B] flex items-center gap-2">
                  <GitBranch className="w-5 h-5 text-[#147FC5]" />
                  <span>창작 족보 · 훅체인 (Hook Chain)</span>
                </h2>
                <p className="text-xs text-[#5D6B78]">
                  원본(제네시스 훅)에서 출발해 다른 창작자들의 영감과 개선안이 연결된
                  진화 계보입니다.
                </p>
              </div>
              <Link
                href={`/space-ideas/submit?parentId=${idea.id}`}
                className="px-3.5 py-2 rounded-lg bg-[#E8F4FC] hover:bg-[#147FC5] text-[#147FC5] hover:text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
              >
                <GitBranch className="w-3.5 h-3.5" />
                <span>+ 파생 아이디어 연결</span>
              </Link>
            </div>

            <div className="space-y-2.5">
              {hookChain.nodes.map((node) => {
                const isCurrent = node.id === idea.id;
                const indentPx = Math.min((node.chainDepth - 1) * 20, 60);

                return (
                  <div
                    key={node.id}
                    style={{ marginLeft: `${indentPx}px` }}
                    className={`rounded-xl p-4 border transition-colors ${
                      isCurrent
                        ? "bg-[#E8F4FC]/70 border-[#147FC5]"
                        : "bg-[#F8FAFC] border-[#E5EAF0] hover:border-[#147FC5]"
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs mb-1">
                      <div className="flex flex-wrap items-center gap-2">
                        {node.stampId && (
                          <span className="px-2 py-0.5 rounded bg-[#07182D] text-[#5CC3FF] font-mono font-bold">
                            {node.stampId}
                          </span>
                        )}
                        <span className="font-semibold text-[#147FC5]">
                          {node.chainDepth === 1
                            ? "제네시스 훅 (1세대)"
                            : `${node.chainDepth}차 파생 훅`}
                        </span>
                        {isCurrent && (
                          <span className="px-2 py-0.5 rounded-full bg-[#147FC5] text-white text-[11px] font-semibold">
                            현재 열람 중
                          </span>
                        )}
                      </div>
                      <span className="text-[#5D6B78] tabular-nums">
                        {node.createdAt.slice(0, 10)} · {node.authorName}
                      </span>
                    </div>

                    {isCurrent ? (
                      <p className="text-sm font-bold text-[#0B2340]">
                        {node.title}
                      </p>
                    ) : (
                      <Link
                        href={`/space-ideas/${node.id}`}
                        className="text-sm font-bold text-[#17212B] hover:text-[#147FC5] block"
                      >
                        {node.title}
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Defensive Publication Reminder */}
        <div className="rounded-xl bg-[#E8F4FC]/70 border border-[#147FC5]/25 p-4 flex items-start gap-2.5 text-xs text-[#0B2340]">
          <ShieldCheck className="w-4 h-4 text-[#147FC5] shrink-0 mt-0.5" />
          <p>
            본 공개 게시물은 선행기술(Prior Art)로서 제3자의 부당한 독점 특허화를
            방지하며, 원작자의 명예와 지식재산권은 작성자에게 유지됩니다(약관:{" "}
            {idea.termsVersion}). 권리 침해가 의심되는 경우 신고 기능을 이용해 주세요.
          </p>
        </div>

        {/* Comments Section */}
        <section className="bg-white rounded-2xl border border-[#E5EAF0] p-7 sm:p-9 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#17212B] flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#147FC5]" />
              <span>의견 및 토론 댓글 ({comments.length})</span>
            </h2>
          </div>

          {comments.length === 0 ? (
            <p className="text-sm text-[#5D6B78] py-4">
              아직 등록된 의견이 없습니다. 첫 번째 의견을 남겨보세요.
            </p>
          ) : (
            <div className="space-y-4">
              {comments.map((cmt) => (
                <div
                  key={cmt.id}
                  className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E5EAF0] space-y-2"
                >
                  <div className="flex items-center justify-between text-xs text-[#5D6B78]">
                    <strong className="text-[#17212B]">
                      {cmt.displayMode === "anonymous"
                        ? "익명 참여자"
                        : cmt.authorName}
                    </strong>
                    <div className="flex items-center gap-3">
                      <span className="tabular-nums">
                        {cmt.createdAt.slice(0, 10)}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setReportTarget({
                            type: "comment",
                            id: cmt.id,
                            label: cmt.body.slice(0, 30),
                          })
                        }
                        className="hover:text-red-600 inline-flex items-center gap-1"
                      >
                        <Flag className="w-3 h-3" />
                        <span>신고</span>
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-[#17212B] leading-relaxed whitespace-pre-line">
                    {cmt.body}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Add Comment Form */}
          <form
            onSubmit={handleCommentSubmit}
            className="pt-4 border-t border-[#E5EAF0] space-y-4"
          >
            {!user && (
              <div className="p-3.5 rounded-lg bg-[#F8FAFC] border border-[#E5EAF0] flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="text-[#5D6B78]">
                  댓글 작성은 로그인 후 이용하실 수 있습니다.
                </span>
                <button
                  type="button"
                  onClick={handleQuickDemoLogin}
                  className="px-3 py-1.5 rounded bg-[#147FC5] text-white font-semibold"
                >
                  데모 계정으로 즉시 로그인
                </button>
              </div>
            )}

            {commentError && (
              <p role="alert" className="text-xs text-red-600 font-semibold">
                {commentError}
              </p>
            )}

            <div>
              <label
                htmlFor="commentBody"
                className="block text-xs font-bold text-[#17212B] mb-2"
              >
                의견 남기기
              </label>
              <textarea
                id="commentBody"
                rows={3}
                value={commentBody}
                onChange={(e) => setCommentBody(e.target.value)}
                placeholder="기술적 조언, 참고 자료를 남기거나, 구체적인 발전 아이디어라면 상단의 '훅(Hook) 연결하기'로 정식 계보를 이어보세요."
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5EAF0] text-sm text-[#17212B]"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs">
                <label htmlFor="commentDisplayMode" className="text-[#5D6B78]">
                  표기 방식:
                </label>
                <select
                  id="commentDisplayMode"
                  value={commentDisplayMode}
                  onChange={(e) =>
                    setCommentDisplayMode(
                      e.target.value as "public" | "anonymous"
                    )
                  }
                  className="px-2.5 py-1.5 rounded border border-[#E5EAF0] bg-white text-[#17212B]"
                >
                  <option value="public">이름 공개</option>
                  <option value="anonymous">익명 표시</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={commentSubmitting || !user}
                className="px-5 py-2.5 rounded-lg bg-[#147FC5] hover:bg-[#2998D6] disabled:bg-slate-300 text-white text-xs font-semibold inline-flex items-center gap-1.5 min-h-[40px]"
              >
                <Send className="w-3.5 h-3.5" />
                <span>댓글 등록</span>
              </button>
            </div>
          </form>
        </section>

        {/* Hooksum Certificate Modal */}
        {showCertificate && isIdea && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="hooksum-cert-title"
            className="fixed inset-0 z-50 bg-black/65 flex items-center justify-center p-4 overflow-y-auto"
          >
            <div className="bg-white rounded-2xl max-w-2xl w-full p-5 sm:p-7 shadow-2xl space-y-5 my-8">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-[#147FC5]">
                  <Award className="w-4 h-4" />
                  <span>HOOKSUM CERTIFICATE OF ORIGIN</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowCertificate(false)}
                  className="p-1.5 rounded-lg hover:bg-slate-100 text-[#5D6B78]"
                  aria-label="닫기"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Certificate Frame */}
              <div className="border-2 border-[#0B2340] p-2 rounded-xl">
                <div className="border border-[#147FC5]/50 rounded-lg p-5 sm:p-7 space-y-5 bg-gradient-to-b from-white to-[#F8FAFC]">
                  <div className="text-center space-y-1">
                    <p className="text-[11px] font-bold tracking-widest text-[#147FC5]">
                      PRIOR ART STAMP &amp; CREATOR HONOR
                    </p>
                    <h3
                      id="hooksum-cert-title"
                      className="text-2xl sm:text-3xl font-bold text-[#07182D]"
                    >
                      원작자 명예 증명서
                    </h3>
                    <p className="text-xs text-[#5D6B78]">
                      후크인터스텔라(주) 우주 아이디어 선행기술 박제 아카이브
                    </p>
                  </div>

                  <div className="bg-[#07182D] text-[#5CC3FF] text-center py-2.5 px-4 rounded-lg font-mono text-sm sm:text-base font-bold">
                    박제 고유 번호: {idea.stampId || idea.id}
                  </div>

                  <dl className="divide-y divide-[#E5EAF0] text-xs sm:text-sm">
                    <div className="py-2.5 grid grid-cols-1 sm:grid-cols-3 gap-1">
                      <dt className="text-[#5D6B78] font-medium">아이디어 제목</dt>
                      <dd className="sm:col-span-2 font-bold text-[#17212B]">
                        {idea.title}
                      </dd>
                    </div>
                    <div className="py-2.5 grid grid-cols-1 sm:grid-cols-3 gap-1">
                      <dt className="text-[#5D6B78] font-medium">원작자 (창작자)</dt>
                      <dd className="sm:col-span-2 font-bold text-[#17212B]">
                        {idea.displayMode === "anonymous"
                          ? "익명 참여자 (내부 계정 보호)"
                          : idea.authorName}
                      </dd>
                    </div>
                    <div className="py-2.5 grid grid-cols-1 sm:grid-cols-3 gap-1">
                      <dt className="text-[#5D6B78] font-medium">분야 및 계보</dt>
                      <dd className="sm:col-span-2 font-semibold text-[#0B2340]">
                        {idea.category} ·{" "}
                        {depth === 1
                          ? "제네시스 훅 (1세대 원본)"
                          : `${depth}차 파생 훅`}
                      </dd>
                    </div>
                    <div className="py-2.5 grid grid-cols-1 sm:grid-cols-3 gap-1">
                      <dt className="text-[#5D6B78] font-medium">최초 박제 시점</dt>
                      <dd className="sm:col-span-2 font-mono text-[#17212B]">
                        {idea.createdAt} (UTC)
                      </dd>
                    </div>
                    <div className="py-2.5 grid grid-cols-1 sm:grid-cols-3 gap-1">
                      <dt className="text-[#5D6B78] font-medium">
                        SHA-256 디지털 인감
                      </dt>
                      <dd className="sm:col-span-2 font-mono text-[11px] text-[#0B2340] break-all">
                        {idea.stampHash}
                      </dd>
                    </div>
                  </dl>

                  <div className="p-4 rounded-lg bg-[#E8F4FC]/80 border-l-4 border-[#147FC5] text-xs text-[#0B2340] leading-relaxed">
                    <strong>[안티-특허 및 원작자 명예 선언]</strong> 본 증명서는
                    배타적 독점 권리증이 아니라, 위 아이디어가 명기된 시점에 세상에
                    먼저 박제·공개되어 누구도 부당하게 독점할 수 없는{" "}
                    <strong>선행기술(Prior Art)</strong>이 되었으며, 위 창작자가 이
                    아이디어의 명예로운 시작점임을 공식 증명합니다.
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs text-[#5D6B78]">
                    <span>HOOK INTERSTELLAR ARCHIVE</span>
                    <strong className="text-[#07182D]">후크인터스텔라(주)</strong>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowCertificate(false)}
                  className="px-4 py-2.5 rounded-lg border border-[#E5EAF0] text-xs font-semibold text-[#5D6B78]"
                >
                  닫기
                </button>
                <button
                  type="button"
                  onClick={handlePrintCertificate}
                  className="px-5 py-2.5 rounded-lg bg-[#147FC5] hover:bg-[#2998D6] text-white text-xs font-semibold inline-flex items-center gap-2"
                >
                  <Printer className="w-4 h-4" />
                  <span>인쇄 / PDF 저장</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Report Dialog Modal */}
        {reportTarget && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="report-dialog-title"
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl">
              <h3
                id="report-dialog-title"
                className="text-lg font-bold text-[#17212B]"
              >
                커뮤니티 게시물/댓글 신고
              </h3>
              <p className="text-xs text-[#5D6B78]">
                대상: <strong>{reportTarget.label}</strong>
              </p>

              {reportSuccess ? (
                <div className="p-4 rounded-lg bg-[#E8F4FC] text-[#0B2340] text-xs font-semibold">
                  {reportSuccess}
                </div>
              ) : (
                <form onSubmit={handleReportSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="reportReason"
                      className="block text-xs font-bold text-[#17212B] mb-1.5"
                    >
                      신고 사유
                    </label>
                    <select
                      id="reportReason"
                      value={reportReason}
                      onChange={(e) => setReportReason(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-[#E5EAF0] text-sm"
                    >
                      <option value="스팸 또는 부적절한 홍보">
                        스팸 또는 부적절한 홍보
                      </option>
                      <option value="타인의 지식재산권 또는 저작권 침해 의심">
                        타인의 지식재산권 또는 저작권 침해 의심
                      </option>
                      <option value="개인정보 노출">개인정보 노출</option>
                      <option value="비방·욕설 또는 커뮤니티 규칙 위반">
                        비방·욕설 또는 커뮤니티 규칙 위반
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="reportDetails"
                      className="block text-xs font-bold text-[#17212B] mb-1.5"
                    >
                      상세 사유 (선택)
                    </label>
                    <textarea
                      id="reportDetails"
                      rows={3}
                      value={reportDetails}
                      onChange={(e) => setReportDetails(e.target.value)}
                      placeholder="관리자가 확인할 수 있도록 구체적인 사유를 적어주세요."
                      className="w-full px-3 py-2 rounded-lg border border-[#E5EAF0] text-sm"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setReportTarget(null)}
                      className="px-4 py-2 rounded-lg border border-[#E5EAF0] text-xs font-semibold text-[#5D6B78]"
                    >
                      취소
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-semibold"
                    >
                      신고 접수하기
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function IdeaDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  return (
    <Suspense
      fallback={
        <div className="container-shell py-20 max-w-3xl">
          <div className="h-64 rounded-2xl bg-slate-100 animate-pulse" />
        </div>
      }
    >
      <IdeaDetailContent id={id} />
    </Suspense>
  );
}
