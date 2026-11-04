import { NextRequest, NextResponse } from "next/server";
import { updateDb } from "@/lib/db";
import { Inquiry } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Anti-spam Honeypot check (FR-102)
    if (body.websiteHoneypot && String(body.websiteHoneypot).trim().length > 0) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const channel =
      body.channel === "partnership"
        ? "partnership"
        : body.channel === "private_proposal"
        ? "private_proposal"
        : "contact";
    const inquiryType = String(body.inquiryType || "일반 문의").trim();
    const organization = body.organization
      ? String(body.organization).trim()
      : undefined;
    const contactName = String(body.contactName || "").trim();
    const email = String(body.email || "").trim();
    const phone = body.phone ? String(body.phone).trim() : undefined;
    const subject = String(body.subject || "").trim();
    const message = String(body.message || "").trim();
    const privacyConsent = Boolean(body.privacyConsent);

    if (!contactName || !email || !subject || !message) {
      return NextResponse.json(
        { error: "필수 입력 항목을 모두 작성해 주세요." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "유효한 이메일 주소를 입력해 주세요." },
        { status: 400 }
      );
    }

    if (!privacyConsent) {
      return NextResponse.json(
        { error: "개인정보 수집 및 이용 동의가 필요합니다." },
        { status: 400 }
      );
    }

    const now = new Date().toISOString();
    const newInquiry: Inquiry = {
      id: `inq-${Date.now()}`,
      channel,
      inquiryType,
      organization,
      contactName,
      email,
      phone,
      subject,
      message,
      privacyConsentVersion: "v1.0 (2026-10-08)",
      status: "new",
      createdAt: now,
      updatedAt: now,
    };

    updateDb((db) => {
      db.inquiries.unshift(newInquiry);
    });

    return NextResponse.json({ inquiry: newInquiry }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "문의 등록 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
