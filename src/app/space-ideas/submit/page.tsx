"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IdeaCategory } from "@/lib/types";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Lock,
  ShieldCheck,
} from "lucide-react";

const CATEGORIES: IdeaCategory[] = [
  "우주 기술",
  "우주여행·관광",
  "우주식품·생존",
  "우주 주거·생활",
  "우주 자원·에너지",
  "교육·콘텐츠",
  "기타",
];

export default function SubmitIdeaPage() {
  const router = useRouter();
  const [user, setUser] = useState<{
    id: string;
    displayName: string;
    email: string;
    role: string;
  } | null>(null);
  const [authChecking, setAuthChecking] = useState(true);

  const [postType, setPostType] = useState<"idea" | "discussion">("idea");
  const [category, setCategory] = useState<IdeaCategory>("우주 기술");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [attachmentName, setAttachmentName] = useState("");
  const [displayMode, setDisplayMode] = useState<"public" | "anonymous">("public");
  const [agreeRequiredTerms, setAgreeRequiredTerms] = useState(false);
  const [followUpConsent, setFollowUpConsent] = useState(false);

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submittedIdeaId, setSubmittedIdeaId] = useState<string | null>(null);
  const [submittedStatus, setSubmittedStatus] = useState<string>("");

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user ?? null);
        setAuthChecking(false);
      })
      .catch(() => setAuthChecking(false));
  }, []);

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
      const data = await res.json();
      setUser(data.user);
      router.refresh();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!user) {
      setError("아이디어 등록을 위해 먼저 로그인해 주세요.");
      return;
    }
    if (title.trim().length < 5) {
      setError("제목을 5자 이상 입력해 주세요.");
      return;
    }
    if (description.trim().length < 20) {
      setError("아이디어 또는 질문 내용을 20자 이상 구체적으로 작성해 주세요.");
      return;
    }
    if (!agreeRequiredTerms) {
      setError("커뮤니티 운영규칙, 지식재산권(IP) 고지 및 개인정보 수집·이용에 동의해 주세요.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/space-ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postType,
          category,
          title: title.trim(),
          description: description.trim(),
          attachmentName: attachmentName.trim() || undefined,
          displayMode,
          agreeRequiredTerms,
          followUpConsent,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "등록 중 오류가 발생했습니다.");
      } else {
        setSubmittedIdeaId(data.idea.id);
        setSubmittedStatus(data.idea.moderationStatus);
      }
    } catch {
      setError("서버와 통신 중 오류가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submittedIdeaId) {
    return (
      <div className="py-20 bg-[#F8FAFC] min-h-[70vh]">
        <div className="container-shell max-w-2xl">
          <div className="bg-white rounded-2xl border border-[#E5EAF0] p-8 sm:p-10 space-y-6 text-center">
            <div className="w-14 h-14 rounded-full bg-[#E8F4FC] text-[#147FC5] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#17212B]">
              아이디어가 성공적으로 등록되었습니다
            </h1>
            <p className="text-sm sm:text-base text-[#5D6B78] leading-relaxed">
              등록하신 게시물의 현재 상태는{" "}
              <strong className="text-[#147FC5]">
                {submittedStatus === "published" ? "공개 승인됨 (Published)" : "검토 대기 중 (Pending Review)"}
              </strong>
              입니다. 작성하신 아이디어의 지식재산권은 작성자 본인에게 유지됩니다.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-3">
              <Link
                href={`/space-ideas/${submittedIdeaId}`}
                className="px-6 py-3 rounded-lg bg-[#147FC5] hover:bg-[#2998D6] text-white text-sm font-semibold"
              >
                등록한 게시물 확인하기
              </Link>
              <Link
                href="/space-ideas"
                className="px-6 py-3 rounded-lg border border-[#E5EAF0] bg-white text-[#17212B] text-sm font-semibold"
              >
                SPACE IDEAS 목록으로
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F8FAFC] py-14 lg:py-20">
      <div className="container-shell max-w-3xl space-y-8">
        <div>
          <Link
            href="/space-ideas"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#147FC5] hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>SPACE IDEAS 목록으로 돌아가기</span>
          </Link>
          <h1 className="text-3xl font-bold text-[#17212B] mt-3">
            우주 아이디어 및 토론 주제 등록
          </h1>
          <p className="text-sm text-[#5D6B78] mt-1">
            우주 기술, 생존, 식량, 주거, 교육에 관한 참신한 구상이나 질문을 공유해 주세요.
          </p>
        </div>

        {/* IP & Patent Novelty Warning Box */}
        <div className="rounded-xl bg-white border border-[#147FC5]/30 p-6 space-y-3">
          <div className="flex items-center gap-2 text-sm font-bold text-[#0B2340]">
            <ShieldCheck className="w-5 h-5 text-[#147FC5]" />
            <span>지식재산권(IP) 보호 및 공개 게시 필수 안내</span>
          </div>
          <ul className="space-y-1.5 text-xs sm:text-sm text-[#5D6B78] list-disc pl-5 leading-relaxed">
            <li>
              <strong>아이디어 소유권 불이전:</strong> 본 게시판에 게시물을 등록하더라도
              아이디어의 소유권이나 지식재산권이 HOOK INTERSTELLAR로 자동 이전되지 않습니다.
            </li>
            <li>
              <strong>별도 계약 전제:</strong> 향후 당사가 귀하의 아이디어를 사업화하거나
              공동개발하고자 할 경우, 별도의 명시적 동의와 서면 계약을 체결합니다.
            </li>
            <li className="text-amber-900 font-medium">
              <AlertTriangle className="w-4 h-4 inline mr-1 text-amber-600" />
              <strong>특허 출원 유의 및 비밀 미보장:</strong> 공개 게시판 등록 내용은
              비밀유지계약(NDA) 보호 대상이 아니며 대중에게 공개됩니다. 특허 출원을
              준비 중인 핵심 기술 상세는 공개 전 변리사 등 전문가의 검토를 받으시길
              권장합니다.
            </li>
          </ul>
        </div>

        {/* Auth Check Banner */}
        {!authChecking && !user && (
          <div className="rounded-xl bg-[#0B2340] text-white p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm font-bold text-[#2998D6]">
                <Lock className="w-4 h-4" />
                <span>회원 인증 필요 (Member Authentication Required)</span>
              </div>
              <p className="text-xs text-[#D9E6F2]/85">
                건전한 커뮤니티 운영과 작성자 권리 확인을 위해 로그인 후 게시물을
                작성할 수 있습니다.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 shrink-0">
              <button
                type="button"
                onClick={handleQuickDemoLogin}
                className="px-4 py-2.5 rounded-lg bg-[#147FC5] hover:bg-[#2998D6] text-white text-xs font-semibold"
              >
                연구자 데모 계정으로 즉시 로그인
              </button>
              <Link
                href="/login"
                className="px-4 py-2.5 rounded-lg border border-[#D9E6F2]/30 text-white text-xs font-semibold"
              >
                로그인 / 회원가입 페이지
              </Link>
            </div>
          </div>
        )}

        {/* Submission Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-[#E5EAF0] p-6 sm:p-8 space-y-6"
          noValidate
        >
          {error && (
            <div
              role="alert"
              className="p-4 rounded-lg bg-red-50 border border-red-200 text-xs sm:text-sm text-red-800 font-medium"
            >
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="postType"
                className="block text-xs font-bold text-[#17212B] mb-2"
              >
                게시물 유형 <span className="text-red-600">*</span>
              </label>
              <select
                id="postType"
                value={postType}
                onChange={(e) =>
                  setPostType(e.target.value as "idea" | "discussion")
                }
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5EAF0] text-sm text-[#17212B] bg-white"
              >
                <option value="idea">IDEA BOARD (우주 아이디어 제안)</option>
                <option value="discussion">DISCUSSION (질문 및 토론 주제)</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-xs font-bold text-[#17212B] mb-2"
              >
                카테고리 분류 <span className="text-red-600">*</span>
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value as IdeaCategory)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5EAF0] text-sm text-[#17212B] bg-white"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="title"
              className="block text-xs font-bold text-[#17212B] mb-2"
            >
              제목 (5자 이상) <span className="text-red-600">*</span>
            </label>
            <input
              id="title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="예: 성층권 실험 탑재체의 극저온 배터리 보온을 위한 경량 케이스 구상"
              className="w-full px-4 py-2.5 rounded-lg border border-[#E5EAF0] text-sm text-[#17212B]"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-xs font-bold text-[#17212B] mb-2"
            >
              상세 내용 및 제안 배경 (20자 이상) <span className="text-red-600">*</span>
            </label>
            <textarea
              id="description"
              rows={7}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="해결하고자 하는 문제, 아이디어의 핵심 개념, 다른 참여자들과 함께 토론하고 싶은 질문을 작성해 주세요. (특허 출원 전인 비공개 핵심 수치나 도면은 제외하고 작성해 주세요)"
              className="w-full px-4 py-3 rounded-lg border border-[#E5EAF0] text-sm text-[#17212B] leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="displayMode"
                className="block text-xs font-bold text-[#17212B] mb-2"
              >
                작성자 공개 표기 방식 <span className="text-red-600">*</span>
              </label>
              <select
                id="displayMode"
                value={displayMode}
                onChange={(e) =>
                  setDisplayMode(e.target.value as "public" | "anonymous")
                }
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5EAF0] text-sm text-[#17212B] bg-white"
              >
                <option value="public">
                  계정 표시 이름 공개 ({user ? user.displayName : "회원 이름"})
                </option>
                <option value="anonymous">
                  익명 표시 (외부에는 ‘익명 참여자’로 표기, 내부 계정 보호)
                </option>
              </select>
            </div>

            <div>
              <label
                htmlFor="attachmentName"
                className="block text-xs font-bold text-[#17212B] mb-2"
              >
                참고 자료명 또는 첨부파일 설명 (선택)
              </label>
              <input
                id="attachmentName"
                type="text"
                value={attachmentName}
                onChange={(e) => setAttachmentName(e.target.value)}
                placeholder="예: concept_diagram_v1.pdf (선택 사항)"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5EAF0] text-sm text-[#17212B]"
              />
            </div>
          </div>

          {/* Separated Required & Optional Consents (PRD 6.8) */}
          <div className="pt-4 border-t border-[#E5EAF0] space-y-3">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreeRequiredTerms}
                onChange={(e) => setAgreeRequiredTerms(e.target.checked)}
                className="mt-1 w-4 h-4 accent-[#147FC5]"
              />
              <span className="text-xs sm:text-sm text-[#17212B] leading-relaxed">
                <strong>[필수]</strong> 본 게시물이 공개 게시판에 게시됨을 이해하며,{" "}
                <Link
                  href="/community-rules"
                  target="_blank"
                  className="text-[#147FC5] underline"
                >
                  커뮤니티 및 지식재산권(IP) 운영원칙
                </Link>{" "}
                및{" "}
                <Link
                  href="/privacy"
                  target="_blank"
                  className="text-[#147FC5] underline"
                >
                  개인정보 수집·이용 안내
                </Link>
                에 동의합니다. (약관 버전: v1.0)
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={followUpConsent}
                onChange={(e) => setFollowUpConsent(e.target.checked)}
                className="mt-1 w-4 h-4 accent-[#147FC5]"
              />
              <span className="text-xs sm:text-sm text-[#5D6B78] leading-relaxed">
                <strong>[선택]</strong> 향후 해당 아이디어와 관련하여 후속 연구 검토나
                인터뷰, 협업 논의가 필요한 경우 가입된 이메일로 연락받는 것에 동의합니다.
              </span>
            </label>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-end gap-3">
            <Link
              href="/space-ideas"
              className="px-5 py-3 rounded-lg border border-[#E5EAF0] text-sm font-semibold text-[#5D6B78] hover:text-[#17212B]"
            >
              취소
            </Link>
            <button
              type="submit"
              disabled={submitting || !user}
              className="px-6 py-3 rounded-lg bg-[#147FC5] hover:bg-[#2998D6] disabled:bg-slate-300 text-white text-sm font-semibold transition-colors min-h-[46px]"
            >
              {submitting ? "등록 처리 중..." : "아이디어 게시하기"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
