"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2, MapPin, Mail, Phone } from "lucide-react";

const INQUIRY_TYPES = [
  "기술 · 공동연구 파트너십 제안 (Partnership)",
  "기업 · 장비 · IP 사업 제휴 제안 (Partnership)",
  "일반 문의 · 출판 · 교육 문의 (General Contact)",
  "비공개 아이디어 사전 문의 (Private Proposal)",
];

export default function ContactPage() {
  const [inquiryType, setInquiryType] = useState(INQUIRY_TYPES[0]);
  const [organization, setOrganization] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [websiteHoneypot, setWebsiteHoneypot] = useState("");

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!contactName.trim() || !email.trim()) {
      setError("성함과 이메일 주소를 입력해 주세요.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("유효한 이메일 주소를 입력해 주세요.");
      return;
    }
    if (subject.trim().length < 3 || message.trim().length < 10) {
      setError("제목(3자 이상)과 내용(10자 이상)을 입력해 주세요.");
      return;
    }
    if (!privacyConsent) {
      setError("개인정보 수집 및 이용 동의에 체크해 주세요.");
      return;
    }

    const channel = inquiryType.includes("Partnership")
      ? "partnership"
      : inquiryType.includes("Private")
      ? "private_proposal"
      : "contact";

    setSubmitting(true);
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          channel,
          inquiryType,
          organization: organization.trim() || undefined,
          contactName: contactName.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
          subject: subject.trim(),
          message: message.trim(),
          privacyConsent,
          websiteHoneypot,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "문의 접수 중 오류가 발생했습니다.");
      } else {
        setSubmitted(true);
      }
    } catch {
      setError("서버와 통신 중 오류가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      {/* Compact Hero */}
      <section className="bg-[#07182D] text-white py-14 lg:py-18 border-b border-[#123454]">
        <div className="container-shell max-w-4xl space-y-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#2998D6]">
            CONTACT & PARTNERSHIP
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
            문의 및 파트너십 제안
          </h1>
          <p className="text-sm sm:text-base text-[#D9E6F2]/85">
            기술·연구 협력 제안, 기업 파트너십, 일반 문의를 한곳에서 접수합니다.
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-white">
        <div className="container-shell grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Contact Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="rounded-xl bg-[#F8FAFC] border border-[#E5EAF0] p-6 space-y-4 text-sm">
              <h2 className="font-bold text-[#17212B]">후크인터스텔라(주)</h2>
              <div className="space-y-2.5 text-xs sm:text-sm text-[#5D6B78]">
                <p className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#147FC5] shrink-0 mt-0.5" />
                  <span>서울특별시 강남구 삼성로103길 6</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#147FC5] shrink-0" />
                  <span>010-7710-3801</span>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#147FC5] shrink-0" />
                  <span>ideajune@naver.com</span>
                </p>
              </div>
              <p className="text-xs text-[#5D6B78] pt-3 border-t border-[#E5EAF0]">
                특허 출원 전 핵심 기밀은 제외하고 개요 위주로 문의해 주시기 바랍니다.
              </p>
            </div>
          </div>

          {/* Right: Unified Form */}
          <div className="lg:col-span-8">
            {submitted ? (
              <div className="rounded-xl bg-[#F8FAFC] border border-[#E5EAF0] p-8 text-center space-y-4">
                <CheckCircle2 className="w-10 h-10 text-[#147FC5] mx-auto" />
                <h2 className="text-xl font-bold text-[#17212B]">
                  접수가 완료되었습니다
                </h2>
                <p className="text-sm text-[#5D6B78]">
                  확인 후 입력하신 이메일(<strong>{email}</strong>)로 회신드리겠습니다.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setSubject("");
                    setMessage("");
                  }}
                  className="px-4 py-2 rounded-lg bg-[#147FC5] text-white text-xs font-semibold"
                >
                  새 문의 작성
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-xl border border-[#E5EAF0] p-6 sm:p-8 space-y-4 bg-white"
                noValidate
              >
                {error && (
                  <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-800 font-medium">
                    {error}
                  </div>
                )}

                <div className="hidden" aria-hidden="true">
                  <input
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={websiteHoneypot}
                    onChange={(e) => setWebsiteHoneypot(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#17212B] mb-1.5">
                    문의 / 제안 유형 *
                  </label>
                  <select
                    value={inquiryType}
                    onChange={(e) => setInquiryType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5EAF0] text-sm bg-white"
                  >
                    {INQUIRY_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#17212B] mb-1.5">
                      성함 *
                    </label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="성함 입력"
                      className="w-full px-3.5 py-2 rounded-lg border border-[#E5EAF0] text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#17212B] mb-1.5">
                      소속 (선택)
                    </label>
                    <input
                      type="text"
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      placeholder="기업/기관/학교명"
                      className="w-full px-3.5 py-2 rounded-lg border border-[#E5EAF0] text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#17212B] mb-1.5">
                      이메일 *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full px-3.5 py-2 rounded-lg border border-[#E5EAF0] text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#17212B] mb-1.5">
                      연락처 (선택)
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="010-0000-0000"
                      className="w-full px-3.5 py-2 rounded-lg border border-[#E5EAF0] text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#17212B] mb-1.5">
                    제목 *
                  </label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="문의 제목"
                    className="w-full px-3.5 py-2 rounded-lg border border-[#E5EAF0] text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#17212B] mb-1.5">
                    내용 *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="문의 또는 협력 제안 내용을 입력해 주세요."
                    className="w-full px-3.5 py-2 rounded-lg border border-[#E5EAF0] text-sm"
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-[#E5EAF0]">
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-[#17212B]">
                    <input
                      type="checkbox"
                      checked={privacyConsent}
                      onChange={(e) => setPrivacyConsent(e.target.checked)}
                      className="w-4 h-4 accent-[#147FC5]"
                    />
                    <span>
                      [필수]{" "}
                      <Link href="/privacy" className="text-[#147FC5] underline">
                        개인정보 수집 및 이용
                      </Link>
                      에 동의합니다.
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-2.5 rounded-lg bg-[#147FC5] hover:bg-[#2998D6] disabled:bg-slate-300 text-white text-sm font-semibold"
                  >
                    {submitting ? "전송 중..." : "접수하기"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
