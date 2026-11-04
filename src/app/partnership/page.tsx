"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Cpu,
  FlaskConical,
  Globe2,
  GraduationCap,
  PackageCheck,
} from "lucide-react";

const COOPERATION_TYPES = [
  {
    id: "기술 협력 (Technology Exchange)",
    icon: <Cpu className="w-5 h-5 text-[#147FC5]" />,
    title: "기술 협력",
    desc: "고고도 성층권 플랫폼, 센서·통신 탑재체, 항법·추진 및 극한환경 기술 교류.",
  },
  {
    id: "공동 연구개발 (Joint R&D)",
    icon: <FlaskConical className="w-5 h-5 text-[#147FC5]" />,
    title: "공동 연구개발",
    desc: "대학·연구소·기업 컨소시엄 기반의 우주 생존, 폐쇄형 생태계, 소재·식품 R&D 과제 기획.",
  },
  {
    id: "교육 및 콘텐츠 협력 (Education & Content)",
    icon: <GraduationCap className="w-5 h-5 text-[#147FC5]" />,
    title: "교육 및 콘텐츠 협력",
    desc: "과학·생존 체험 커리큘럼, 출판 프로젝트, 과학 전시 및 포럼 공동 운영.",
  },
  {
    id: "제품 및 공급 협력 (Product & Supply)",
    icon: <PackageCheck className="w-5 h-5 text-[#147FC5]" />,
    title: "제품 및 공급 협력",
    desc: "휴대용 생존장비, 재난 대응 키트, 특수보호복 및 비상식량 시제품 제조·유통 협력.",
  },
  {
    id: "글로벌 사업 협력 (Global Business)",
    icon: <Globe2 className="w-5 h-5 text-[#147FC5]" />,
    title: "글로벌 사업 협력",
    desc: "해외 연구 장비·부품 수출입, 글로벌 스타트업 네트워크 및 지식재산(IP) 라이선싱.",
  },
];

export default function PartnershipPage() {
  const [inquiryType, setInquiryType] = useState(COOPERATION_TYPES[0].id);
  const [organization, setOrganization] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [websiteHoneypot, setWebsiteHoneypot] = useState(""); // Anti-spam honeypot

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!organization.trim() || !contactName.trim() || !email.trim()) {
      setError("소속 기관/기업명, 담당자 성함, 이메일을 모두 입력해 주세요.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("유효한 이메일 주소를 입력해 주세요.");
      return;
    }
    if (subject.trim().length < 4 || message.trim().length < 15) {
      setError("제안 제목(4자 이상)과 상세 협력 내용(15자 이상)을 작성해 주세요.");
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
          channel: "partnership",
          inquiryType,
          organization: organization.trim(),
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
        setError(data.error || "제안 등록 중 오류가 발생했습니다.");
      } else {
        setSubmitted(true);
      }
    } catch {
      setError("네트워크 오류가 발생했습니다.");
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
            PARTNERSHIP & STRATEGIC ALLIANCE
          </p>
          <h1 className="text-3xl sm:text-5xl font-bold leading-tight">
            함께 항해할 기술·연구·비즈니스 파트너를 찾습니다
          </h1>
          <p className="text-base sm:text-lg text-[#D9E6F2]/85 leading-relaxed">
            HOOK INTERSTELLAR는 모든 것을 독점하기보다 각 분야의 전문 기업, 대학
            연구실, 교육기관과 상호 보완적인 협력 생태계를 구축합니다.
          </p>
        </div>
      </section>

      {/* 5 Cooperation Categories */}
      <section className="py-16 bg-[#F8FAFC] border-b border-[#E5EAF0]">
        <div className="container-shell space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#17212B]">
              5대 협력 제안 분야
            </h2>
            <p className="text-sm text-[#5D6B78]">
              카드를 클릭하면 아래 협력 제안 양식의 협력 유형으로 자동 선택됩니다.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {COOPERATION_TYPES.map((item) => {
              const isSelected = inquiryType === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setInquiryType(item.id)}
                  className={`text-left rounded-xl p-5 border transition-all flex flex-col justify-between space-y-3 ${
                    isSelected
                      ? "bg-[#E8F4FC] border-[#147FC5] ring-2 ring-[#147FC5]/30"
                      : "bg-white border-[#E5EAF0] hover:border-[#147FC5]"
                  }`}
                >
                  <div className="space-y-2.5">
                    <div className="w-10 h-10 rounded-lg bg-[#F8FAFC] flex items-center justify-center">
                      {item.icon}
                    </div>
                    <h3 className="text-base font-bold text-[#17212B]">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#5D6B78] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <span className="text-[11px] font-semibold text-[#147FC5]">
                    {isSelected ? "선택됨 ✓" : "유형 선택하기 →"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partnership Form */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-shell max-w-3xl">
          {submitted ? (
            <div className="rounded-2xl bg-[#F8FAFC] border border-[#E5EAF0] p-10 text-center space-y-5">
              <div className="w-14 h-14 rounded-full bg-[#E8F4FC] text-[#147FC5] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-[#17212B]">
                파트너십 제안이 정상적으로 접수되었습니다
              </h2>
              <p className="text-sm text-[#5D6B78] leading-relaxed max-w-lg mx-auto">
                제출해 주신 협력 제안서는 담당 부서에서 검토한 후 입력하신 이메일(
                <strong>{email}</strong>)로 회신드립니다.
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
                추가 제안 등록하기
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-[#E5EAF0] p-7 sm:p-10 space-y-6 bg-white"
              noValidate
            >
              <div className="space-y-1 border-b border-[#E5EAF0] pb-4">
                <h2 className="text-2xl font-bold text-[#17212B]">
                  파트너십 및 기술 협력 제안서 등록
                </h2>
                <p className="text-xs sm:text-sm text-[#5D6B78]">
                  제안 목적과 협력 희망 범위, 보유 기술/역량을 간략히 기재해 주시면
                  빠른 검토에 도움이 됩니다. (공식 NDA 체결 전이므로 영업비밀에 해당하는
                  민감 자료는 제외하고 작성해 주세요.)
                </p>
              </div>

              {error && (
                <div
                  role="alert"
                  className="p-4 rounded-lg bg-red-50 border border-red-200 text-xs sm:text-sm text-red-800 font-medium"
                >
                  {error}
                </div>
              )}

              {/* Honeypot field */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="websiteHoneypot">Website</label>
                <input
                  id="websiteHoneypot"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={websiteHoneypot}
                  onChange={(e) => setWebsiteHoneypot(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="inquiryType"
                    className="block text-xs font-bold text-[#17212B] mb-2"
                  >
                    협력 분야 선택 <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="inquiryType"
                    value={inquiryType}
                    onChange={(e) => setInquiryType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5EAF0] text-sm bg-white"
                  >
                    {COOPERATION_TYPES.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.id}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="organization"
                    className="block text-xs font-bold text-[#17212B] mb-2"
                  >
                    기업 / 기관 / 연구실명 <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="organization"
                    type="text"
                    required
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="예: (주)스페이스소재랩 / OO대학교 연구실"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5EAF0] text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label
                    htmlFor="contactName"
                    className="block text-xs font-bold text-[#17212B] mb-2"
                  >
                    담당자 성함 / 직함 <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="contactName"
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="홍길동 선임연구원"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5EAF0] text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs font-bold text-[#17212B] mb-2"
                  >
                    회신 이메일 <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="partner@company.com"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5EAF0] text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-xs font-bold text-[#17212B] mb-2"
                  >
                    연락처 (선택)
                  </label>
                  <input
                    id="phone"
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
                  htmlFor="subject"
                  className="block text-xs font-bold text-[#17212B] mb-2"
                >
                  협력 제안 제목 <span className="text-red-600">*</span>
                </label>
                <input
                  id="subject"
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="예: 고고도 환경용 경량 단열 패키징 공동 테스트 제안"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5EAF0] text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-xs font-bold text-[#17212B] mb-2"
                >
                  제안 상세 내용 <span className="text-red-600">*</span>
                </label>
                <textarea
                  id="message"
                  rows={6}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="1) 귀 기관/기업 소개 2) 협력 희망 주제 3) 기대 시너지 및 논의 희망 일정을 작성해 주세요."
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
                    <strong>[필수]</strong> 파트너십 제안 검토 및 회신을 위한{" "}
                    <Link
                      href="/privacy"
                      target="_blank"
                      className="text-[#147FC5] underline"
                    >
                      개인정보 수집 및 이용
                    </Link>
                    (담당자명, 소속, 이메일, 연락처)에 동의합니다.
                  </span>
                </label>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-7 py-3.5 rounded-lg bg-[#147FC5] hover:bg-[#2998D6] disabled:bg-slate-300 text-white text-sm font-semibold min-h-[48px]"
                >
                  {submitting ? "제안서 전송 중..." : "협력 제안서 제출하기"}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
