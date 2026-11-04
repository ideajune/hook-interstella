"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, UserPlus } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">("login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [organization, setOrganization] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/register";
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          password,
          displayName: displayName.trim(),
          organization: organization.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "인증 처리에 실패했습니다.");
      } else {
        if (data.user?.role === "admin") {
          router.push("/admin");
        } else {
          router.push("/space-ideas");
        }
        router.refresh();
      }
    } catch {
      setError("네트워크 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-16 lg:py-24 bg-[#F8FAFC] min-h-[75vh] flex items-center">
      <div className="container-shell max-w-md">
        <div className="bg-white rounded-2xl border border-[#E5EAF0] p-7 sm:p-10 space-y-6 shadow-xs">
          {/* Tabs */}
          <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-[#F8FAFC] border border-[#E5EAF0]">
            <button
              type="button"
              onClick={() => {
                setMode("login");
                setError("");
              }}
              className={`py-2.5 rounded-lg text-sm font-bold transition-colors ${
                mode === "login"
                  ? "bg-[#147FC5] text-white"
                  : "text-[#5D6B78] hover:text-[#17212B]"
              }`}
            >
              로그인
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("register");
                setError("");
              }}
              className={`py-2.5 rounded-lg text-sm font-bold transition-colors ${
                mode === "register"
                  ? "bg-[#147FC5] text-white"
                  : "text-[#5D6B78] hover:text-[#17212B]"
              }`}
            >
              회원가입
            </button>
          </div>

          <p className="text-xs sm:text-sm text-[#5D6B78] leading-relaxed">
            {mode === "login"
              ? "우주 아이디어 등록 및 커뮤니티 소통을 위해 로그인해 주세요."
              : "간단한 정보 입력만으로 누구나 우주 아이디어 광장에 참여하실 수 있습니다."}
          </p>

          {error && (
            <div
              role="alert"
              className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 font-semibold"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
              <>
                <div>
                  <label
                    htmlFor="displayName"
                    className="block text-xs font-bold text-[#17212B] mb-1.5"
                  >
                    이름 또는 닉네임 <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="displayName"
                    type="text"
                    required
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="예: 우주탐구자 / 홍길동"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5EAF0] text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="organization"
                    className="block text-xs font-bold text-[#17212B] mb-1.5"
                  >
                    소속 또는 관심 분야 (선택)
                  </label>
                  <input
                    id="organization"
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="예: 대학생 / 엔지니어 / 우주 과학 관심"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5EAF0] text-sm"
                  />
                </div>
              </>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-xs font-bold text-[#17212B] mb-1.5"
              >
                이메일 <span className="text-red-600">*</span>
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5EAF0] text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-bold text-[#17212B] mb-1.5"
              >
                비밀번호 <span className="text-red-600">*</span>
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호 입력"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5EAF0] text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-[#147FC5] hover:bg-[#2998D6] text-white text-sm font-semibold inline-flex items-center justify-center gap-2 min-h-[46px] transition-colors"
            >
              {mode === "login" ? (
                <>
                  <Lock className="w-4 h-4" />
                  <span>로그인</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  <span>회원가입 완료</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
