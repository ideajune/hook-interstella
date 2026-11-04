import { NextRequest, NextResponse } from "next/server";
import { updateDb } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { Report } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    const body = await req.json();
    const targetType = body.targetType === "comment" ? "comment" : "idea";
    const targetId = String(body.targetId || "").trim();
    const targetTitlePreview = String(body.targetTitlePreview || "").trim();
    const reason = String(body.reason || "기타 사유").trim();
    const details = String(body.details || "").trim();

    if (!targetId) {
      return NextResponse.json(
        { error: "신고 대상 식별자가 누락되었습니다." },
        { status: 400 }
      );
    }

    const newReport: Report = {
      id: `rep-${Date.now()}`,
      reporterId: user ? user.id : "guest",
      reporterName: user ? user.displayName : "비회원 방문자",
      targetType,
      targetId,
      targetTitlePreview: targetTitlePreview || targetId,
      reason,
      details,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    updateDb((db) => {
      db.reports.unshift(newReport);
    });

    return NextResponse.json({ report: newReport }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "신고 접수 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
