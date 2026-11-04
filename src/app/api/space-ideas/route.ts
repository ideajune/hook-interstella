import { NextRequest, NextResponse } from "next/server";
import { readDb, updateDb } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { Idea, IdeaCategory } from "@/lib/types";

export async function GET() {
  const db = readDb();
  const publishedIdeas = db.ideas
    .filter((i) => i.moderationStatus === "published")
    .map((idea) => {
      const commentCount = db.comments.filter(
        (c) => c.ideaId === idea.id && c.moderationStatus === "published"
      ).length;
      return {
        ...idea,
        // Protect private identity if anonymous mode is chosen (PRD 8.2)
        authorId: idea.displayMode === "anonymous" ? "anonymous" : idea.authorId,
        authorName:
          idea.displayMode === "anonymous" ? "익명 참여자" : idea.authorName,
        commentCount,
      };
    });

  return NextResponse.json({ ideas: publishedIdeas });
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { error: "회원 인증이 필요합니다. 먼저 로그인해 주세요." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const postType = body.postType === "discussion" ? "discussion" : "idea";
    const category = String(body.category || "기타") as IdeaCategory;
    const title = String(body.title || "").trim();
    const description = String(body.description || "").trim();
    const attachmentName = body.attachmentName
      ? String(body.attachmentName).trim()
      : undefined;
    const displayMode =
      body.displayMode === "anonymous" ? "anonymous" : "public";
    const agreeRequiredTerms = Boolean(body.agreeRequiredTerms);
    const followUpConsent = Boolean(body.followUpConsent);

    if (title.length < 5) {
      return NextResponse.json(
        { error: "제목을 5자 이상 입력해 주세요." },
        { status: 400 }
      );
    }
    if (description.length < 20) {
      return NextResponse.json(
        { error: "아이디어 상세 내용을 20자 이상 작성해 주세요." },
        { status: 400 }
      );
    }
    if (!agreeRequiredTerms) {
      return NextResponse.json(
        {
          error:
            "커뮤니티 운영규칙, IP 고지 및 개인정보 수집·이용 안내에 동의해야 합니다.",
        },
        { status: 400 }
      );
    }

    const now = new Date().toISOString();
    const newIdea: Idea = {
      id: `idea-${Date.now()}`,
      postType,
      authorId: user.id,
      authorName: user.displayName,
      displayMode,
      category,
      title,
      description,
      attachmentName,
      moderationStatus: "published",
      termsVersion: "v1.0 (2026-10-08)",
      privacyNoticeVersion: "v1.0 (2026-10-08)",
      followUpConsent,
      createdAt: now,
      updatedAt: now,
      publishedAt: now,
    };

    updateDb((db) => {
      db.ideas.unshift(newIdea);
    });

    return NextResponse.json({ idea: newIdea }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "아이디어 등록 처리 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
