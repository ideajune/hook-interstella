"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2, MapPin, ShieldAlert } from "lucide-react";

const INQUIRY_TYPES = [
  "일반 문의 (General Inquiry)",
  "출판 · 콘텐츠 · 미디어 문의",
  "교육 프로그램 · 커뮤니티 문의",
  "비공개 사업/아이디어 사전 문의 (Private Proposal Route)",
  "웹사이트 및 개인정보 관련 문의",
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
      setError("문의 제목(3자 이상)과 문의 내용(10자 이상)을 입력해 주세요.");
      return;
    }
    if (!privacyConsent) {
      setError("개인정보 수집 및 이용 동의에 체크해 주세요.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          channel: inquiryType.includes("Private")
            ? "private_proposal"
            : "contact",
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
      {/* Hero */}
      <section className="bg-[#07182D] text-white py-20 lg:py-24 border-b border-[#123454]">
        <div className="container-shell max-w-4xl space-y-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#2998D6]">
            CONTACT HOOK INTERSTELLAR
          </p>
          <h1 className="text-3xl sm:text-5xl font-bold leading-tight">
            일반 문의 및 비공개 제안 접수
          </h1>
          <p className="text-base sm:text-lg text-[#D9E6F2]/85 leading-relaxed">
            HOOK INTERSTELLAR에 대한 일반 문의, 출판·콘텐츠 관련 질문, 또는 공개
            게시판(SPACE IDEAS)에 게시하기 어려운 사전 문의 사항을 남겨주세요.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="container-shell grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Verified Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl bg-[#F8FAFC] border border-[#E5EAF0] p-7 space-y-5">
              <div className="flex items-center gap-2 text-sm font-bold text-[#147FC5]">
                <MapPin className="w-5 h-5" />
                <span>검증된 소재지 정보</span>
              </div>
              <dl className="space-y-3 text-sm border-t border-[#E5EAF0] pt-4">
                <div>
                  <dt className="text-xs text-[#5D6B78]">운영 법인 / 브랜드</dt>
                  <dd className="font-semibold text-[#17212B] mt-0.5">
                    후크인터스텔라(주) (HOOK INTERSTELLAR)
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-[#5D6B78]">주소</dt>
                  <dd className="font-semibold text-[#17212B] mt-0.5">
                    서울특별시 강남구 삼성로103길 6
                  </dd>
                </div>
              </dl>
            </div>

            <div className="rounded-2xl bg-amber-50/70 border border-amber-200 p-6 space-y-2.5 text-xs sm:text-sm text-amber-950">
              <div className="flex items-center gap-2 font-bold">
                <ShieldAlert className="w-4 h-4 text-amber-700" />
                <span>비공개 제안 시 유의사항 (Non-NDA Notice)</span>
              </div>
              <p className="leading-relaxed text-amber-900/90">
                본 문의 양식을 통한 접수는 대중에게 공개되지 않고 내부 담당자에게만
                전달되지만, 별도의 서면 비밀유지계약(NDA)이 체결되기 전까지는 법적
                비밀유지 의무가 자동 발생하지 않습니다. 특허 출원 전 핵심 기밀은 제외하고
                개요 중심으로 문의해 주시기 바랍니다.
              </p>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7">
            {submitted ? (
              <div className="rounded-2xl bg-[#F8FAFC] border border-[#E5EAF0] p-10 text-center space-y-5">
                <div className="w-14 h-14 rounded-full bg-[#E8F4FC] text-[#147FC5] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-[#17212B]">
                  문의가 정상적으로 접수되었습니다
                </h2>
                <p className="text-sm text-[#5D6B78] leading-relaxed">
                  담당자가 내용을 확인한 후 입력하신 이메일(<strong>{email}</strong>)로
                  답변을 보내드립니다.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setSubject("");
                    setMessage("");
                  }}
                  className="px-5 py-2.5 rounded-lg bg-[#147FC5] text-white text-xs font-semibold"
                >
                  새 문의 작성하기
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-[#E5EAF0] p-7 sm:p-9 space-y-5 bg-white"
                noValidate
              >
                <h2 className="text-2xl font-bold text-[#17212B]">
                  문의 등록 양식
                </h2>

                {error && (
                  <div
                    role="alert"
                    className="p-4 rounded-lg bg-red-50 border border-red-200 text-xs sm:text-sm text-red-800 font-medium"
                  >
                    {error}
                  </div>
                )}

                {/* Honeypot */}
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
                  <label
                    htmlFor="contactInquiryType"
                    className="block text-xs font-bold text-[#17212B] mb-2"
                  >
                    문의 유형 분류 <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="contactInquiryType"
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
                    <label
                      htmlFor="contactName"
                      className="block text-xs font-bold text-[#17212B] mb-2"
                    >
                      성함 <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="contactName"
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="성함을 입력해 주세요"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5EAF0] text-sm"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contactOrg"
                      className="block text-xs font-bold text-[#17212B] mb-2"
                    >
                      소속 (선택)
                    </label>
                    <input
                      id="contactOrg"
                      type="text"
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      placeholder="기업/학교/단체명 (선택)"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5EAF0] text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="contactEmail"
                      className="block text-xs font-bold text-[#17212B] mb-2"
                    >
                      이메일 주소 <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="contactEmail"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5EAF0] text-sm"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contactPhone"
                      className="block text-xs font-bold text-[#17212B] mb-2"
                    >
                      연락처 (선택)
                    </label>
                    <input
                      id="contactPhone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="010-0000-0000"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5EAF0] text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contactSubject"
                    className="block text-xs font-bold text-[#17212B] mb-2"
                  >
                    문의 제목 <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="contactSubject"
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="문의 제목을 입력해 주세요"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5EAF0] text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contactMessage"
                    className="block text-xs font-bold text-[#17212B] mb-2"
                  >
                    문의 내용 <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    id="contactMessage"
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="문의하실 내용을 구체적으로 작성해 주세요."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5EAF0] text-sm leading-relaxed"
                  />
                </div>

                <div className="pt-2 border-t border-[#E5EAF0]">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={privacyConsent}
                      onChange={(e) => setPrivacyConsent(e.target.checked)}
                      className="mt-1 w-4 h-4 accent-[#147FC5]"
                    />
                    <span className="text-xs sm:text-sm text-[#17212B] leading-relaxed">
                      <strong>[필수]</strong> 문의 응대 및 회신을 위한{" "}
                      <Link
                        href="/privacy"
                        target="_blank"
                        className="text-[#147FC5] underline"
                      >
                        개인정보 수집 및 이용
                      </Link>
                      에 동의합니다.
                    </span>
                  </label>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-7 py-3.5 rounded-lg bg-[#147FC5] hover:bg-[#2998D6] disabled:bg-slate-300 text-white text-sm font-semibold min-h-[48px]"
                  >
                    {submitting ? "전송 중..." : "문의 등록하기"}
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
