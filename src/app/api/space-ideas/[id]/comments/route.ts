import { NextRequest, NextResponse } from "next/server";
import { updateDb } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { Comment } from "@/lib/types";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { error: "댓글을 작성하려면 먼저 로그인해 주세요." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const commentBody = String(body.body || "").trim();
    const displayMode =
      body.displayMode === "anonymous" ? "anonymous" : "public";

    if (commentBody.length < 3) {
      return NextResponse.json(
        { error: "댓글을 3자 이상 입력해 주세요." },
        { status: 400 }
      );
    }

    const now = new Date().toISOString();
    const newComment: Comment = {
      id: `cmt-${Date.now()}`,
      ideaId: id,
      authorId: user.id,
      authorName: user.displayName,
      displayMode,
      body: commentBody,
      moderationStatus: "published",
      createdAt: now,
      updatedAt: now,
    };

    updateDb((db) => {
      db.comments.push(newComment);
    });

    return NextResponse.json({ comment: newComment }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "댓글 등록 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
