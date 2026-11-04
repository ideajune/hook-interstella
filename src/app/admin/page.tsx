"use client";

import React, { useState, useEffect } from "react";
import {
  ActivityStatus,
  Article,
  ArticleCategory,
  BusinessActivity,
  Comment,
  Idea,
  Inquiry,
  ModerationAction,
  Report,
  UserRole,
} from "@/lib/types";
import { StatusBadge } from "@/components/StatusBadge";
import {
  BookOpen,
  Briefcase,
  CheckCircle2,
  ClipboardList,
  Flag,
  Lock,
  MessageSquare,
  Shield,
  Users,
} from "lucide-react";

type AdminTab =
  | "ideas"
  | "business"
  | "insights"
  | "reports"
  | "inquiries"
  | "users"
  | "audit";

const ALLOWED_STATUSES: ActivityStatus[] = [
  "운영 중",
  "개발 중",
  "연구 주제",
  "구상 단계",
  "협력 모집 중",
  "종료",
];

export default function AdminDashboardPage() {
  const [tab, setTab] = useState<AdminTab>("ideas");
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [currentUser, setCurrentUser] = useState<{
    id: string;
    displayName: string;
    email: string;
    role: UserRole;
  } | null>(null);

  const [businessActivities, setBusinessActivities] = useState<
    BusinessActivity[]
  >([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [users, setUsers] = useState<
    {
      id: string;
      email: string;
      displayName: string;
      role: UserRole;
      accountStatus: "active" | "suspended";
      createdAt: string;
    }[]
  >([]);
  const [moderationActions, setModerationActions] = useState<
    ModerationAction[]
  >([]);

  // New Article State
  const [newArtTitle, setNewArtTitle] = useState("");
  const [newArtCategory, setNewArtCategory] =
    useState<ArticleCategory>("News");
  const [newArtExcerpt, setNewArtExcerpt] = useState("");
  const [newArtBody, setNewArtBody] = useState("");
  const [feedbackMsg, setFeedbackMsg] = useState("");

  // Admin Login Form State
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [adminLoginError, setAdminLoginError] = useState("");

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin");
      if (!res.ok) {
        setAuthorized(false);
        setLoading(false);
        return;
      }
      const data = await res.json();
      setAuthorized(true);
      setCurrentUser(data.currentUser);
      setBusinessActivities(data.businessActivities ?? []);
      setArticles(data.articles ?? []);
      setIdeas(data.ideas ?? []);
      setComments(data.comments ?? []);
      setReports(data.reports ?? []);
      setInquiries(data.inquiries ?? []);
      setUsers(data.users ?? []);
      setModerationActions(data.moderationActions ?? []);
    } catch {
      setAuthorized(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const showToast = (msg: string) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(""), 3000);
  };

  const handleAdminFormLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminLoginError("");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: adminEmail.trim(),
        password: adminPassword,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      setAdminLoginError(data.error || "이메일 또는 비밀번호가 올바르지 않습니다.");
      return;
    }
    if (data.user?.role !== "admin") {
      setAdminLoginError("총괄 관리자 권한이 없는 계정입니다.");
      return;
    }
    fetchAdminData();
  };

  const quickAdminLogin = async (email: string, password: string) => {
    setAdminLoginError("");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      fetchAdminData();
    }
  };

  const runAdminPatch = async (payload: Record<string, unknown>, successMsg: string) => {
    const res = await fetch("/api/admin", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) {
      showToast(`오류: ${data.error || "권한이 없거나 요청에 실패했습니다."}`);
    } else {
      showToast(successMsg);
      fetchAdminData();
    }
  };

  const handleCreateArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newArtTitle.trim() || !newArtExcerpt.trim() || !newArtBody.trim()) {
      showToast("아티클 제목, 요약, 본문을 모두 입력해 주세요.");
      return;
    }
    await runAdminPatch(
      {
        actionType: "create_article",
        title: newArtTitle,
        category: newArtCategory,
        excerpt: newArtExcerpt,
        bodyText: newArtBody,
        status: "published",
      },
      "새 인사이트 아티클이 발행되었습니다."
    );
    setNewArtTitle("");
    setNewArtExcerpt("");
    setNewArtBody("");
  };

  if (loading) {
    return (
      <div className="container-shell py-20">
        <div className="h-64 rounded-2xl bg-slate-100 animate-pulse" />
      </div>
    );
  }

  if (!authorized || !currentUser) {
    return (
      <div className="py-20 bg-[#F8FAFC] min-h-[75vh] flex items-center">
        <div className="container-shell max-w-md">
          <div className="bg-white rounded-2xl border border-[#E5EAF0] p-8 sm:p-10 space-y-6">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#07182D] text-[#2998D6] flex items-center justify-center mx-auto">
                <Lock className="w-6 h-6" />
              </div>
              <h1 className="text-xl font-bold text-[#17212B]">
                총괄 관리자 로그인
              </h1>
              <p className="text-xs text-[#5D6B78] leading-relaxed">
                관리자 운영 콘솔(`/admin`)은 총괄 관리자 계정만 접근할 수 있습니다.
              </p>
            </div>

            {adminLoginError && (
              <div
                role="alert"
                className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 font-semibold"
              >
                {adminLoginError}
              </div>
            )}

            <form onSubmit={handleAdminFormLogin} className="space-y-4">
              <div>
                <label
                  htmlFor="adminEmail"
                  className="block text-xs font-bold text-[#17212B] mb-1.5"
                >
                  관리자 이메일
                </label>
                <input
                  id="adminEmail"
                  type="email"
                  required
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  placeholder="admin@hookinterstellar.local"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5EAF0] text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="adminPassword"
                  className="block text-xs font-bold text-[#17212B] mb-1.5"
                >
                  비밀번호
                </label>
                <input
                  id="adminPassword"
                  type="password"
                  required
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="비밀번호 입력"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5EAF0] text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-[#07182D] hover:bg-[#123454] text-white text-sm font-semibold"
              >
                관리자 로그인
              </button>
            </form>

            <div className="pt-4 border-t border-[#E5EAF0]">
              <button
                type="button"
                onClick={() =>
                  quickAdminLogin("admin@hookinterstellar.local", "admin1234")
                }
                className="w-full py-2.5 rounded-lg bg-[#E8F4FC] hover:bg-[#D9E6F2] text-[#0B2340] text-xs font-semibold transition-colors"
              >
                총괄 관리자 원클릭 로그인 (테스트용)
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F8FAFC] min-h-screen py-12">
      <div className="container-shell space-y-8">
        {/* Top Bar */}
        <div className="bg-[#07182D] text-white rounded-2xl p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#2998D6] uppercase tracking-wider">
              <Shield className="w-4 h-4" />
              <span>HOOK INTERSTELLAR ADMINISTRATION CONSOLE</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold">
              통합 운영 및 모더레이션 관리 시스템
            </h1>
            <p className="text-xs text-[#D9E6F2]/80">
              접속자: <strong>{currentUser.displayName}</strong> ({currentUser.email}) ·
              서버 검증 권한:{" "}
              <span className="px-2 py-0.5 rounded bg-[#147FC5] text-white font-bold uppercase">
                {currentUser.role}
              </span>
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3 rounded-xl bg-[#0B2340] border border-[#123454]">
              <p className="text-xl font-bold tabular-nums">{ideas.length}</p>
              <p className="text-[11px] text-[#D9E6F2]/75">SPACE IDEAS</p>
            </div>
            <div className="p-3 rounded-xl bg-[#0B2340] border border-[#123454]">
              <p className="text-xl font-bold tabular-nums">{inquiries.length}</p>
              <p className="text-[11px] text-[#D9E6F2]/75">접수된 문의/제안</p>
            </div>
            <div className="p-3 rounded-xl bg-[#0B2340] border border-[#123454]">
              <p className="text-xl font-bold tabular-nums">{reports.length}</p>
              <p className="text-[11px] text-[#D9E6F2]/75">신고 내역</p>
            </div>
            <div className="p-3 rounded-xl bg-[#0B2340] border border-[#123454]">
              <p className="text-xl font-bold tabular-nums">{articles.length}</p>
              <p className="text-[11px] text-[#D9E6F2]/75">INSIGHTS</p>
            </div>
          </div>
        </div>

        {feedbackMsg && (
          <div
            role="status"
            className="p-4 rounded-xl bg-[#E8F4FC] border border-[#147FC5] text-[#0B2340] text-sm font-semibold flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-[#147FC5]" />
            <span>{feedbackMsg}</span>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2">
          {[
            {
              id: "ideas",
              label: `1. SPACE IDEAS 승인·관리 (${ideas.length})`,
              icon: <MessageSquare className="w-4 h-4" />,
            },
            {
              id: "business",
              label: "2. 세부 사업 상태 관리",
              icon: <Briefcase className="w-4 h-4" />,
            },
            {
              id: "insights",
              label: `3. INSIGHTS 콘텐츠 관리 (${articles.length})`,
              icon: <BookOpen className="w-4 h-4" />,
            },
            {
              id: "reports",
              label: `4. 댓글 및 신고 관리 (${reports.length})`,
              icon: <Flag className="w-4 h-4" />,
            },
            {
              id: "inquiries",
              label: `5. 파트너십·일반 문의 (${inquiries.length})`,
              icon: <ClipboardList className="w-4 h-4" />,
            },
            {
              id: "users",
              label: `6. 사용자 및 권한 (${users.length})`,
              icon: <Users className="w-4 h-4" />,
            },
            {
              id: "audit",
              label: `7. 감사 로그 (${moderationActions.length})`,
              icon: <Shield className="w-4 h-4" />,
            },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id as AdminTab)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold inline-flex items-center gap-2 transition-colors min-h-[42px] ${
                tab === item.id
                  ? "bg-[#147FC5] text-white"
                  : "bg-white border border-[#E5EAF0] text-[#17212B] hover:border-[#147FC5]"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* TAB 1: SPACE IDEAS MODERATION */}
        {tab === "ideas" && (
          <div className="bg-white rounded-2xl border border-[#E5EAF0] p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-[#17212B]">
                SPACE IDEAS 게시물 승인 및 모더레이션 큐
              </h2>
              <p className="text-xs text-[#5D6B78] mt-1">
                등록된 아이디어를 검토하여 공개 승인(published), 숨김(hidden), 반려(rejected),
                삭제(removed) 상태로 변경할 수 있습니다.
              </p>
            </div>

            <div className="space-y-4">
              {ideas.map((idea) => (
                <div
                  key={idea.id}
                  className="p-5 rounded-xl bg-[#F8FAFC] border border-[#E5EAF0] flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 max-w-2xl">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span
                        className={`px-2.5 py-0.5 rounded font-bold uppercase ${
                          idea.moderationStatus === "published"
                            ? "bg-emerald-100 text-emerald-900"
                            : idea.moderationStatus === "pending"
                            ? "bg-amber-100 text-amber-900"
                            : "bg-red-100 text-red-900"
                        }`}
                      >
                        {idea.moderationStatus}
                      </span>
                      <span className="font-semibold text-[#147FC5]">
                        [{idea.category}]
                      </span>
                      <span className="text-[#5D6B78]">
                        실제 작성자: {idea.authorName} (표기모드: {idea.displayMode})
                      </span>
                      <span className="text-[#5D6B78]">
                        후속연락 동의: {idea.followUpConsent ? "동의함" : "미동의"}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-[#17212B]">
                      {idea.title}
                    </h3>
                    <p className="text-xs text-[#5D6B78] line-clamp-2">
                      {idea.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    {(
                      ["published", "pending", "hidden", "rejected", "removed"] as const
                    ).map((st) => (
                      <button
                        key={st}
                        type="button"
                        onClick={() =>
                          runAdminPatch(
                            {
                              actionType: "moderate_idea",
                              id: idea.id,
                              moderationStatus: st,
                              reason: `관리자 상태 변경 (${st})`,
                            },
                            `게시물 상태가 '${st}'(으)로 변경되었습니다.`
                          )
                        }
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                          idea.moderationStatus === st
                            ? "bg-[#07182D] text-white border-[#07182D]"
                            : "bg-white text-[#17212B] border-[#E5EAF0] hover:border-[#147FC5]"
                        }`}
                      >
                        {st === "published"
                          ? "공개 승인"
                          : st === "pending"
                          ? "대기"
                          : st === "hidden"
                          ? "숨김"
                          : st === "rejected"
                          ? "반려"
                          : "삭제"}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: BUSINESS STATUS MANAGEMENT */}
        {tab === "business" && (
          <div className="bg-white rounded-2xl border border-[#E5EAF0] p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-[#17212B]">
                BUSINESS 세부 사업 상태 관리
              </h2>
              <p className="text-xs text-[#5D6B78] mt-1">
                총괄 관리자는 각 세부 사업의 현재 단계(`운영 중`, `개발 중`, `연구 주제`,
                `구상 단계`, `협력 모집 중`, `종료`)를 실시간으로 변경할 수 있습니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {businessActivities.map((act) => (
                <div
                  key={act.id}
                  className="p-5 rounded-xl bg-[#F8FAFC] border border-[#E5EAF0] space-y-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-mono font-bold text-[#147FC5]">
                      과제 #{String(act.codeNumber).padStart(2, "0")} ({act.groupSlug})
                    </span>
                    <StatusBadge status={act.activityStatus} />
                  </div>
                  <h3 className="text-sm font-bold text-[#17212B]">{act.title}</h3>
                  <div className="flex items-center gap-2 pt-2">
                    <label
                      htmlFor={`status-${act.id}`}
                      className="text-xs font-semibold text-[#5D6B78]"
                    >
                      상태 변경:
                    </label>
                    <select
                      id={`status-${act.id}`}
                      value={act.activityStatus}
                      onChange={(e) =>
                        runAdminPatch(
                          {
                            actionType: "update_business_activity",
                            id: act.id,
                            activityStatus: e.target.value,
                          },
                          `제${act.codeNumber}조 상태가 '${e.target.value}'(으)로 변경되었습니다.`
                        )
                      }
                      className="px-3 py-1.5 rounded-lg border border-[#E5EAF0] bg-white text-xs font-semibold text-[#17212B]"
                    >
                      {ALLOWED_STATUSES.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: INSIGHTS EDITORIAL MANAGEMENT */}
        {tab === "insights" && (
          <div className="space-y-8">
            <form
              onSubmit={handleCreateArticle}
              className="bg-white rounded-2xl border border-[#E5EAF0] p-6 sm:p-8 space-y-4"
            >
              <h2 className="text-xl font-bold text-[#17212B]">
                신규 INSIGHTS 아티클 발행 (FR-062)
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="newArtTitle"
                    className="block text-xs font-bold text-[#17212B] mb-1"
                  >
                    아티클 제목
                  </label>
                  <input
                    id="newArtTitle"
                    type="text"
                    value={newArtTitle}
                    onChange={(e) => setNewArtTitle(e.target.value)}
                    placeholder="제목을 입력하세요"
                    className="w-full px-3.5 py-2 rounded-lg border border-[#E5EAF0] text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="newArtCategory"
                    className="block text-xs font-bold text-[#17212B] mb-1"
                  >
                    카테고리
                  </label>
                  <select
                    id="newArtCategory"
                    value={newArtCategory}
                    onChange={(e) =>
                      setNewArtCategory(e.target.value as ArticleCategory)
                    }
                    className="w-full px-3.5 py-2 rounded-lg border border-[#E5EAF0] text-sm bg-white"
                  >
                    <option value="News">News</option>
                    <option value="Research & Technology">
                      Research & Technology
                    </option>
                    <option value="Space Industry">Space Industry</option>
                    <option value="Education">Education</option>
                    <option value="Opinion">Opinion</option>
                    <option value="Reports">Reports</option>
                  </select>
                </div>
              </div>
              <div>
                <label
                  htmlFor="newArtExcerpt"
                  className="block text-xs font-bold text-[#17212B] mb-1"
                >
                  요약문 (Excerpt)
                </label>
                <input
                  id="newArtExcerpt"
                  type="text"
                  value={newArtExcerpt}
                  onChange={(e) => setNewArtExcerpt(e.target.value)}
                  placeholder="목록에 표시될 1~2문장 요약"
                  className="w-full px-3.5 py-2 rounded-lg border border-[#E5EAF0] text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="newArtBody"
                  className="block text-xs font-bold text-[#17212B] mb-1"
                >
                  본문 내용
                </label>
                <textarea
                  id="newArtBody"
                  rows={5}
                  value={newArtBody}
                  onChange={(e) => setNewArtBody(e.target.value)}
                  placeholder="본문 내용을 작성해 주세요."
                  className="w-full px-3.5 py-2 rounded-lg border border-[#E5EAF0] text-sm"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-lg bg-[#147FC5] hover:bg-[#2998D6] text-white text-xs font-semibold"
                >
                  아티클 즉시 발행하기
                </button>
              </div>
            </form>

            <div className="bg-white rounded-2xl border border-[#E5EAF0] p-6 sm:p-8 space-y-4">
              <h3 className="text-lg font-bold text-[#17212B]">
                등록된 인사이트 목록 ({articles.length})
              </h3>
              {articles.map((art) => (
                <div
                  key={art.id}
                  className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E5EAF0] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-bold text-[#147FC5]">
                        [{art.category}]
                      </span>
                      <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-800 font-semibold">
                        {art.status}
                      </span>
                      <span className="text-[#5D6B78]">{art.publishedAt}</span>
                    </div>
                    <p className="text-sm font-bold text-[#17212B]">{art.title}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() =>
                        runAdminPatch(
                          {
                            actionType: "toggle_article_status",
                            id: art.id,
                            status:
                              art.status === "published" ? "draft" : "published",
                          },
                          "아티클 공개 상태가 변경되었습니다."
                        )
                      }
                      className="px-3 py-1.5 rounded-lg border border-[#E5EAF0] bg-white text-xs font-semibold"
                    >
                      {art.status === "published" ? "비공개(Draft) 전환" : "공개 발행"}
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        runAdminPatch(
                          { actionType: "delete_article", id: art.id },
                          "아티클이 삭제되었습니다."
                        )
                      }
                      className="px-3 py-1.5 rounded-lg bg-red-50 text-red-700 text-xs font-semibold"
                    >
                      삭제
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: REPORTS & COMMENTS */}
        {tab === "reports" && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-[#E5EAF0] p-6 sm:p-8 space-y-4">
              <h2 className="text-xl font-bold text-[#17212B]">
                신고 접수 큐 ({reports.length})
              </h2>
              {reports.length === 0 ? (
                <p className="text-sm text-[#5D6B78]">
                  현재 대기 중인 신고 내역이 없습니다.
                </p>
              ) : (
                reports.map((rep) => (
                  <div
                    key={rep.id}
                    className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E5EAF0] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="px-2 py-0.5 rounded bg-red-100 text-red-900 font-bold">
                          {rep.status}
                        </span>
                        <span className="font-semibold text-[#17212B]">
                          대상 유형: {rep.targetType} ({rep.targetTitlePreview})
                        </span>
                      </div>
                      <p className="text-sm font-bold text-[#17212B]">
                        사유: {rep.reason}
                      </p>
                      {rep.details && (
                        <p className="text-xs text-[#5D6B78]">{rep.details}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          runAdminPatch(
                            {
                              actionType: "resolve_report",
                              id: rep.id,
                              status: "resolved",
                            },
                            "신고가 조치 완료(resolved) 처리되었습니다."
                          )
                        }
                        className="px-3 py-1.5 rounded-lg bg-[#147FC5] text-white text-xs font-semibold"
                      >
                        조치 완료
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          runAdminPatch(
                            {
                              actionType: "resolve_report",
                              id: rep.id,
                              status: "dismissed",
                            },
                            "신고가 기각(dismissed) 처리되었습니다."
                          )
                        }
                        className="px-3 py-1.5 rounded-lg border border-[#E5EAF0] bg-white text-xs font-semibold"
                      >
                        기각
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="bg-white rounded-2xl border border-[#E5EAF0] p-6 sm:p-8 space-y-4">
              <h2 className="text-xl font-bold text-[#17212B]">
                전체 댓글 모더레이션 ({comments.length})
              </h2>
              {comments.map((cmt) => (
                <div
                  key={cmt.id}
                  className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E5EAF0] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <p className="text-xs text-[#5D6B78]">
                      작성자: <strong>{cmt.authorName}</strong> · 상태:{" "}
                      <strong>{cmt.moderationStatus}</strong>
                    </p>
                    <p className="text-sm text-[#17212B]">{cmt.body}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        runAdminPatch(
                          {
                            actionType: "moderate_comment",
                            id: cmt.id,
                            moderationStatus:
                              cmt.moderationStatus === "published"
                                ? "hidden"
                                : "published",
                          },
                          "댓글 상태가 변경되었습니다."
                        )
                      }
                      className="px-3 py-1.5 rounded-lg border border-[#E5EAF0] bg-white text-xs font-semibold"
                    >
                      {cmt.moderationStatus === "published" ? "숨김 처리" : "공개 복원"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: INQUIRIES & PARTNERSHIP PROPOSALS */}
        {tab === "inquiries" && (
          <div className="bg-white rounded-2xl border border-[#E5EAF0] p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-[#17212B]">
                PARTNERSHIP 협력 제안 및 CONTACT 일반 문의 관리
              </h2>
              <p className="text-xs text-[#5D6B78] mt-1">
                접수된 제안서와 문의의 검토 상태를 관리합니다.
              </p>
            </div>

            <div className="space-y-4">
              {inquiries.map((inq) => (
                <div
                  key={inq.id}
                  className="p-5 rounded-xl bg-[#F8FAFC] border border-[#E5EAF0] space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="px-2.5 py-0.5 rounded bg-[#E8F4FC] text-[#147FC5] font-bold uppercase">
                        {inq.channel}
                      </span>
                      <span className="font-semibold text-[#17212B]">
                        {inq.inquiryType}
                      </span>
                      <span className="text-[#5D6B78]">
                        ({inq.createdAt.slice(0, 10)})
                      </span>
                    </div>

                    <select
                      aria-label="문의 처리 상태 변경"
                      value={inq.status}
                      onChange={(e) =>
                        runAdminPatch(
                          {
                            actionType: "update_inquiry",
                            id: inq.id,
                            status: e.target.value,
                          },
                          `문의 상태가 '${e.target.value}'(으)로 업데이트되었습니다.`
                        )
                      }
                      className="px-3 py-1.5 rounded-lg border border-[#E5EAF0] bg-white text-xs font-bold text-[#17212B]"
                    >
                      <option value="new">신규 접수 (new)</option>
                      <option value="in_review">검토 중 (in_review)</option>
                      <option value="responded">회신 완료 (responded)</option>
                      <option value="closed">종결 (closed)</option>
                    </select>
                  </div>

                  <h3 className="text-base font-bold text-[#17212B]">
                    {inq.subject}
                  </h3>
                  <p className="text-sm text-[#5D6B78] whitespace-pre-line">
                    {inq.message}
                  </p>
                  <div className="pt-2 border-t border-[#E5EAF0] text-xs text-[#5D6B78] flex flex-wrap gap-4">
                    <span>
                      담당자: <strong className="text-[#17212B]">{inq.contactName}</strong>
                    </span>
                    {inq.organization && (
                      <span>
                        소속: <strong className="text-[#17212B]">{inq.organization}</strong>
                      </span>
                    )}
                    <span>이메일: {inq.email}</span>
                    {inq.phone && <span>연락처: {inq.phone}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: USERS & PERMISSIONS */}
        {tab === "users" && (
          <div className="bg-white rounded-2xl border border-[#E5EAF0] p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-[#17212B]">
                사용자 및 권한 관리
              </h2>
              <p className="text-xs text-[#5D6B78] mt-1">
                일반 사용자(`member`)와 총괄 관리자(`admin`) 역할 및 계정 활성 상태를
                관리합니다.
              </p>
            </div>

            <div className="space-y-3">
              {users.map((u) => (
                <div
                  key={u.id}
                  className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E5EAF0] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div>
                    <p className="text-sm font-bold text-[#17212B]">
                      {u.displayName}{" "}
                      <span className="text-xs font-normal text-[#5D6B78]">
                        ({u.email})
                      </span>
                    </p>
                    <p className="text-xs text-[#5D6B78]">
                      상태: {u.accountStatus} · 가입일: {u.createdAt.slice(0, 10)}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      aria-label={`${u.displayName} 역할 변경`}
                      value={u.role}
                      onChange={(e) =>
                        runAdminPatch(
                          {
                            actionType: "update_user",
                            id: u.id,
                            role: e.target.value,
                          },
                          `${u.displayName}님의 역할이 변경되었습니다.`
                        )
                      }
                      className="px-3 py-1.5 rounded-lg border border-[#E5EAF0] bg-white text-xs font-semibold"
                    >
                      <option value="member">일반 사용자 (member)</option>
                      <option value="admin">총괄 관리자 (admin)</option>
                    </select>

                    <button
                      type="button"
                      onClick={() =>
                        runAdminPatch(
                          {
                            actionType: "update_user",
                            id: u.id,
                            accountStatus:
                              u.accountStatus === "active"
                                ? "suspended"
                                : "active",
                          },
                          "계정 상태가 변경되었습니다."
                        )
                      }
                      className="px-3 py-1.5 rounded-lg border border-[#E5EAF0] bg-white text-xs font-semibold"
                    >
                      {u.accountStatus === "active" ? "계정 정지" : "정지 해제"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: AUDIT TRAIL */}
        {tab === "audit" && (
          <div className="bg-white rounded-2xl border border-[#E5EAF0] p-6 sm:p-8 space-y-4">
            <h2 className="text-xl font-bold text-[#17212B]">
              관리자 감사 로그 (Audit Trail — FR-115)
            </h2>
            <div className="space-y-3">
              {moderationActions.map((act) => (
                <div
                  key={act.id}
                  className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E5EAF0] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
                >
                  <div>
                    <strong className="text-[#147FC5]">[{act.targetType}]</strong>{" "}
                    <strong className="text-[#17212B]">{act.action}</strong> —{" "}
                    <span className="text-[#5D6B78]">{act.reason}</span>
                  </div>
                  <div className="text-[#5D6B78] tabular-nums">
                    실행자: {act.moderatorName} · {act.createdAt.slice(0, 19).replace("T", " ")}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
