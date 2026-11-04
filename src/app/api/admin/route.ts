import { NextRequest, NextResponse } from "next/server";
import { readDb, updateDb } from "@/lib/db";
import { getCurrentUser, hasRole } from "@/lib/auth";
import {
  ActivityStatus,
  Article,
  ArticleCategory,
  IdeaModerationStatus,
  UserRole,
} from "@/lib/types";

export async function GET() {
  const user = await getCurrentUser();
  if (!hasRole(user, ["admin"])) {
    return NextResponse.json(
      { error: "총괄 관리자 권한이 필요합니다." },
      { status: 403 }
    );
  }

  const db = readDb();
  return NextResponse.json({
    currentUser: {
      id: user!.id,
      displayName: user!.displayName,
      email: user!.email,
      role: user!.role,
    },
    businessGroups: db.businessGroups,
    businessActivities: db.businessActivities,
    articles: db.articles,
    ideas: db.ideas,
    comments: db.comments,
    reports: db.reports,
    inquiries: db.inquiries,
    users: db.users.map((u) => ({
      id: u.id,
      email: u.email,
      displayName: u.displayName,
      organization: u.organization,
      role: u.role,
      accountStatus: u.accountStatus,
      createdAt: u.createdAt,
    })),
    moderationActions: db.moderationActions,
  });
}

export async function PATCH(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!hasRole(user, ["admin"])) {
      return NextResponse.json(
        { error: "총괄 관리자 권한이 없습니다." },
        { status: 403 }
      );
    }

    const body = await req.json();
    const actionType = String(body.actionType || "");
    const now = new Date().toISOString();

    // 1. Update Business Activity Status
    if (actionType === "update_business_activity") {
      const { id, activityStatus, description } = body;
      updateDb((db) => {
        const item = db.businessActivities.find((a) => a.id === id);
        if (item) {
          item.activityStatus = activityStatus as ActivityStatus;
          if (description) item.description = String(description).trim();
          item.updatedAt = now.slice(0, 10);
          db.moderationActions.unshift({
            id: `mod-${Date.now()}`,
            moderatorId: user!.id,
            moderatorName: user!.displayName,
            targetType: "business_activity",
            targetId: id,
            action: `상태 변경 → ${activityStatus}`,
            reason: `과제 #${String(item.codeNumber).padStart(2, "0")} 상태 업데이트`,
            createdAt: now,
          });
        }
      });
      return NextResponse.json({ ok: true });
    }

    // 2. Create or Update Article
    if (actionType === "create_article") {
      const { title, excerpt, bodyText, category, status } = body;
      const slug = `insight-${Date.now()}`;
      const newArticle: Article = {
        id: `art-${Date.now()}`,
        slug,
        title: String(title || "").trim(),
        excerpt: String(excerpt || "").trim(),
        body: String(bodyText || "").trim(),
        category: (category || "News") as ArticleCategory,
        authorName: user!.displayName,
        authorRole: "ADMIN",
        status: status === "draft" ? "draft" : "published",
        publishedAt: now.slice(0, 10),
        updatedAt: now.slice(0, 10),
      };
      updateDb((db) => {
        db.articles.unshift(newArticle);
        db.moderationActions.unshift({
          id: `mod-${Date.now()}`,
          moderatorId: user!.id,
          moderatorName: user!.displayName,
          targetType: "article",
          targetId: newArticle.id,
          action: `신규 아티클 등록 (${newArticle.status})`,
          reason: newArticle.title,
          createdAt: now,
        });
      });
      return NextResponse.json({ ok: true, article: newArticle });
    }

    if (actionType === "toggle_article_status") {
      const { id, status } = body;
      updateDb((db) => {
        const art = db.articles.find((a) => a.id === id);
        if (art) {
          art.status = status === "draft" ? "draft" : "published";
          art.updatedAt = now.slice(0, 10);
        }
      });
      return NextResponse.json({ ok: true });
    }

    if (actionType === "delete_article") {
      const { id } = body;
      updateDb((db) => {
        db.articles = db.articles.filter((a) => a.id !== id);
      });
      return NextResponse.json({ ok: true });
    }

    // 3. Moderate Space Idea
    if (actionType === "moderate_idea") {
      const { id, moderationStatus, reason } = body;
      updateDb((db) => {
        const idea = db.ideas.find((i) => i.id === id);
        if (idea) {
          idea.moderationStatus = moderationStatus as IdeaModerationStatus;
          idea.moderationReason = String(reason || "관리자 검토 처리");
          idea.updatedAt = now;
          if (moderationStatus === "published") {
            idea.publishedAt = now;
          }
          db.moderationActions.unshift({
            id: `mod-${Date.now()}`,
            moderatorId: user!.id,
            moderatorName: user!.displayName,
            targetType: "idea",
            targetId: id,
            action: `아이디어 상태 → ${moderationStatus}`,
            reason: idea.moderationReason,
            createdAt: now,
          });
        }
      });
      return NextResponse.json({ ok: true });
    }

    // 4. Moderate Comment
    if (actionType === "moderate_comment") {
      const { id, moderationStatus } = body;
      updateDb((db) => {
        const cmt = db.comments.find((c) => c.id === id);
        if (cmt) {
          cmt.moderationStatus = moderationStatus;
          cmt.updatedAt = now;
          db.moderationActions.unshift({
            id: `mod-${Date.now()}`,
            moderatorId: user!.id,
            moderatorName: user!.displayName,
            targetType: "comment",
            targetId: id,
            action: `댓글 상태 → ${moderationStatus}`,
            reason: "관리자 댓글 상태 변경",
            createdAt: now,
          });
        }
      });
      return NextResponse.json({ ok: true });
    }

    // 5. Resolve Report
    if (actionType === "resolve_report") {
      const { id, status } = body;
      updateDb((db) => {
        const rep = db.reports.find((r) => r.id === id);
        if (rep) {
          rep.status = status === "dismissed" ? "dismissed" : "resolved";
          rep.resolvedBy = user!.displayName;
          rep.resolvedAt = now;
          db.moderationActions.unshift({
            id: `mod-${Date.now()}`,
            moderatorId: user!.id,
            moderatorName: user!.displayName,
            targetType: "report",
            targetId: id,
            action: `신고 처리 → ${rep.status}`,
            reason: rep.reason,
            createdAt: now,
          });
        }
      });
      return NextResponse.json({ ok: true });
    }

    // 6. Update Inquiry Status
    if (actionType === "update_inquiry") {
      const { id, status } = body;
      updateDb((db) => {
        const inq = db.inquiries.find((i) => i.id === id);
        if (inq) {
          inq.status = status;
          inq.updatedAt = now;
          db.moderationActions.unshift({
            id: `mod-${Date.now()}`,
            moderatorId: user!.id,
            moderatorName: user!.displayName,
            targetType: "inquiry",
            targetId: id,
            action: `문의 상태 → ${status}`,
            reason: inq.subject,
            createdAt: now,
          });
        }
      });
      return NextResponse.json({ ok: true });
    }

    // 7. Update User Role or Account Status
    if (actionType === "update_user") {
      const { id, role, accountStatus } = body;
      updateDb((db) => {
        const target = db.users.find((u) => u.id === id);
        if (target) {
          if (role) target.role = role as UserRole;
          if (accountStatus) target.accountStatus = accountStatus;
        }
      });
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json(
      { error: "지원하지 않는 관리자 액션입니다." },
      { status: 400 }
    );
  } catch {
    return NextResponse.json(
      { error: "관리자 요청 처리 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
