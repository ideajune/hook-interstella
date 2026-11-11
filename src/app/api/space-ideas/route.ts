import { NextRequest, NextResponse } from "next/server";
import { readDb, updateDb } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { Idea, IdeaCategory } from "@/lib/types";
import {
  computeIdeaStampHash,
  DEMO_HOOK_CHAIN_IDEA,
  enrichIdeasWithHooksum,
  generateNextStampId,
} from "@/lib/hooksum";

export async function GET() {
  const db = readDb();
  const enrichedAll = enrichIdeasWithHooksum(db.ideas);
  const publishedOnly = enrichedAll.filter(
    (i) => i.moderationStatus === "published"
  );

  const publishedIdeas = publishedOnly.map((idea) => {
    const commentCount = db.comments.filter(
      (c) => c.ideaId === idea.id && c.moderationStatus === "published"
    ).length;

    const genesisId = idea.genesisIdeaId || idea.id;
    const hookChainCount =
      idea.postType === "idea"
        ? publishedOnly.filter(
            (x) =>
              x.postType === "idea" &&
              (x.genesisIdeaId || x.id) === genesisId
          ).length
        : 0;

    const parent = idea.parentIdeaId
      ? publishedOnly.find((p) => p.id === idea.parentIdeaId)
      : undefined;

    return {
      ...idea,
      authorId: idea.displayMode === "anonymous" ? "anonymous" : idea.authorId,
      authorName:
        idea.displayMode === "anonymous" ? "익명 참여자" : idea.authorName,
      commentCount,
      hookChainCount,
      parentTitle: parent?.title,
      parentStampId: parent?.stampId,
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
    const rawParentId = body.parentIdeaId
      ? String(body.parentIdeaId).trim()
      : undefined;
    let postType: "idea" | "discussion" =
      body.postType === "discussion" ? "discussion" : "idea";
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
            "안티-특허(선행기술 박제) 원칙, IP 고지 및 개인정보 수집·이용 안내에 동의해야 합니다.",
        },
        { status: 400 }
      );
    }

    const dbSnapshot = readDb();
    const enrichedExisting = enrichIdeasWithHooksum(dbSnapshot.ideas);

    let parentIdeaId: string | undefined;
    let genesisIdeaId: string | undefined;
    let chainDepth: number | undefined;

    if (rawParentId) {
      const parentIdea = enrichedExisting.find(
        (i) => i.id === rawParentId && i.postType === "idea"
      );
      if (!parentIdea) {
        return NextResponse.json(
          { error: "연결할 원본(상위) 박제 아이디어를 찾을 수 없습니다." },
          { status: 400 }
        );
      }
      postType = "idea";
      parentIdeaId = parentIdea.id;
      genesisIdeaId = parentIdea.genesisIdeaId || parentIdea.id;
      chainDepth = (parentIdea.chainDepth || 1) + 1;
    }

    const now = new Date().toISOString();
    const newId = `idea-${Date.now()}`;

    const stampId =
      postType === "idea"
        ? generateNextStampId(dbSnapshot.ideas, now)
        : undefined;
    const stampHash =
      postType === "idea"
        ? computeIdeaStampHash({
            id: newId,
            title,
            description,
            createdAt: now,
          })
        : undefined;

    const newIdea: Idea = {
      id: newId,
      postType,
      authorId: user.id,
      authorName: user.displayName,
      displayMode,
      category,
      title,
      description,
      attachmentName,
      stampId,
      stampHash,
      parentIdeaId,
      genesisIdeaId: postType === "idea" ? genesisIdeaId || newId : undefined,
      chainDepth: postType === "idea" ? chainDepth || 1 : undefined,
      moderationStatus: "published",
      termsVersion: "v1.1 (Hooksum Prior Art)",
      privacyNoticeVersion: "v1.0 (2026-10-08)",
      followUpConsent,
      createdAt: now,
      updatedAt: now,
      publishedAt: now,
    };

    updateDb((db) => {
      if (
        rawParentId === DEMO_HOOK_CHAIN_IDEA.id &&
        !db.ideas.some((i) => i.id === DEMO_HOOK_CHAIN_IDEA.id)
      ) {
        db.ideas.push({ ...DEMO_HOOK_CHAIN_IDEA });
      }
      db.ideas.unshift(newIdea);
    });

    return NextResponse.json({ idea: newIdea }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "아이디어 박제 처리 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
