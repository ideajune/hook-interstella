export type ActivityStatus =
  | "운영 중"
  | "개발 중"
  | "연구 주제"
  | "구상 단계"
  | "협력 모집 중"
  | "종료";

export type UserRole = "member" | "admin";

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  displayName: string;
  organization?: string;
  role: UserRole;
  accountStatus: "active" | "suspended";
  createdAt: string;
}

export interface BusinessGroup {
  id: string;
  slug: string;
  codeRange: string;
  titleEn: string;
  titleKo: string;
  summary: string;
  description: string;
  customerProblem: string;
  proposedValue: string;
  collaborationAreas: string[];
  primaryStatus: ActivityStatus;
  displayOrder: number;
}

export interface BusinessActivity {
  id: string;
  codeNumber: number; // 1 ~ 31
  groupSlug: string;
  title: string; // 등기부등본 원문 조항
  description: string; // 세부 설명 및 추진 방향
  activityStatus: ActivityStatus;
  updatedAt: string;
}

export interface TechnologyTopic {
  id: string;
  slug: string;
  domain:
    | "우주 기술"
    | "우주 운송 및 추진"
    | "우주 생존 기술"
    | "우주식품 및 생명과학"
    | "극한환경 장비"
    | "미래 우주 연구 주제";
  title: string;
  summary: string;
  problemStatement: string;
  relevance: string;
  status: ActivityStatus;
  limitations: string;
  collaborationNeeds: string;
  conceptNote: string;
  publishedAt: string;
}

export type ArticleCategory =
  | "News"
  | "Research & Technology"
  | "Space Industry"
  | "Education"
  | "Opinion"
  | "Reports";

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: ArticleCategory;
  authorName: string;
  authorRole: string;
  status: "draft" | "published";
  sourceLinks?: { label: string; url: string }[];
  publishedAt: string;
  updatedAt: string;
}

export type IdeaCategory =
  | "우주 기술"
  | "우주여행·관광"
  | "우주식품·생존"
  | "우주 주거·생활"
  | "우주 자원·에너지"
  | "교육·콘텐츠"
  | "기타";

export type IdeaModerationStatus =
  | "draft"
  | "pending"
  | "published"
  | "hidden"
  | "rejected"
  | "removed";

export interface Idea {
  id: string;
  postType: "idea" | "discussion";
  authorId: string;
  authorName: string;
  displayMode: "public" | "anonymous";
  category: IdeaCategory;
  title: string;
  description: string;
  attachmentName?: string;
  moderationStatus: IdeaModerationStatus;
  moderationReason?: string;
  termsVersion: string;
  privacyNoticeVersion: string;
  followUpConsent: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface Comment {
  id: string;
  ideaId: string;
  authorId: string;
  authorName: string;
  displayMode: "public" | "anonymous";
  body: string;
  moderationStatus: "published" | "hidden" | "removed";
  createdAt: string;
  updatedAt: string;
}

export interface Report {
  id: string;
  reporterId: string;
  reporterName: string;
  targetType: "idea" | "comment";
  targetId: string;
  targetTitlePreview: string;
  reason: string;
  details: string;
  status: "pending" | "resolved" | "dismissed";
  createdAt: string;
  resolvedBy?: string;
  resolvedAt?: string;
}

export interface Inquiry {
  id: string;
  channel: "partnership" | "contact" | "private_proposal";
  inquiryType: string;
  organization?: string;
  contactName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  privacyConsentVersion: string;
  status: "new" | "in_review" | "responded" | "closed";
  assignedTo?: string;
  adminNote?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ModerationAction {
  id: string;
  moderatorId: string;
  moderatorName: string;
  targetType: "idea" | "comment" | "report" | "business_activity" | "article" | "inquiry";
  targetId: string;
  action: string;
  reason: string;
  createdAt: string;
}

export interface DatabaseSchema {
  users: User[];
  businessGroups: BusinessGroup[];
  businessActivities: BusinessActivity[];
  technologyTopics: TechnologyTopic[];
  articles: Article[];
  ideas: Idea[];
  comments: Comment[];
  reports: Report[];
  inquiries: Inquiry[];
  moderationActions: ModerationAction[];
}
