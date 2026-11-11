"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Idea, IdeaCategory } from "@/lib/types";
import {
  AlertTriangle,
  ArrowLeft,
  Award,
  CheckCircle2,
  Fingerprint,
  GitBranch,
  Lock,
  ShieldCheck,
  X,
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

function SubmitIdeaForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const parentIdParam = searchParams.get("parentId");

  const [user, setUser] = useState<{
    id: string;
    displayName: string;
    email: string;
    role: string;
  } | null>(null);
  const [authChecking, setAuthChecking] = useState(true);

  const [parentIdea, setParentIdea] = useState<Idea | null>(null);
  const [postType, setPostType] = useState<"idea" | "discussion">("idea");
  const [category, setCategory] = useState<IdeaCategory>("우주 기술");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [attachmentName, setAttachmentName] = useState("");
  const [displayMode, setDisplayMode] = useState<"public" | "anonymous">(
    "public"
  );
  const [agreeRequiredTerms, setAgreeRequiredTerms] = useState(false);
  const [followUpConsent, setFollowUpConsent] = useState(false);

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submittedIdea, setSubmittedIdea] = useState<Idea | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        setUser(data.user ?? null);
        setAuthChecking(false);
      })
      .catch(() => setAuthChecking(false));
  }, []);

  useEffect(() => {
    if (!parentIdParam) {
      setParentIdea(null);
      return;
    }
    fetch(`/api/space-ideas/${parentIdParam}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.idea && data.idea.postType === "idea") {
          setParentIdea(data.idea);
          setPostType("idea");
          setCategory(data.idea.category);
        }
      })
      .catch(() => setParentIdea(null));
  }, [parentIdParam]);

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
      setError("아이디어 박제 및 등록을 위해 먼저 로그인해 주세요.");
      return;
    }
    if (title.trim().length < 5) {
      setError("제목을 5자 이상 입력해 주세요.");
      return;
    }
    if (description.trim().length < 20) {
      setError(
        "아이디어 또는 질문 내용을 20자 이상 구체적으로 작성해 주세요."
      );
      return;
    }
    if (!agreeRequiredTerms) {
      setError(
        "안티-특허(선행기술 박제) 원칙, 지식재산권(IP) 고지 및 개인정보 수집·이용에 동의해 주세요."
      );
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/space-ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          postType: parentIdea ? "idea" : postType,
          parentIdeaId: parentIdea ? parentIdea.id : undefined,
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
        setError(data.error || "박제 처리 중 오류가 발생했습니다.");
      } else {
        setSubmittedIdea(data.idea);
      }
    } catch {
      setError("서버와 통신 중 오류가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submittedIdea) {
    const isStampedIdea = submittedIdea.postType === "idea";
    return (
      <div className="py-20 bg-[#F8FAFC] min-h-[70vh]">
        <div className="container-shell max-w-2xl">
          <div className="bg-white rounded-2xl border border-[#E5EAF0] p-8 sm:p-10 space-y-6 text-center">
            <div className="w-14 h-14 rounded-full bg-[#E8F4FC] text-[#147FC5] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-[#17212B]">
                {isStampedIdea
                  ? "아이디어 선행기술 박제가 완료되었습니다"
                  : "오픈 토론 주제가 등록되었습니다"}
              </h1>
              <p className="text-sm sm:text-base text-[#5D6B78] leading-relaxed">
                현재 상태:{" "}
                <strong className="text-[#147FC5]">
                  {submittedIdea.moderationStatus === "published"
                    ? "공개 박제 완료 (Published Prior Art)"
                    : "검토 대기 중 (Pending Review)"}
                </strong>
              </p>
            </div>

            {isStampedIdea && submittedIdea.stampId && (
              <div className="rounded-xl bg-[#07182D] text-white p-5 text-left space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#5CC3FF] inline-flex items-center gap-1.5">
                    <Fingerprint className="w-4 h-4" />
                    발급된 박제 번호
                  </span>
                  <span className="font-mono font-bold text-sm text-[#5CC3FF]">
                    {submittedIdea.stampId}
                  </span>
                </div>
                {submittedIdea.stampHash && (
                  <div className="pt-2 border-t border-[#123454]">
                    <p className="text-[11px] text-[#D9E6F2]/75">
                      SHA-256 디지털 인감
                    </p>
                    <p className="font-mono text-xs text-[#D9E6F2] break-all mt-0.5">
                      {submittedIdea.stampHash}
                    </p>
                  </div>
                )}
              </div>
            )}

            <div className="pt-3 flex flex-wrap justify-center gap-3">
              {isStampedIdea && (
                <Link
                  href={`/space-ideas/${submittedIdea.id}?cert=1`}
                  className="px-6 py-3 rounded-lg bg-[#07182D] hover:bg-[#0B2340] text-white text-sm font-semibold inline-flex items-center gap-2"
                >
                  <Award className="w-4 h-4 text-[#5CC3FF]" />
                  <span>원작자 명예 증명서 발급·출력</span>
                </Link>
              )}
              <Link
                href={`/space-ideas/${submittedIdea.id}`}
                className="px-6 py-3 rounded-lg bg-[#147FC5] hover:bg-[#2998D6] text-white text-sm font-semibold"
              >
                박제 게시물 확인하기
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
            {parentIdea
              ? "훅체인(Hook Chain) 파생 아이디어 연결 박제"
              : "우주 아이디어 선행기술 박제 및 토론 등록"}
          </h1>
          <p className="text-sm text-[#5D6B78] mt-1">
            아이디어를 먼저 세상에 박제(Stamping)하여 선행기술 지위를 확보하고,
            원작자의 명예와 창작 족보를 기록하세요.
          </p>
        </div>

        {/* Parent Hook Chain Banner */}
        {parentIdea && (
          <div className="rounded-xl bg-indigo-950 text-white p-5 space-y-2 border border-indigo-700">
            <div className="flex items-center justify-between gap-2">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-indigo-300">
                <GitBranch className="w-4 h-4" />
                <span>
                  HOOK CHAIN 연결 모드 · {(parentIdea.chainDepth ?? 1) + 1}차 파생
                  훅으로 기록됩니다
                </span>
              </div>
              <Link
                href="/space-ideas/submit"
                className="text-xs text-indigo-300 hover:text-white inline-flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" />
                <span>연결 해제 (새 제네시스 훅 작성)</span>
              </Link>
            </div>
            <p className="text-sm font-bold text-white">
              상위 아이디어:{" "}
              <span className="text-[#5CC3FF] font-mono">
                [{parentIdea.stampId || parentIdea.id}]
              </span>{" "}
              {parentIdea.title}
            </p>
          </div>
        )}

        {/* Hooksum Defensive Publication & IP Notice Box */}
        <div className="rounded-xl bg-white border border-[#147FC5]/30 p-6 space-y-3">
          <div className="flex items-center gap-2 text-sm font-bold text-[#0B2340]">
            <ShieldCheck className="w-5 h-5 text-[#147FC5]" />
            <span>훅섬(Hooksum) 방어적 공개 및 지식재산권(IP) 안내</span>
          </div>
          <ul className="space-y-1.5 text-xs sm:text-sm text-[#5D6B78] list-disc pl-5 leading-relaxed">
            <li>
              <strong>선행기술 박제(Prior Art) 효력:</strong> 본 플랫폼에 공개 등록된
              아이디어는 타임스탬프와 SHA-256 해시가 기록되어 선행기술이 되며, 제3자가
              동일 기술로 부당하게 독점 특허를 등록하는 것을 방어합니다.
            </li>
            <li>
              <strong>원작자 권리 유지 및 별도 계약:</strong> 등록된 아이디어의 권리와
              원작자 명예는 작성자에게 유지되며, 후크인터스텔라가 공동개발·사업화를
              추진할 경우 별도 서면 계약을 체결합니다.
            </li>
            <li className="text-amber-900 font-medium">
              <AlertTriangle className="w-4 h-4 inline mr-1 text-amber-600" />
              <strong>독점 특허 출원 예정 기술 유의:</strong> 공개 박제는 &lsquo;독점
              방지(공유)&rsquo; 전략입니다. 작성자 본인이 직접 독점 특허를 출원하려는
              핵심 기밀은 이곳에 공개하지 마시고{" "}
              <Link href="/contact" className="underline font-bold">
                비공개 협력 문의
              </Link>
              를 이용해 주세요.
            </li>
          </ul>
        </div>

        {/* Auth Check Banner */}
        {!authChecking && !user && (
          <div className="rounded-xl bg-[#0B2340] text-white p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm font-bold text-[#2998D6]">
                <Lock className="w-4 h-4" />
                <span>회원 인증 필요 (원작자 명예 증명 확인)</span>
              </div>
              <p className="text-xs text-[#D9E6F2]/85">
                박제 고유 번호 및 원작자 명예 증명서 발급을 위해 로그인 후 작성할 수
                있습니다.
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
                로그인 / 회원가입
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
                등록 유형 <span className="text-red-600">*</span>
              </label>
              <select
                id="postType"
                value={parentIdea ? "idea" : postType}
                disabled={Boolean(parentIdea)}
                onChange={(e) =>
                  setPostType(e.target.value as "idea" | "discussion")
                }
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5EAF0] text-sm text-[#17212B] bg-white disabled:bg-slate-100"
              >
                <option value="idea">
                  박제 아이디어 (타임스탬프 · 명예증명서 발급)
                </option>
                <option value="discussion">오픈 토론 (질문 및 자유 의견)</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-xs font-bold text-[#17212B] mb-2"
              >
                기술·주제 분야 <span className="text-red-600">*</span>
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
              placeholder={
                parentIdea
                  ? "상위 아이디어를 어떻게 개선·발전시켰는지 명확히 드러나는 제목을 입력하세요"
                  : "예: 성층권 실험 탑재체의 극저온 배터리 보온을 위한 경량 케이스 구상"
              }
              className="w-full px-4 py-2.5 rounded-lg border border-[#E5EAF0] text-sm text-[#17212B]"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-xs font-bold text-[#17212B] mb-2"
            >
              상세 내용 및 핵심 구성 (20자 이상){" "}
              <span className="text-red-600">*</span>
            </label>
            <textarea
              id="description"
              rows={7}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="해결하고자 하는 문제, 작동 원리, 기존 방식과의 차별점을 구체적으로 기술할수록 선행기술(Prior Art)로서의 방어력이 강력해집니다."
              className="w-full px-4 py-3 rounded-lg border border-[#E5EAF0] text-sm text-[#17212B] leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="displayMode"
                className="block text-xs font-bold text-[#17212B] mb-2"
              >
                원작자 표기 방식 <span className="text-red-600">*</span>
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
                  실명/닉네임 공개 ({user ? user.displayName : "회원 이름"} — 명예 증명서 표기)
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
                참고 도면·문서명 표기 (선택)
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

          {/* Consents */}
          <div className="pt-4 border-t border-[#E5EAF0] space-y-3">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreeRequiredTerms}
                onChange={(e) => setAgreeRequiredTerms(e.target.checked)}
                className="mt-1 w-4 h-4 accent-[#147FC5]"
              />
              <span className="text-xs sm:text-sm text-[#17212B] leading-relaxed">
                <strong>[필수]</strong> 본 게시물이 공개 박제되어 선행기술(Prior
                Art)로 공지됨을 이해하며,{" "}
                <Link
                  href="/community-rules"
                  target="_blank"
                  className="text-[#147FC5] underline"
                >
                  안티-특허 및 지식재산권(IP) 운영원칙
                </Link>{" "}
                및{" "}
                <Link
                  href="/privacy"
                  target="_blank"
                  className="text-[#147FC5] underline"
                >
                  개인정보 수집·이용 안내
                </Link>
                에 동의합니다. (약관 버전: v1.1)
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
                <strong>[선택]</strong> 향후 해당 아이디어 또는 훅체인 계보와
                관련하여 공동 R&amp;D 검토나 협업 제안이 있을 경우 가입 이메일로
                연락받는 것에 동의합니다.
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
              {submitting
                ? "타임스탬프 박제 중..."
                : parentIdea
                ? "훅체인 연결 및 박제하기"
                : postType === "idea"
                ? "아이디어 박제하기"
                : "토론 주제 등록하기"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function SubmitIdeaPage() {
  return (
    <Suspense
      fallback={
        <div className="container-shell py-20 max-w-3xl">
          <div className="h-64 rounded-2xl bg-slate-100 animate-pulse" />
        </div>
      }
    >
      <SubmitIdeaForm />
    </Suspense>
  );
}
