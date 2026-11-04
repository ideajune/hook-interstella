-- HOOK INTERSTELLAR PostgreSQL / Supabase Production Schema (schema.sql)
-- PRD.md Section 8.1 Core Entities

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  display_name TEXT NOT NULL,
  organization TEXT,
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('member', 'moderator', 'editor', 'admin')),
  account_status TEXT NOT NULL DEFAULT 'active' CHECK (account_status IN ('active', 'suspended')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS business_groups (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  code_range TEXT NOT NULL,
  title_en TEXT NOT NULL,
  title_ko TEXT NOT NULL,
  summary TEXT NOT NULL,
  description TEXT NOT NULL,
  customer_problem TEXT NOT NULL,
  proposed_value TEXT NOT NULL,
  collaboration_areas JSONB NOT NULL DEFAULT '[]',
  primary_status TEXT NOT NULL,
  display_order INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS business_activities (
  id TEXT PRIMARY KEY,
  code_number INTEGER UNIQUE NOT NULL,
  group_slug TEXT NOT NULL REFERENCES business_groups(slug),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  activity_status TEXT NOT NULL CHECK (activity_status IN ('운영 중', '개발 중', '연구 주제', '구상 단계', '협력 모집 중', '종료')),
  updated_at DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE IF NOT EXISTS technology_topics (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  domain TEXT NOT NULL,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  problem_statement TEXT NOT NULL,
  relevance TEXT NOT NULL,
  status TEXT NOT NULL,
  limitations TEXT NOT NULL,
  collaboration_needs TEXT NOT NULL,
  concept_note TEXT NOT NULL,
  published_at DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE IF NOT EXISTS articles (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  body TEXT NOT NULL,
  category TEXT NOT NULL,
  author_name TEXT NOT NULL,
  author_role TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published')),
  source_links JSONB DEFAULT '[]',
  published_at DATE NOT NULL DEFAULT CURRENT_DATE,
  updated_at DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE IF NOT EXISTS ideas (
  id TEXT PRIMARY KEY,
  post_type TEXT NOT NULL DEFAULT 'idea' CHECK (post_type IN ('idea', 'discussion')),
  author_id TEXT NOT NULL REFERENCES users(id),
  author_name TEXT NOT NULL,
  display_mode TEXT NOT NULL DEFAULT 'public' CHECK (display_mode IN ('public', 'anonymous')),
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  attachment_name TEXT,
  moderation_status TEXT NOT NULL DEFAULT 'pending' CHECK (moderation_status IN ('draft', 'pending', 'published', 'hidden', 'rejected', 'removed')),
  moderation_reason TEXT,
  terms_version TEXT NOT NULL,
  privacy_notice_version TEXT NOT NULL,
  follow_up_consent BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  published_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS comments (
  id TEXT PRIMARY KEY,
  idea_id TEXT NOT NULL REFERENCES ideas(id) ON DELETE CASCADE,
  author_id TEXT NOT NULL REFERENCES users(id),
  author_name TEXT NOT NULL,
  display_mode TEXT NOT NULL DEFAULT 'public' CHECK (display_mode IN ('public', 'anonymous')),
  body TEXT NOT NULL,
  moderation_status TEXT NOT NULL DEFAULT 'published' CHECK (moderation_status IN ('published', 'hidden', 'removed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS reports (
  id TEXT PRIMARY KEY,
  reporter_id TEXT NOT NULL,
  reporter_name TEXT NOT NULL,
  target_type TEXT NOT NULL CHECK (target_type IN ('idea', 'comment')),
  target_id TEXT NOT NULL,
  target_title_preview TEXT NOT NULL,
  reason TEXT NOT NULL,
  details TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'resolved', 'dismissed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  resolved_by TEXT,
  resolved_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS inquiries (
  id TEXT PRIMARY KEY,
  channel TEXT NOT NULL CHECK (channel IN ('partnership', 'contact', 'private_proposal')),
  inquiry_type TEXT NOT NULL,
  organization TEXT,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  privacy_consent_version TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in_review', 'responded', 'closed')),
  assigned_to TEXT,
  admin_note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS moderation_actions (
  id TEXT PRIMARY KEY,
  moderator_id TEXT NOT NULL,
  moderator_name TEXT NOT NULL,
  target_type TEXT NOT NULL,
  target_id TEXT NOT NULL,
  action TEXT NOT NULL,
  reason TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
