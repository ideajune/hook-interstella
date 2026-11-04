"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { Idea, Comment } from "@/lib/types";
import {
  ArrowLeft,
  Flag,
  MessageSquare,
  Paperclip,
  Send,
  ShieldCheck,
} from "lucide-react";

export default function IdeaDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [idea, setIdea] = useState<Idea | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [user, setUser] = useState<{
    id: string;
    displayName: string;
    role: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

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
        setUser(authData.user ?? null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, [id]);

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

        {/* Main Idea Card */}
        <article className="bg-white rounded-2xl border border-[#E5EAF0] p-7 sm:p-9 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E5EAF0] pb-4">
            <div className="flex items-center gap-2 text-xs">
              <span className="px-3 py-1 rounded-full bg-[#E8F4FC] text-[#147FC5] font-semibold">
                {idea.category}
              </span>
              <span className="px-2.5 py-1 rounded bg-slate-100 text-[#5D6B78] font-medium">
                {idea.postType === "discussion" ? "DISCUSSION" : "IDEA BOARD"}
              </span>
              {idea.moderationStatus !== "published" && (
                <span className="px-2.5 py-1 rounded bg-amber-100 text-amber-900 font-bold">
                  상태: {idea.moderationStatus}
                </span>
              )}
            </div>
            <span className="text-xs text-[#5D6B78] tabular-nums">
              등록일: {idea.createdAt.slice(0, 10)}
            </span>
          </div>

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

          <div className="pt-5 border-t border-[#E5EAF0] flex flex-wrap items-center justify-between gap-4 text-xs text-[#5D6B78]">
            <div>
              작성자:{" "}
              <strong className="text-[#17212B]">
                {idea.displayMode === "anonymous" ? "익명 참여자" : idea.authorName}
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

        {/* IP Notice Reminder */}
        <div className="rounded-xl bg-[#E8F4FC]/70 border border-[#147FC5]/25 p-4 flex items-start gap-2.5 text-xs text-[#0B2340]">
          <ShieldCheck className="w-4 h-4 text-[#147FC5] shrink-0 mt-0.5" />
          <p>
            본 공개 게시물에 대한 권리는 작성자에게 있으며(약관 동의 버전:{" "}
            {idea.termsVersion}), 무단 도용이나 권리 침해가 의심되는 경우 신고 기능을
            통해 관리자에게 알려주시기 바랍니다.
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
                      <span className="tabular-nums">{cmt.createdAt.slice(0, 10)}</span>
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
                placeholder="기술적 조언, 보완 아이디어 또는 관련 참고 자료를 정중하게 남겨주세요."
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

        {/* Report Dialog Modal */}
        {reportTarget && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="report-dialog-title"
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl">
              <h3 id="report-dialog-title" className="text-lg font-bold text-[#17212B]">
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
