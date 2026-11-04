import { NextRequest, NextResponse } from "next/server";
import { readDb } from "@/lib/db";
import { getCurrentUser, hasRole } from "@/lib/auth";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const db = readDb();
  const user = await getCurrentUser();
  const isStaff = hasRole(user, ["admin"]);

  const idea = db.ideas.find((i) => i.id === id);
  if (!idea) {
    return NextResponse.json({ idea: null, comments: [] }, { status: 404 });
  }

  // Only allow public to see published; author or staff can see pending
  const isAuthor = user && user.id === idea.authorId;
  if (idea.moderationStatus !== "published" && !isAuthor && !isStaff) {
    return NextResponse.json({ idea: null, comments: [] }, { status: 404 });
  }

  const sanitizedIdea = {
    ...idea,
    authorId:
      idea.displayMode === "anonymous" && !isStaff ? "anonymous" : idea.authorId,
    authorName:
      idea.displayMode === "anonymous" && !isStaff
        ? "익명 참여자"
        : idea.authorName,
  };

  const comments = db.comments
    .filter((c) => c.ideaId === id && c.moderationStatus === "published")
    .map((c) => ({
      ...c,
      authorId:
        c.displayMode === "anonymous" && !isStaff ? "anonymous" : c.authorId,
      authorName:
        c.displayMode === "anonymous" && !isStaff
          ? "익명 참여자"
          : c.authorName,
    }));

  return NextResponse.json({ idea: sanitizedIdea, comments });
}
