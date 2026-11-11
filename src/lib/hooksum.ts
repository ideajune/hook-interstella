import crypto from "crypto";
import { Idea } from "./types";

export const DEMO_HOOK_CHAIN_IDEA: Idea = {
  id: "idea-6",
  postType: "idea",
  authorId: "user-member-2",
  authorName: "이준호 엔지니어",
  displayMode: "public",
  category: "우주 기술",
  title:
    "극저온 성층권 패러포일 조향 서보 결빙 방지를 위한 상변화물질(PCM) 보온 모듈",
  description:
    "제네시스 훅(성층권 고고도 풍선 활공 낙하산 회수 개념)에서 영감을 받아 파생 연결한 2차 아이디어입니다. 고도 20~35km 구간(영하 50°C 이하) 통과 시 조향 서보 모터와 배터리가 결빙·방전되지 않도록 상변화물질(PCM) 열완충 캡슐과 에어로젤 박막 단열재를 결합한 80g급 초경량 서보 하우징 구조를 제안합니다.",
  parentIdeaId: "idea-1",
  genesisIdeaId: "idea-1",
  chainDepth: 2,
  moderationStatus: "published",
  termsVersion: "v1.1 (Hooksum Prior Art)",
  privacyNoticeVersion: "v1.0 (2026-10-08)",
  followUpConsent: true,
  createdAt: "2026-10-28T11:30:00Z",
  updatedAt: "2026-10-28T11:30:00Z",
  publishedAt: "2026-10-28T11:30:00Z",
};

export function computeIdeaStampHash(input: {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}): string {
  const canonical = `HOOKSUM-PRIOR-ART|${input.id}|${input.createdAt}|${input.title.trim()}|${input.description.trim()}`;
  return crypto.createHash("sha256").update(canonical, "utf8").digest("hex");
}

export function withDemoHookIdea(ideas: Idea[]): Idea[] {
  const hasIdea1 = ideas.some((i) => i.id === "idea-1");
  const hasIdea6 = ideas.some((i) => i.id === "idea-6");
  if (hasIdea1 && !hasIdea6) {
    return [...ideas, DEMO_HOOK_CHAIN_IDEA];
  }
  return ideas;
}

/**
 * Deterministically assigns stampId, stampHash, genesisIdeaId, and chainDepth
 * to all idea posts (including pre-existing database entries) without mutating disk unnecessarily.
 */
export function enrichIdeasWithHooksum(rawIdeas: Idea[]): Idea[] {
  const ideas = withDemoHookIdea(rawIdeas).map((item) => ({ ...item }));

  // Chronological order for deterministic sequential stamp numbers
  const chronologicalIdeas = ideas
    .filter((i) => i.postType === "idea")
    .sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

  let seq = 1;
  const usedStampIds = new Set<string>();
  for (const item of chronologicalIdeas) {
    if (item.stampId) {
      usedStampIds.add(item.stampId);
      const match = item.stampId.match(/HOOK-\d{4}-(\d+)/);
      if (match) {
        const parsed = parseInt(match[1], 10);
        if (parsed >= seq) seq = parsed + 1;
      }
    }
  }

  for (const item of chronologicalIdeas) {
    if (!item.stampId) {
      const year = (item.createdAt || "2026").slice(0, 4);
      let candidate = `HOOK-${year}-${String(seq).padStart(4, "0")}`;
      while (usedStampIds.has(candidate)) {
        seq += 1;
        candidate = `HOOK-${year}-${String(seq).padStart(4, "0")}`;
      }
      item.stampId = candidate;
      usedStampIds.add(candidate);
      seq += 1;
    }

    if (!item.stampHash) {
      item.stampHash = computeIdeaStampHash({
        id: item.id,
        title: item.title,
        description: item.description,
        createdAt: item.createdAt,
      });
    }
  }

  const byId = new Map<string, Idea>(ideas.map((i) => [i.id, i]));

  // Resolve genesisIdeaId and chainDepth across parent links
  for (const item of chronologicalIdeas) {
    if (!item.parentIdeaId) {
      item.genesisIdeaId = item.id;
      item.chainDepth = 1;
    } else {
      let depth = 1;
      let cursor: Idea | undefined = item;
      const visited = new Set<string>([item.id]);
      while (cursor?.parentIdeaId) {
        const parent = byId.get(cursor.parentIdeaId);
        if (!parent || visited.has(parent.id)) break;
        visited.add(parent.id);
        depth += 1;
        cursor = parent;
      }
      item.genesisIdeaId = cursor?.id || item.parentIdeaId;
      item.chainDepth = depth;
    }
  }

  // Sort newest first for board presentation
  return ideas.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function generateNextStampId(existingIdeas: Idea[], isoDate: string): string {
  const enriched = enrichIdeasWithHooksum(existingIdeas);
  let maxSeq = 0;
  for (const item of enriched) {
    if (item.stampId) {
      const match = item.stampId.match(/HOOK-\d{4}-(\d+)/);
      if (match) {
        const num = parseInt(match[1], 10);
        if (num > maxSeq) maxSeq = num;
      }
    }
  }
  const year = isoDate.slice(0, 4);
  return `HOOK-${year}-${String(maxSeq + 1).padStart(4, "0")}`;
}

export interface HookChainNode {
  id: string;
  stampId?: string;
  title: string;
  authorName: string;
  category: string;
  parentIdeaId?: string;
  genesisIdeaId?: string;
  chainDepth: number;
  createdAt: string;
}

export function buildHookChainSummary(
  allEnrichedIdeas: Idea[],
  targetIdea: Idea,
  isStaff = false
) {
  if (targetIdea.postType !== "idea") {
    return null;
  }

  const genesisId = targetIdea.genesisIdeaId || targetIdea.id;
  const chainIdeas = allEnrichedIdeas
    .filter(
      (i) =>
        i.postType === "idea" &&
        i.moderationStatus === "published" &&
        (i.genesisIdeaId === genesisId || i.id === genesisId)
    )
    .sort((a, b) => {
      const depthDiff = (a.chainDepth || 1) - (b.chainDepth || 1);
      if (depthDiff !== 0) return depthDiff;
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });

  const sanitizeNode = (i: Idea): HookChainNode => ({
    id: i.id,
    stampId: i.stampId,
    title: i.title,
    authorName:
      i.displayMode === "anonymous" && !isStaff ? "익명 참여자" : i.authorName,
    category: i.category,
    parentIdeaId: i.parentIdeaId,
    genesisIdeaId: i.genesisIdeaId || i.id,
    chainDepth: i.chainDepth || 1,
    createdAt: i.createdAt,
  });

  const nodes = chainIdeas.map(sanitizeNode);
  const parentRaw = targetIdea.parentIdeaId
    ? allEnrichedIdeas.find(
        (i) => i.id === targetIdea.parentIdeaId && i.moderationStatus === "published"
      )
    : undefined;

  return {
    genesisId,
    parentIdea: parentRaw ? sanitizeNode(parentRaw) : null,
    nodes,
  };
}
