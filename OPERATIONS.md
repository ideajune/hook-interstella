# HOOK INTERSTELLAR — 배포 및 운영·관리자 매뉴얼 (OPERATIONS.md)

## 1. 로컬 실행 및 빌드 절차

```bash
# 1. 의존성 패키지 설치
npm install

# 2. 개발 서버 실행 (http://localhost:3000)
npm run dev

# 3. 프로덕션 빌드 및 검증
npm run build
npm run start
```

---

## 2. 데이터베이스 구조 및 마이그레이션 안내

* **기본 영속성 스토리지**: 로컬 및 초기 서버 구동 시 `data/database.json` 파일이 자동 생성되며(`src/lib/initial-data.ts` 시드 기반), 웹사이트에서 수행하는 모든 작업(회원가입, 아이디어 등록, 댓글 작성, 신고 접수, 파트너십/일반 문의 등록, 관리자의 31개 사업목적 상태 변경 및 모더레이션)이 즉시 영구 반영됩니다.
* **PostgreSQL / Supabase 프로덕션 전환**:
  1. Supabase 또는 관리형 PostgreSQL 인스턴스를 생성합니다.
  2. 루트 경로의 [schema.sql](file:///d:/바이브코딩/hook-interstella/schema.sql)을 실행하여 테이블을 생성합니다.
  3. [.env.example](file:///d:/바이브코딩/hook-interstella/.env.example)을 참고하여 `DATABASE_URL` 환경변수를 설정합니다.

---

## 3. 역할 기반 권한(RBAC) 및 초기 운영 계정

모든 관리자 API(`/api/admin`)는 클라이언트 UI뿐 아니라 **서버 측(`src/lib/auth.ts`)**에서 권한을 검증합니다.

| 역할 (Role) | 테스트 이메일 | 비밀번호 | 권한 범위 |
| :--- | :--- | :--- | :--- |
| **Administrator** (`admin`) | `admin@hookinterstellar.local` | `admin1234` | 전체 기능 + 사용자 역할/정지 관리 |
| **Editor** (`editor`) | `editor@hookinterstellar.local` | `editor1234` | 31개 사업목적 상태 관리, INSIGHTS 발행/수정, 문의 상태 관리 |
| **Moderator** (`moderator`) | `moderator@hookinterstellar.local` | `mod1234` | SPACE IDEAS 게시물 승인/숨김/반려, 댓글 및 신고 처리 |
| **Member** (`member`) | `researcher@example.com` | `member1234` | SPACE IDEAS 아이디어 등록, 댓글 작성, 신고 접수 |

> **프로덕션 배포 전 필수 조치**: 실제 공개 운영 전 초기 테스트 계정의 비밀번호를 변경하거나 SSO/이메일 인증 연동으로 전환하세요.

---

## 4. 관리자 콘솔(`/admin`) 운영 가이드

1. **SPACE IDEAS 승인 및 관리**:
   * 게시물을 검토하여 `공개 승인(published)`, `대기(pending)`, `숨김(hidden)`, `반려(rejected)`, `삭제(removed)`로 전환합니다.
   * 모든 상태 변경은 감사 로그(`Audit Trail`)에 실행자와 시각이 자동 기록됩니다.
2. **BUSINESS 31개 사업목적 상태 관리**:
   * 법인 등기부등본의 제1조~제31조 각 항목을 `운영 중`, `개발 중`, `연구 주제`, `구상 단계`, `협력 모집 중`, `종료` 중 하나로 투명하게 유지합니다.
3. **INSIGHTS 콘텐츠 관리**:
   * 신규 아티클 작성, 카테고리 지정(`News`, `Research & Technology`, `Space Industry`, `Education`, `Opinion`, `Reports`) 및 공개/초안(Draft) 전환이 가능합니다.
4. **댓글 및 신고 관리**:
   * 사용자가 신고한 게시물/댓글의 사유를 확인하고 `조치 완료(resolved)` 또는 `기각(dismissed)`으로 처리합니다.
5. **PARTNERSHIP 및 CONTACT 문의 관리**:
   * 접수된 협력 제안서와 일반 문의의 진행 상태를 `신규 접수(new)` → `검토 중(in_review)` → `회신 완료(responded)` → `종결(closed)`로 추적합니다.
