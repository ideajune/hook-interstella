# HOOK INTERSTELLAR --- Product Requirements Document (PRD)

> **Document:** `PRD.md`\
> **Product:** HOOK INTERSTELLAR Website & Space Ideas Platform\
> **Version:** 1.0\
> **Status:** Initial product specification\
> **Primary language:** Korean\
> **Secondary language:** English (Phase 2)\
> **Related document:** `design.md`

------------------------------------------------------------------------

## 1. Product overview

### 1.1 Product vision

Build the official digital presence and participation platform for
**HOOK INTERSTELLAR**, connecting its space-industry business themes
with technology, education, knowledge content, collaboration, and public
participation.

The website should help visitors understand the organization's
direction, explore its business areas, review published knowledge,
submit space-related ideas, and initiate collaboration.

### 1.2 Brand statement

**새로운 우주 시대, 우리만의 항로를 개척하다.**\
*Beyond the Horizon.*

### 1.3 Product goals

1.  Establish a credible and consistent online identity for HOOK
    INTERSTELLAR.
2.  Explain the organization's five business groups and related
    activities in an understandable structure.
3.  Present technology themes, insights, and educational content.
4.  Enable individuals and organizations to submit inquiries and
    partnership proposals.
5.  Create a moderated public space where users can share and discuss
    space-related ideas.
6.  Provide an extensible foundation for future content, community, and
    business-development workflows.

### 1.4 Product success principle

The website must distinguish **verified current activities** from
**planned initiatives, research themes, concepts, and aspirations**. A
registered business purpose or a published idea must not be presented as
proof of operational capability, ownership, or commercial readiness.

------------------------------------------------------------------------

## 2. Background and problem statement

HOOK INTERSTELLAR's planned scope spans several related but broad areas:

-   Space technology
-   Space survival technologies and supplies
-   Talent, education, and community
-   Revenue development, R&D collaboration, and intellectual property
-   Global networks, trade, and investment

Without a structured website, visitors may struggle to understand how
these areas relate, what the organization currently does, and how they
can participate.

The product addresses this by providing: - A clear company and business
overview. - Consistent detail pages for business and technology
themes. - A knowledge and editorial section. - Structured inquiry and
partnership forms. - A public idea-sharing and discussion area with
explicit rules and moderation.

------------------------------------------------------------------------

## 3. Target users and needs

  -----------------------------------------------------------------------
  User segment            Main need               Expected action
  ----------------------- ----------------------- -----------------------
  General visitors        Understand the vision   Browse pages and
                          and discover            insights
                          space-related topics    

  Space enthusiasts and   Share questions,        Submit or discuss an
  idea contributors       concepts, and proposals idea

  Researchers and         Identify research       Review technology
  technical experts       themes and possible     topics and contact the
                          collaboration           organization

  Companies and suppliers Understand relevant     Submit a partnership
                          business areas and      inquiry
                          cooperation routes      

  Educational             Find educational        Explore ecosystem and
  institutions and        content and             contact
  students                participation           
                          opportunities           

  Investors and strategic Understand direction,   Review company
  partners                business structure, and information and request
                          verified progress       a discussion

  Site                    Publish accurate        Manage pages, posts,
  administrator/editor    information and manage  inquiries, and
                          user-generated content  moderation
  -----------------------------------------------------------------------

### 3.1 User roles

-   **Guest:** can view public pages and public ideas; may submit an
    inquiry if enabled.
-   **Registered member:** can submit ideas, comment, and manage their
    own profile/content according to policy.
-   **Moderator:** can review reports, hide or remove content, and
    manage community safety.
-   **Administrator:** can manage users, content, site configuration,
    inquiries, and moderator permissions.
-   **Editor:** can create and update editorial and business content
    without full system administration privileges.

Role permissions must be enforced on the server, not only hidden in the
interface.

------------------------------------------------------------------------

## 4. Product scope

### 4.1 Phase 1 --- MVP

The first release should prioritize a trustworthy company website and a
minimally viable, safely moderated idea community.

Included: - Responsive public website. - Korean-language content. -
Eight primary navigation areas. - Homepage and core informational
pages. - Five business-group overview pages and structured business
detail content. - Technology topic pages with status labels. - Insights
list and article detail pages. - Partnership and general inquiry
forms. - SPACE IDEAS public listing and idea submission. - Member
authentication if public posting is enabled. - Basic comments,
reporting, and administrator moderation. - Content administration. -
Basic SEO, analytics, security, and operational monitoring.

### 4.2 Phase 2 --- Expansion

-   English-language site and content workflow.
-   IDEA CHALLENGE with deadlines and submissions.
-   Voting or recommendation features, subject to anti-abuse controls.
-   IDEA LAB workflow for selected ideas.
-   Expert review and collaboration matching.
-   Newsletter subscription and consent management.
-   Advanced search and filters.
-   Partner directory, only when partner information and permissions are
    verified.
-   More detailed analytics and conversion reporting.

### 4.3 Out of scope for the initial MVP

-   Full social network or real-time chat.
-   Public investment solicitation or securities transactions.
-   Automated valuation or guaranteed commercialization of user ideas.
-   Patentability assessment or legal advice.
-   Marketplace payments or e-commerce checkout.
-   Public disclosure of confidential technical documentation.
-   Claims of an established partner network without verified partner
    agreements.
-   Native mobile applications.

------------------------------------------------------------------------

## 5. Information architecture

### 5.1 Primary navigation

  -----------------------------------------------------------------------
  Menu                    Purpose                 Key content
  ----------------------- ----------------------- -----------------------
  ABOUT                   Explain the             Overview, vision,
                          organization            mission, values

  BUSINESS                Explain business areas  Five groups, detailed
                                                  activities, status

  TECHNOLOGY              Explain technical       Domains, research
                          themes                  themes, development
                                                  status

  ECOSYSTEM               Explain participation   Education, talent,
                          network                 community,
                                                  collaboration

  INSIGHTS                Publish knowledge       News, articles,
                                                  reports, resources

  SPACE IDEAS             Enable public           Idea Board, Discussion,
                          participation           Idea Challenge, Idea
                                                  Lab

  PARTNERSHIP             Invite organizational   Cooperation types,
                          cooperation             proposal form

  CONTACT                 Handle general          Contact details and
                          inquiries               inquiry form
  -----------------------------------------------------------------------

### 5.2 Business groups

1.  Space Technology
2.  Space Survival
3.  Talent, Education & Community
4.  Revenue & IP Development
5.  Global Network

The 31 business purposes should be mapped into these groups and
displayed as structured details. The website must not imply that all 31
activities are currently active services.

### 5.3 Suggested URL structure

-   `/`
-   `/about`
-   `/business`
-   `/business/space-technology`
-   `/business/space-survival`
-   `/business/education-community`
-   `/business/revenue-ip`
-   `/business/global-network`
-   `/technology`
-   `/ecosystem`
-   `/insights`
-   `/insights/[slug]`
-   `/space-ideas`
-   `/space-ideas/[id]`
-   `/space-ideas/submit`
-   `/space-ideas/challenge` (Phase 2)
-   `/space-ideas/idea-lab` (Phase 2)
-   `/partnership`
-   `/contact`
-   `/privacy`
-   `/terms`
-   `/community-rules`

URLs may be adjusted to the selected framework and SEO strategy, but
should remain descriptive and stable.

------------------------------------------------------------------------

## 6. Functional requirements

Priority definitions: - **P0:** required for MVP launch. - **P1:**
important; implement in MVP if schedule and resources allow, otherwise
next release. - **P2:** post-MVP enhancement.

### 6.1 Global website

  -------------------------------------------------------------------------
  ID               Requirement                   Priority Acceptance
                                                          criteria
  ---------------- ---------------- --------------------- -----------------
  FR-001           Responsive                          P0 Core pages work
                   layout                                 at mobile,
                                                          tablet, and
                                                          desktop widths
                                                          without
                                                          horizontal
                                                          overflow

  FR-002           Primary                             P0 All eight main
                   navigation                             sections are
                                                          reachable and
                                                          active section is
                                                          identifiable

  FR-003           Footer and legal                    P0 Footer displays
                   links                                  verified
                                                          company/contact
                                                          details and links
                                                          to legal policies

  FR-004           Page metadata                       P0 Each public page
                                                          has a unique
                                                          title,
                                                          description, and
                                                          share metadata

  FR-005           Search                              P1 Users can search
                                                          published
                                                          insights and
                                                          public idea
                                                          content

  FR-006           Language                            P2 English can be
                   selection                              enabled without
                                                          duplicating or
                                                          breaking Korean
                                                          content

  FR-007           Analytics                           P0 Page views and
                                                          key conversion
                                                          events are
                                                          recorded under an
                                                          appropriate
                                                          privacy notice
  -------------------------------------------------------------------------

### 6.2 Homepage

  ------------------------------------------------------------------------
  ID               Requirement                   Priority Acceptance
                                                          criteria
  ---------------- ---------------- --------------------- ----------------
  FR-010           Hero section                        P0 Shows brand
                                                          statement,
                                                          concise
                                                          supporting copy,
                                                          and two clear
                                                          CTAs

  FR-011           Brand                               P0 Explains the
                   introduction                           organization and
                                                          its purpose in
                                                          concise language

  FR-012           Business                            P0 Displays five
                   portfolio                              business groups
                                                          with links to
                                                          detail pages

  FR-013           Technology                          P1 Displays
                   highlights                             selected themes
                                                          with accurate
                                                          status labels

  FR-014           Ecosystem                           P1 Explains
                   introduction                           participation
                                                          paths for key
                                                          user groups

  FR-015           Space Ideas                         P0 Links to public
                   feature                                ideas and idea
                                                          submission

  FR-016           Insights preview                    P1 Shows latest
                                                          published
                                                          articles or a
                                                          designed empty
                                                          state

  FR-017           Partnership CTA                     P0 Links to
                                                          partnership
                                                          inquiry route
  ------------------------------------------------------------------------

### 6.3 ABOUT

  ------------------------------------------------------------------------
  ID               Requirement                   Priority Acceptance
                                                          criteria
  ---------------- ---------------- --------------------- ----------------
  FR-020           Company overview                    P0 Shows approved
                                                          company
                                                          introduction

  FR-021           Vision, mission,                    P0 Each item is
                   values                                 editable through
                                                          the content
                                                          administration
                                                          system

  FR-022           Milestones                          P2 Only verified,
                                                          dated milestones
                                                          can be published
  ------------------------------------------------------------------------

### 6.4 BUSINESS

  ------------------------------------------------------------------------
  ID               Requirement                   Priority Acceptance
                                                          criteria
  ---------------- ---------------- --------------------- ----------------
  FR-030           Five-group                          P0 Each group has
                   overview                               title, summary,
                                                          and detail route

  FR-031           Business detail                     P0 Each group
                   pages                                  supports
                                                          overview,
                                                          activity
                                                          descriptions,
                                                          status, and
                                                          inquiry CTA

  FR-032           31-purpose                          P0 Each registered
                   mapping                                purpose is
                                                          mapped to a
                                                          group and does
                                                          not appear as
                                                          proof of active
                                                          operations

  FR-033           Activity status                     P0 Status is
                   labels                                 selected by
                                                          authorized
                                                          editors from an
                                                          approved set

  FR-034           Related content                     P2 Business pages
                                                          can link to
                                                          relevant
                                                          insights and
                                                          technology
                                                          topics
  ------------------------------------------------------------------------

Allowed status labels: - 운영 중 - 개발 중 - 연구 주제 - 구상 단계 -
협력 모집 중 - 종료

Only authorized editors may set or change status labels. The meaning of
each label must be documented internally.

### 6.5 TECHNOLOGY

  -----------------------------------------------------------------------------------
  ID               Requirement                   Priority Acceptance criteria
  ---------------- ---------------- --------------------- ---------------------------
  FR-040           Technology topic                    P1 Topics can be grouped by
                   list                                   domain

  FR-041           Technology                          P1 Detail includes problem,
                   detail                                 relevance, status,
                                                          limitations/dependencies,
                                                          and collaboration needs

  FR-042           Concept labeling                    P0 Concept diagrams and
                                                          renderings are visibly
                                                          identified as illustrative
  -----------------------------------------------------------------------------------

### 6.6 ECOSYSTEM

  ------------------------------------------------------------------------
  ID               Requirement                   Priority Acceptance
                                                          criteria
  ---------------- ---------------- --------------------- ----------------
  FR-050           Participation                       P1 Visitors can
                   paths                                  identify
                                                          relevant paths
                                                          for individuals,
                                                          students,
                                                          researchers,
                                                          companies, and
                                                          institutions

  FR-051           Ecosystem                           P1 Page explains
                   explanation                            relationships
                                                          among education,
                                                          content,
                                                          community,
                                                          research, and
                                                          collaboration

  FR-052           Partner proof                       P0 Partner
                   controls                               logos/names
                                                          cannot be
                                                          published
                                                          without
                                                          documented
                                                          permission
  ------------------------------------------------------------------------

### 6.7 INSIGHTS

  ------------------------------------------------------------------------
  ID               Requirement                   Priority Acceptance
                                                          criteria
  ---------------- ---------------- --------------------- ----------------
  FR-060           Article listing                     P1 Published
                                                          articles show
                                                          category, date,
                                                          title, summary,
                                                          and optional
                                                          image

  FR-061           Article detail                      P1 Article page
                                                          shows content,
                                                          author, date,
                                                          and source links
                                                          where applicable

  FR-062           Editorial                           P0 Authorized
                   management                             editors can
                                                          create, edit,
                                                          preview,
                                                          publish, and
                                                          unpublish
                                                          articles

  FR-063           Article                             P1 Articles can be
                   categories                             categorized and
                                                          filtered

  FR-064           Update                              P1 Updated articles
                   information                            can show a
                                                          last-updated
                                                          date
  ------------------------------------------------------------------------

### 6.8 SPACE IDEAS

SPACE IDEAS is a public participation feature and requires explicit
operational ownership for moderation.

  ----------------------------------------------------------------------------------
  ID               Requirement                          Priority Acceptance criteria
  ---------------- ----------------------- --------------------- -------------------
  FR-070           Idea Board                                 P0 Public users can
                                                                 browse approved
                                                                 public ideas

  FR-071           Member authentication                    P0\* Users must
                                                                 authenticate before
                                                                 submitting or
                                                                 commenting if
                                                                 public
                                                                 participation is
                                                                 enabled

  FR-072           Idea submission                            P0 Authenticated users
                                                                 can submit
                                                                 category, title,
                                                                 description, and
                                                                 optional attachment

  FR-073           Public/anonymous                           P1 Author can choose
                   display                                       display name or
                                                                 anonymous label;
                                                                 actual account
                                                                 identity remains
                                                                 protected

  FR-074           Idea detail                                P0 Idea detail shows
                                                                 approved content,
                                                                 date, category, and
                                                                 comments

  FR-075           Comments                                   P1 Authenticated users
                                                                 can comment;
                                                                 moderators can
                                                                 hide/remove
                                                                 comments

  FR-076           Reporting                                  P0 Users can report an
                                                                 idea or comment
                                                                 with a reason

  FR-077           Moderation queue                           P0 Moderators can
                                                                 review, approve,
                                                                 hide, remove, or
                                                                 restore content

  FR-078           User content management                    P1 Users can view and
                                                                 request
                                                                 edits/deletion of
                                                                 their own content
                                                                 subject to policy

  FR-079           Search and filters                         P1 Users can filter
                                                                 public ideas by
                                                                 category and search
                                                                 terms

  FR-080           Recommendation/voting                      P2 Users can recommend
                                                                 ideas with abuse
                                                                 prevention and rate
                                                                 limits

  FR-081           Idea Challenge                             P2 Administrators can
                                                                 create a themed
                                                                 challenge with
                                                                 opening/closing
                                                                 dates and rules

  FR-082           IDEA LAB review                            P2 Authorized staff
                                                                 can record internal
                                                                 review status and
                                                                 contact the author
                                                                 with consent

  FR-083           Private proposal route                     P1 Users can submit a
                                                                 non-public proposal
                                                                 through a separate,
                                                                 clearly explained
                                                                 channel

  FR-084           IP and privacy notice                      P0 Submission flow
                                                                 links to clear
                                                                 terms about public
                                                                 disclosure,
                                                                 ownership, privacy,
                                                                 and separate
                                                                 commercialization
                                                                 consent
  ----------------------------------------------------------------------------------

\*Authentication is mandatory for user-generated submissions and
comments. Public browsing can remain available without an account.

#### Idea categories (initial proposal)

-   우주 기술
-   우주여행·관광
-   우주식품·생존
-   우주 주거·생활
-   우주 자원·에너지
-   교육·콘텐츠
-   기타

#### Idea submission fields

-   Category (required)
-   Title (required)
-   Description (required)
-   Attachment (optional; file type/size limits apply)
-   Display name preference (account name or anonymous label)
-   Required agreement to community rules and privacy notice
-   Optional consent for follow-up contact

Do not combine general terms acceptance with optional marketing or
follow-up consent.

#### Idea moderation states

-   Draft
-   Pending review
-   Published
-   Hidden
-   Rejected
-   Removed

The user-facing state and internal moderation reason should be separated
where appropriate.

#### IP and disclosure requirements

-   Public submission does not automatically transfer ownership of an
    idea to HOOK INTERSTELLAR.
-   The author retains rights according to applicable law and the
    published terms.
-   Any evaluation, joint development, licensing, or commercialization
    requires separate agreement.
-   Do not promise confidentiality for public posts.
-   A private proposal form is not an NDA-protected channel unless a
    formal NDA process exists.
-   Warn users that public disclosure may affect patent novelty and
    recommend professional IP advice before posting potentially
    patentable details.
-   Maintain a record of the version of terms accepted at submission
    time.

### 6.9 PARTNERSHIP

  ------------------------------------------------------------------------
  ID               Requirement                   Priority Acceptance
                                                          criteria
  ---------------- ---------------- --------------------- ----------------
  FR-090           Cooperation                         P0 Shows joint
                   categories                             research,
                                                          technology,
                                                          supply,
                                                          education,
                                                          content, and
                                                          global
                                                          cooperation
                                                          categories

  FR-091           Partnership form                    P0 Captures inquiry
                                                          type,
                                                          organization,
                                                          contact details,
                                                          message, and
                                                          required privacy
                                                          consent

  FR-092           Inquiry                             P0 Authorized staff
                   administration                         can view,
                                                          assign, update
                                                          status, and
                                                          export inquiries

  FR-093           Partner                             P2 Only approved
                   directory                              partners with
                                                          publication
                                                          permission can
                                                          be displayed
  ------------------------------------------------------------------------

### 6.10 CONTACT

  ------------------------------------------------------------------------
  ID               Requirement                   Priority Acceptance
                                                          criteria
  ---------------- ---------------- --------------------- ----------------
  FR-100           General inquiry                     P0 Form validates
                   form                                   required fields
                                                          and displays
                                                          clear submission
                                                          feedback

  FR-101           Inquiry                             P0 Inquiry can be
                   classification                         classified by
                                                          type

  FR-102           Spam protection                     P0 Form has rate
                                                          limiting and
                                                          appropriate
                                                          anti-spam
                                                          protection

  FR-103           Contact                             P0 Only verified
                   information                            contact
                                                          information is
                                                          displayed
  ------------------------------------------------------------------------

### 6.11 Administration

  ------------------------------------------------------------------------
  ID               Requirement                   Priority Acceptance
                                                          criteria
  ---------------- ---------------- --------------------- ----------------
  FR-110           Role-based                          P0 Admin, editor,
                   access                                 and moderator
                                                          permissions are
                                                          enforced
                                                          server-side

  FR-111           Page/content                        P0 Authorized staff
                   management                             can create,
                                                          edit, preview,
                                                          publish, and
                                                          unpublish
                                                          content

  FR-112           Business status                     P0 Authorized staff
                   management                             can update
                                                          status and
                                                          descriptions

  FR-113           Idea moderation                     P0 Moderators can
                                                          review reports
                                                          and take
                                                          documented
                                                          moderation
                                                          actions

  FR-114           Inquiry                             P0 Staff can view
                   management                             and update
                                                          inquiry status

  FR-115           Audit trail                         P1 Important
                                                          administrative
                                                          actions are
                                                          recorded with
                                                          actor and
                                                          timestamp

  FR-116           User management                     P1 Admins can
                                                          suspend or
                                                          restore accounts
                                                          according to
                                                          policy
  ------------------------------------------------------------------------

------------------------------------------------------------------------

## 7. Key user journeys

### 7.1 General visitor discovers the organization

1.  Arrives at homepage.
2.  Understands the brand statement and short company explanation.
3.  Explores five business groups.
4.  Opens a relevant business or technology detail page.
5.  Reads related insights.
6.  Submits a general or partnership inquiry if interested.

**Success condition:** visitor can understand the organization's purpose
and find a relevant next action without assistance.

### 7.2 User submits a public idea

1.  Opens SPACE IDEAS.
2.  Reviews community rules and IP/public-disclosure notice.
3.  Creates an account or signs in.
4.  Opens idea submission form.
5.  Selects category and enters title/description.
6.  Selects public display name or anonymous display.
7.  Accepts required terms and submits.
8.  Sees confirmation that the idea is pending review or published,
    according to moderation policy.
9.  Receives a status update if the product supports notifications.

**Success condition:** user understands what will be public, what rights
they retain, and whether the submission is awaiting moderation.

### 7.3 Moderator reviews an idea

1.  Moderator opens the moderation queue.
2.  Reviews the post and any reports.
3.  Approves, hides, rejects, or removes the content.
4.  Records a reason where required.
5.  User-facing status is updated.
6.  Relevant audit record is retained.

**Success condition:** moderation is consistent, traceable, and
explainable.

### 7.4 Organization submits a partnership proposal

1.  Opens PARTNERSHIP.
2.  Reviews cooperation types.
3.  Selects inquiry type.
4.  Enters organization and contact information.
5.  Provides proposal details and privacy consent.
6.  Submits the form.
7.  Receives confirmation.
8.  Authorized staff reviews and follows up through the approved
    process.

**Success condition:** the inquiry is delivered to an authorized
recipient and can be tracked internally.

------------------------------------------------------------------------

## 8. Content model and data entities

The following is a conceptual data model. Final schema depends on the
selected backend.

### 8.1 Core entities

**Page** - id - slug - title - summary - body/content blocks - status
(draft/published) - SEO title/description - created_at - updated_at -
published_at - author_id

**BusinessGroup** - id - slug - title - summary - description -
display_order - status

**BusinessActivity** - id - business_group_id - title - description -
activity_status - evidence_or_internal_reference (internal only, if
needed) - display_order - updated_at

**TechnologyTopic** - id - slug - title - summary - problem_statement -
relevance - status - limitations - collaboration_needs - published_at

**Article** - id - slug - title - excerpt - body - category_id -
cover_image - author_id - status - published_at - updated_at

**User** - id - email or authentication identifier - display_name -
role - account_status - created_at - updated_at

**Idea** - id - author_id - category - title - description -
display_mode - moderation_status - terms_version -
privacy_notice_version - follow_up_consent - created_at - updated_at -
published_at

**Comment** - id - idea_id - author_id - body - moderation_status -
created_at - updated_at

**Report** - id - reporter_id (nullable if anonymous reporting is
supported) - target_type - target_id - reason - details - status -
created_at - resolved_by - resolved_at

**Inquiry** - id - inquiry_type - organization - contact_name - email -
phone (optional) - message - privacy_consent_version - status -
assigned_to - created_at - updated_at

**ModerationAction** - id - moderator_id - target_type - target_id -
action - reason - created_at

**Attachment** - id - owner_id - target_type - target_id - storage_key -
file_name - mime_type - file_size - scan_status - created_at

### 8.2 Data and privacy principles

-   Collect the minimum personal data required.
-   Separate public display names from private account identifiers.
-   Restrict access to inquiry contact details.
-   Define retention and deletion rules before launch.
-   Do not expose private drafts, pending ideas, reports, or internal
    moderation notes through public APIs.
-   Validate and scan uploaded files.
-   Record consent version and timestamp where consent is required.
-   Provide a process for account/content deletion requests consistent
    with applicable law and retention obligations.

------------------------------------------------------------------------

## 9. Non-functional requirements

### 9.1 Performance

-   Optimize images and serve responsive variants.
-   Lazy-load below-the-fold images and media.
-   Avoid blocking the initial render with unnecessary scripts.
-   Establish a performance budget before launch.
-   Target good Core Web Vitals under representative real-world
    conditions; verify with field data after launch.

### 9.2 Security

-   Enforce authorization on the server.
-   Use secure authentication and session handling.
-   Protect forms and public endpoints with rate limits and spam
    controls.
-   Validate and sanitize user-generated content.
-   Escape rendered user content to prevent script injection.
-   Restrict file types and sizes; scan uploaded files where feasible.
-   Store secrets only in server-side environment variables.
-   Use HTTPS in production.
-   Maintain backups and a recovery procedure.
-   Log security-relevant administrative actions.

### 9.3 Reliability and operations

-   Provide error, empty, loading, and success states.
-   Monitor uptime and application errors.
-   Back up database and uploaded content.
-   Document deployment and rollback procedures.
-   Define an owner for moderation and inquiry handling before launch.

### 9.4 Accessibility

-   Target WCAG 2.2 AA.
-   Support keyboard navigation and visible focus.
-   Maintain adequate contrast and scalable text.
-   Provide accessible labels and error messages.
-   Respect reduced-motion preferences.

### 9.5 SEO

-   Unique metadata for public pages.
-   Descriptive URL slugs.
-   Sitemap and robots configuration.
-   Canonical URLs where needed.
-   Structured data only when factually applicable.
-   Do not index private, draft, pending, or restricted user content.

### 9.6 Localization

-   Korean is the launch language.
-   Design components to support longer English labels and text.
-   Do not hard-code text into images.
-   Phase 2 English release requires translation review, not raw machine
    translation alone.

------------------------------------------------------------------------

## 10. Analytics and KPIs

Initial targets are hypotheses, not forecasts. Reassess after collecting
baseline data for 4--8 weeks.

  ---------------------------------------------------------------------------
  Metric                          Initial hypothesis Measurement
  --------------------- ---------------------------- ------------------------
  Monthly unique                               1,000 Analytics
  visitors                                           

  Business page views                      300/month Page events

  Partnership/contact                       10/month Submitted valid forms
  inquiries                                          

  Inquiry conversion                              2% Valid inquiries /
  rate                                               relevant sessions

  Published insights                         4/month CMS

  Public idea               Establish baseline first Approved submissions
  submissions                                        

  Idea moderation             Define operational SLA Submission-to-decision
  turnaround                           before launch time

  Form completion rate      Establish baseline first Completed / started
                                                     forms
  ---------------------------------------------------------------------------

### Required events

-   `hero_primary_cta_click`
-   `hero_space_ideas_click`
-   `business_group_view`
-   `insight_open`
-   `partnership_form_start`
-   `partnership_form_submit`
-   `contact_form_submit`
-   `idea_submit_start`
-   `idea_submit_success`
-   `idea_comment_submit`
-   `idea_report_submit`

Analytics must respect the privacy notice and any applicable consent
requirements.

------------------------------------------------------------------------

## 11. Operational requirements

The platform is not complete merely because the software works. Public
participation requires an operating process.

Before enabling public idea submissions, assign: - A community owner. -
A moderator or moderation rotation. - A response process for reports. -
A content removal/escalation policy. - An inquiry owner and response
workflow. - A process for requests involving confidential information or
potential IP.

Suggested initial operating rhythm: - Publish one focused discussion
prompt each week. - Review new submissions on a defined schedule. -
Publish a monthly summary of selected discussions, with author
permission where needed. - Do not promise that ideas will be reviewed
for commercialization unless staff capacity and criteria exist.

------------------------------------------------------------------------

## 12. Risks and mitigations

  -----------------------------------------------------------------------
  Risk                    Impact                  Mitigation
  ----------------------- ----------------------- -----------------------
  Business scope appears  Visitors may not        Lead with five clear
  too broad               understand the core     groups and identify
                          focus                   current priorities

  Aspirations mistaken    Loss of trust and       Use explicit
  for current capability  possible legal exposure activity-status labels
                                                  and evidence review

  Empty community at      Low engagement          Seed topics and publish
  launch                                          regular prompts

  Harmful or infringing   Legal, safety, and      Terms, moderation,
  user content            reputation risks        reporting, and
                                                  escalation process

  User assumes idea       Disputes and loss of    Plain-language IP
  ownership transfers     trust                   notice and separate
                                                  commercialization
                                                  agreement

  Public disclosure       User may lose rights or Pre-submission warning
  affects patent options  options                 and private inquiry
                                                  route

  Spam and automated      Operational burden      Authentication, rate
  submissions                                     limits, anti-spam
                                                  controls

  Unverified partner      Reputational/legal risk Require permission and
  claims                                          evidence before
                                                  publication

  Scope creep             Delayed launch and      Protect MVP scope and
                          increased cost          defer advanced features

  No owner for            Poor response and       Assign named
  inquiries/moderation    community harm          operational
                                                  responsibility before
                                                  launch
  -----------------------------------------------------------------------

------------------------------------------------------------------------

## 13. Delivery plan

Indicative schedule for a focused MVP. Actual duration depends on team
size, content readiness, integrations, and moderation requirements.

  --------------------------------------------------------------------------------------
  Stage                          Indicative duration Deliverables
  --------------------- ---------------------------- -----------------------------------
  1\. Product/content              3--5 working days Approved sitemap, content
  confirmation                                       inventory, priority business groups

  2\. UX and visual                       1--2 weeks Wireframes, responsive UI,
  design                                             component library

  3\. Core website                        2--3 weeks Homepage, About, Business,
  development                                        Technology, Ecosystem, Insights,
                                                     Partnership, Contact

  4\. Community MVP                       1--2 weeks Authentication, idea
                                                     listing/submission, moderation,
                                                     reports

  5\. QA and launch                           1 week Responsive/accessibility/security
                                                     checks, analytics, deployment
  --------------------------------------------------------------------------------------

The earlier 5--7 week estimate is a planning assumption, not a
commitment. If moderation, authentication, or content administration is
complex, the schedule may extend.

### Launch gates

Do not launch public submissions until: - Terms, privacy notice,
community rules, and IP notice are reviewed. - Moderation permissions
and process are tested. - File upload restrictions and spam controls are
active. - Inquiry and report ownership is assigned. - Public and private
content access controls are verified.

------------------------------------------------------------------------

## 14. Acceptance criteria for MVP launch

The MVP is ready for launch when:

1.  All P0 requirements are implemented and tested.
2.  The eight primary navigation areas are present, with any
    intentionally deferred sections clearly handled.
3.  The five business groups are explained accurately.
4.  Business activity status is explicit and reviewed.
5.  Public pages render correctly on mobile, tablet, and desktop.
6.  Contact and partnership forms submit successfully and reach
    authorized staff.
7.  Public idea submission requires authentication and clear terms
    acceptance.
8.  Public posts are moderated according to the chosen launch policy.
9.  Users can report content and moderators can act on reports.
10. No private user data or internal moderation information is exposed
    publicly.
11. Privacy, terms, community rules, and IP notices are accessible.
12. Analytics, backups, error monitoring, and deployment rollback are
    configured.
13. All published company details, claims, partner references, images,
    and contact information have been verified.

------------------------------------------------------------------------

## 15. Assumptions and decisions to confirm

These items are not fully specified and must be confirmed before
implementation:

1.  **Company identity:** final legal company name, public address,
    contact details, and approved company description.
2.  **Business priority:** which of the five business groups should be
    presented as the primary current focus?
3.  **31 business purposes:** final mapping of each purpose to a group
    and its actual status.
4.  **Content ownership:** who will write, review, and publish business
    and insight content?
5.  **Membership:** open registration, email verification, social login,
    or invitation-only?
6.  **Anonymous display:** whether anonymous display is permitted while
    retaining a verified account internally.
7.  **Moderation policy:** pre-moderation or post-moderation for ideas
    and comments?
8.  **Private proposals:** whether a formal NDA or confidential
    submission process will be offered.
9.  **Idea evaluation:** who reviews ideas, what criteria are used, and
    whether feedback is promised?
10. **English launch:** whether English is required at initial launch or
    deferred to Phase 2.
11. **Notifications:** email notifications for submission, comments,
    moderation results, and inquiries.
12. **Technology stack:** final framework, CMS, authentication,
    database, hosting, and analytics choices.
13. **Budget and schedule:** approved development budget, internal
    owner, and launch date.

Do not silently assume answers to these questions. Record decisions and
update this PRD before implementation.

------------------------------------------------------------------------

## 16. Product north star

HOOK INTERSTELLAR's website should help every visitor answer three
questions:

1.  **What is HOOK INTERSTELLAR trying to build?**
2.  **Which business and technology areas are currently active, planned,
    or exploratory?**
3.  **How can I participate, collaborate, or submit an idea?**

The product should be visually ambitious but factually disciplined, easy
to navigate but capable of expansion, and open to ideas without making
unsupported promises about confidentiality, ownership, or
commercialization.

**Product principle:** Build trust first. Enable participation second.
Expand the ecosystem through evidence and execution.
