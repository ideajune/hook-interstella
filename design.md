# HOOK INTERSTELLAR --- Design System

> **Document:** `design.md`\
> **Purpose:** Product and visual design specification for the HOOK
> INTERSTELLAR website\
> **Version:** 1.0\
> **Language:** Korean-first, with English brand terminology\
> **Status:** Initial implementation guide

------------------------------------------------------------------------

## 1. Brand foundation

### Brand name

**HOOK INTERSTELLAR**

### Brand statement

**새로운 우주 시대, 우리만의 항로를 개척하다.**\
*Beyond the Horizon.*

### Product positioning

HOOK INTERSTELLAR is an emerging space-industry and innovation ecosystem
connecting space technology, human survival, education, content,
intellectual property, collaboration, and public ideas.

The website must communicate two qualities at the same time:

1.  **Institutional credibility:** a clear, disciplined, technically
    literate business presence for companies, research institutions,
    investors, and partners.
2.  **Open participation:** an approachable platform where individuals,
    researchers, and organizations can explore, share questions, and
    submit ideas about the future of space.

### Design principles

-   **Credible, not speculative:** distinguish current capabilities,
    planned projects, concepts, and aspirations.
-   **Visionary, not theatrical:** use space imagery with restraint;
    avoid science-fiction clichés.
-   **Clear before clever:** explain business areas and calls to action
    in plain language.
-   **Open, but protected:** make community participation easy while
    clearly explaining privacy, moderation, and intellectual-property
    rules.
-   **Progressive disclosure:** show the main business themes first;
    reveal detailed business purposes and technical information when
    users ask for them.

### Brand personality

Confident · Exploratory · Intelligent · Precise · Collaborative · Human

### Avoid

-   Excessive neon, glowing borders, cyberpunk gradients, and decorative
    HUD graphics.
-   Generic stock images of astronauts used without context.
-   Claims that imply completed missions, proprietary technology,
    customers, certifications, or partnerships unless verified.
-   Presenting all 31 registered business purposes as equally active
    operating businesses.
-   Overloading the homepage with long paragraphs or dense technical
    data.

------------------------------------------------------------------------

## 2. Reference direction

Use the following sites as directional references, not templates to
copy.

  --------------------------------------------------------------------------------------
  Reference                              Learn from it           Do not copy blindly
  -------------------------------------- ----------------------- -----------------------
  [Vast](https://www.vastspace.com/)     Cinematic space         A hardware-company
                                         imagery, confident      narrative that may not
                                         typography, restrained  fit every HOOK business
                                         layouts, clear product  area
                                         storytelling            

  [Sierra                                Business and capability Scale claims, metrics,
  Space](https://www.sierraspace.com/)   grouping, clear         and proof points that
                                         navigation from mission HOOK has not
                                         to technologies and     independently verified
                                         infrastructure          

  [NASA JPL](https://www.jpl.nasa.gov/)  Public-facing science   Government-agency
                                         communication, mission  visual conventions or
                                         storytelling,           dense editorial
                                         educational content     navigation

  [Axiom                                 Vision-led storytelling Overly narrow focus on
  Space](https://www.axiomspace.com/)    and human spaceflight   commercial space
                                         context                 stations

  [SpaceX](https://www.spacex.com/)      Strong hero imagery,    Minimal navigation that
                                         concise headlines,      hides the breadth of a
                                         memorable calls to      multi-part ecosystem
                                         action                  
  --------------------------------------------------------------------------------------

### Recommended synthesis

-   **Visual atmosphere:** Vast
-   **Business information architecture:** Sierra Space
-   **Public knowledge and participation:** NASA JPL
-   **Vision narrative:** Axiom Space
-   **Hero impact:** SpaceX, used selectively

------------------------------------------------------------------------

## 3. Visual identity

### 3.1 Color palette

Use a deep navy foundation with restrained blue accents and generous
white space.

  -----------------------------------------------------------------------
  Token                   Hex                     Usage
  ----------------------- ----------------------- -----------------------
  `color-navy-950`        `#07182D`               Primary dark
                                                  background, footer,
                                                  hero overlays

  `color-navy-900`        `#0B2340`               Dark section surfaces

  `color-navy-800`        `#123454`               Cards on dark
                                                  backgrounds, navigation
                                                  states

  `color-blue-600`        `#147FC5`               Primary brand accent,
                                                  links, key actions

  `color-blue-500`        `#2998D6`               Hover and active states

  `color-blue-100`        `#E8F4FC`               Light blue surfaces

  `color-silver-200`      `#D9E6F2`               Borders and muted text
                                                  on dark surfaces

  `color-gray-900`        `#17212B`               Primary text on light
                                                  backgrounds

  `color-gray-600`        `#5D6B78`               Secondary text

  `color-gray-200`        `#E5EAF0`               Dividers and subtle
                                                  borders

  `color-white`           `#FFFFFF`               Main light background
                                                  and reverse text
  -----------------------------------------------------------------------

#### Color rules

-   Use navy for high-impact brand sections, not every section.
-   Use white or near-white backgrounds for long-form reading, forms,
    and community discussions.
-   Reserve bright blue for primary actions, active navigation, links,
    and selected data.
-   Do not use color alone to communicate status; pair it with text or
    an icon.
-   Maintain readable contrast for all text and controls.

### 3.2 Typography

Recommended stack:

-   Korean: `Pretendard`, then system sans-serif.
-   English and numerals: `Inter`, then system sans-serif.
-   Fallback:
    `-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`.

Typography hierarchy:

  Role                  Desktop      Mobile Weight
  ----------------- ----------- ----------- --------
  Display / hero      64--80 px   40--48 px 700
  H1                  48--56 px   34--40 px 700
  H2                  36--42 px   28--32 px 700
  H3                  24--28 px   22--24 px 600
  H4                  20--22 px   18--20 px 600
  Body large          18--20 px   17--18 px 400
  Body                16--18 px       16 px 400
  Caption             13--14 px   13--14 px 400
  Eyebrow / label     12--13 px       12 px 600

Typography rules: - Use sentence case for English headings; avoid
unnecessary all-caps body copy. - Keep paragraphs short, ideally 2--4
lines on desktop. - Use tabular numerals for metrics and technical
specifications. - Do not use ultra-light font weights on dark
backgrounds. - Ensure Korean line breaks feel natural; do not force line
breaks inside words.

### 3.3 Layout and spacing

-   Maximum content width: `1200–1280px`.
-   Wide hero/media sections may extend edge-to-edge.
-   Desktop page gutters: `48–64px`.
-   Tablet gutters: `32px`.
-   Mobile gutters: `20–24px`.
-   Use a 4px base spacing scale:
    `4, 8, 12, 16, 24, 32, 48, 64, 80, 96`.
-   Section vertical spacing: `88–120px` desktop; `56–72px` mobile.
-   Use a 12-column desktop grid and a 4-column mobile grid.
-   Keep card radii restrained: `8–16px`; use pill shapes only for tags
    and compact filters.
-   Prefer thin borders and subtle surface changes over heavy shadows.

### 3.4 Imagery and art direction

Preferred imagery: - Earth horizon, orbital infrastructure, spacecraft,
satellites, launch facilities, clean rooms, engineering teams,
scientific experiments, landscapes from orbit. - Real project
photography where permission and source attribution are confirmed. -
High-quality CGI for concepts, clearly labeled as **Concept image** or
**Illustration** when not an actual deployed asset. - Human-scale images
that show researchers, engineers, students, and collaborators.

Image treatment: - Use wide 16:9 or 2:1 imagery for hero and feature
sections. - Use consistent crops within repeated card groups. - Apply a
dark navy gradient overlay only when needed for text legibility. - Avoid
placing essential text inside images; render text as HTML. - Add
descriptive alt text. Decorative images should use empty alt text.

Image rights: - Do not download or reuse third-party reference-site
images without permission. - Use licensed stock, commissioned artwork,
owned assets, or media explicitly permitted by the rights holder. -
Preserve photographer and source credits where required.

------------------------------------------------------------------------

## 4. Information architecture

### Primary navigation

1.  **ABOUT** --- 회사 소개, 비전, 미션, 핵심 가치
2.  **BUSINESS** --- 사업 분야와 세부 사업
3.  **TECHNOLOGY** --- 기술 영역, 연구 주제, 개발 방향
4.  **ECOSYSTEM** --- 교육, 인재, 커뮤니티, 협력 네트워크
5.  **INSIGHTS** --- 뉴스, 칼럼, 리포트, 자료실
6.  **SPACE IDEAS** --- 아이디어 게시판, 토론, 공모, IDEA LAB
7.  **PARTNERSHIP** --- 기업·기관 협력 및 제휴
8.  **CONTACT** --- 일반 문의 및 사업 제안

Navigation behavior: - Sticky header after initial scroll. - Desktop:
horizontal navigation with clear active state. - Mobile: accessible menu
drawer with visible close control. - SPACE IDEAS should have a distinct
but restrained accent treatment; it must not visually overpower
BUSINESS. - Keep CONTACT accessible from the header as a button or
clearly emphasized link.

### Business grouping

Present the five business groups as a coherent portfolio:

1.  Space Technology
2.  Space Survival
3.  Talent, Education & Community
4.  Revenue & IP Development
5.  Global Network

The detailed 31 business purposes should live below these groups on the
BUSINESS page or in dedicated detail pages. Do not make the homepage a
31-item directory.

------------------------------------------------------------------------

## 5. Page design specifications

### 5.1 Homepage

Recommended section order:

1.  **Hero**
    -   Full-width cinematic image or video of Earth/orbital
        infrastructure.
    -   Brand headline: "새로운 우주 시대, 우리만의 항로를 개척하다."
    -   Supporting copy: one concise sentence explaining the ecosystem.
    -   Primary CTA: `사업 분야 살펴보기`
    -   Secondary CTA: `우주 아이디어 참여하기`
    -   Include a subtle scroll cue.
    -   Video must be muted, lightweight, and have a static fallback
        image.
2.  **Brand introduction**
    -   Explain what HOOK INTERSTELLAR is in 2--3 short paragraphs.
    -   Use one strong image and a concise mission statement.
    -   Do not imply operational scale or achievements that are not
        verified.
3.  **Business portfolio**
    -   Five cards, each with a clear title, short explanation, and
        detail link.
    -   Use simple line icons or restrained imagery.
    -   Each card should communicate a distinct user or market need.
4.  **Technology and future themes**
    -   Present selected technology themes as areas of interest,
        research, development, or collaboration.
    -   Label the status accurately: `운영 중`, `개발 중`, `연구 주제`,
        or `구상 단계` as applicable.
5.  **Ecosystem**
    -   Explain how people, companies, researchers, and educational
        organizations can participate.
    -   Use a simple ecosystem diagram or connected cards.
6.  **SPACE IDEAS feature**
    -   Invite users to share questions and ideas about space.
    -   Show a small selection of moderated public posts only.
    -   CTA: `아이디어 둘러보기` and `아이디어 등록하기`.
7.  **Insights**
    -   Display 3 recent articles or updates.
    -   Include category, publication date, title, and short summary.
8.  **Partnership CTA**
    -   Short invitation for research, technology, education, and
        business collaboration.
    -   CTA: `협력 제안하기`.
9.  **Footer**
    -   Company identity and verified company details.
    -   Main navigation, contact channels, legal/privacy links, social
        links.
    -   Do not publish unverified registration details or contact
        information.

### 5.2 ABOUT

-   Lead with the brand mission and long-term direction.
-   Include vision, mission, values, and operating principles.
-   Use a restrained timeline only when milestones are factual and
    dated.
-   Distinguish the company's current status from future ambition.
-   Avoid unsupported claims such as "world-leading," "first," or
    "proprietary" without evidence.

### 5.3 BUSINESS

-   Start with an overview of the five business groups.
-   Each group card contains: title, customer problem, proposed value,
    relevant activities, and status.
-   Detail pages may include:
    -   Overview
    -   Customer/use case
    -   Products or services (only if actually offered)
    -   Development or collaboration status
    -   Related insights
    -   Inquiry CTA
-   Present the 31 registered purposes as a structured reference, not
    proof that every activity is currently operational.
-   Use a consistent status label system and explain each status.

### 5.4 TECHNOLOGY

-   Organize topics by technology domain rather than by broad marketing
    claims.
-   Each topic page should state:
    -   What problem the technology addresses
    -   Why it matters
    -   Current maturity/status
    -   Known limitations or dependencies
    -   Potential collaboration needs
-   Do not publish confidential technical details or unverified
    performance figures.
-   Clearly label conceptual diagrams and illustrative renderings.

### 5.5 ECOSYSTEM

-   Show participation paths for individuals, students, researchers,
    companies, and institutions.
-   Use a simple diagram to explain how education, content, community,
    research, and collaboration connect.
-   Provide clear next actions for each audience.
-   Avoid suggesting a formal partner network exists unless partner
    participation is confirmed.

### 5.6 INSIGHTS

-   Editorial layout with readable line length and generous whitespace.
-   Categories: News, Research & Technology, Space Industry, Education,
    Opinion, Reports.
-   Article cards show category, date, title, excerpt, and optional
    image.
-   Article detail pages include author, publication/update date,
    contents navigation for long articles, source links, and related
    posts.
-   Cite external facts and distinguish opinion from verified reporting.

### 5.7 SPACE IDEAS

Purpose: a moderated public idea and discussion area for space-related
questions, proposals, and concepts.

Subsections: - **IDEA BOARD:** submit and browse ideas. -
**DISCUSSION:** questions and topic-based conversations. - **IDEA
CHALLENGE:** time-limited themed challenges. - **IDEA LAB:** selected
ideas considered for further review or collaboration.

Idea card: - Category - Title - Short description - Author display name
or anonymous label - Posted date - Comment count - Status tag, if
applicable

Idea submission form: - Category - Title - Description - Optional
attachment - Public display name / anonymous display choice - Required
agreement to community rules and privacy notice - Separate, optional
consent for follow-up contact

Community safeguards: - Require clear terms before submission. - Explain
whether posts are public and searchable. - Provide report, block, and
moderation mechanisms. - Do not promise confidentiality for public
posts. - Do not claim that submission transfers ownership of an idea. -
If the company wishes to evaluate or commercialize an idea, obtain
separate, explicit consent and use a separate agreement. - Provide a
warning that public disclosure may affect patent novelty; encourage
users to seek qualified IP advice before posting potentially patentable
details. - Provide a private contact route for confidential proposals,
but do not describe it as an NDA-protected channel unless an NDA process
is actually implemented. - Establish rules for personal information,
unlawful content, spam, harassment, and third-party IP infringement.

MVP recommendation: - Launch with account/identity handling, idea
submission, public listing, comments, reporting, and administrator
moderation. - Add challenges, voting, expert review, and IDEA LAB
workflows only after moderation and community operations are
resourced. - Seed the community with recurring, specific questions from
the operator; do not assume user-generated activity will appear
automatically.

### 5.8 PARTNERSHIP

-   Present collaboration types: joint research, technology exchange,
    product/supply cooperation, education, content, and global business.
-   Explain what information is useful in an inquiry.
-   Provide a structured form with inquiry type, organization, contact,
    message, and privacy consent.
-   Avoid publicizing partner logos or names without permission.

### 5.9 CONTACT

-   Separate general inquiries from partnership and idea-related
    inquiries.
-   Use clear form validation and success/error states.
-   Collect only information needed to respond.
-   Display verified contact information and expected response guidance
    only if operationally supported.

------------------------------------------------------------------------

## 6. Components and interaction patterns

### Header

-   Transparent over the hero if contrast remains sufficient; transition
    to solid navy or white on scroll.
-   Logo links to homepage.
-   Active page is indicated by both color and a non-color cue.
-   Keyboard focus must remain visible.

### Buttons

-   Primary: blue fill, white text.
-   Secondary: transparent or white surface with border.
-   Tertiary: text link with arrow icon.
-   Minimum interactive target: 44 × 44px.
-   Include hover, focus-visible, pressed, disabled, and loading states.
-   Button labels should describe the action, not use vague text such as
    "Click here."

### Cards

-   Consistent image ratio and internal spacing within each card group.
-   Entire card may be clickable only when it has one clear destination.
-   Do not nest interactive buttons inside a clickable card.
-   Hover movement should be subtle (e.g. 2--4px lift); respect
    reduced-motion settings.

### Forms

-   Always show visible labels; placeholders are supplementary.
-   Explain required fields.
-   Show inline validation close to the relevant field.
-   Preserve entered data when validation fails.
-   Provide a clear submission confirmation and next step.
-   Do not collect sensitive or unnecessary personal information.

### Filters and search

-   Use visible selected states.
-   Provide a clear reset action.
-   Support keyboard operation.
-   On mobile, filters may open in a drawer or expandable panel.

### Status labels

Use text labels, not color alone: - `운영 중` - `개발 중` -
`연구 주제` - `구상 단계` - `협력 모집 중` - `종료`

Only assign a status after internal confirmation.

------------------------------------------------------------------------

## 7. Responsive behavior

Breakpoints (guidelines; adapt to the implementation framework):

  Name                Width
  --------- ---------------
  Mobile          `< 640px`
  Tablet       `640–1023px`
  Desktop     `1024–1439px`
  Wide           `≥ 1440px`

Rules: - Mobile-first implementation. - Collapse desktop navigation into
a menu drawer on small screens. - Stack multi-column sections vertically
on mobile. - Keep hero text readable and CTA buttons easy to tap. -
Avoid background video on low-power/mobile contexts; use a static image
fallback. - Ensure tables become horizontally scrollable or convert to
stacked cards. - Keep forms single-column on mobile. - Do not hide
essential information behind hover-only interactions.

------------------------------------------------------------------------

## 8. Motion and transitions

Motion should support orientation and hierarchy, not become decoration.

Allowed: - Short opacity/transform transitions. - Subtle image parallax
in selected hero/feature areas. - Gentle reveal animations for section
entrances. - Small interaction feedback on cards and buttons.

Guidelines: - Typical duration: 160--280ms. - Use restrained easing. -
Avoid continuous starfields, spinning planets, excessive particle
effects, and large scroll-jacking animations. - Respect
`prefers-reduced-motion`. - All content must remain available if
animation fails or is disabled.

------------------------------------------------------------------------

## 9. Accessibility and usability

Target: WCAG 2.2 AA as the implementation goal.

-   Semantic heading hierarchy and landmarks.
-   Keyboard-accessible navigation, dialogs, menus, and forms.
-   Visible focus indicators.
-   Sufficient text and UI contrast.
-   Descriptive link text and image alt text.
-   Form errors announced clearly to assistive technology.
-   Captions or transcripts for meaningful video/audio.
-   No information conveyed by color alone.
-   Respect reduced motion and browser zoom.
-   Ensure Korean and English content are readable with appropriate
    language attributes.

------------------------------------------------------------------------

## 10. Content and trust rules

The website must be ambitious in vision and conservative in factual
claims.

-   Separate verified facts, current operations, plans, concepts, and
    proposals.
-   Do not fabricate customers, partners, certifications, patents,
    funding, mission results, technical specifications, or revenue.
-   Do not imply that all listed business purposes are active services.
-   Use evidence and dates for milestones and performance claims.
-   Label concept art and illustrative images.
-   Publish editorial corrections and update dates where relevant.
-   Keep privacy policy, terms of use, community rules, and IP notices
    accessible.

Suggested copy tone: - Clear, intelligent, optimistic, and grounded. -
Avoid grandiose claims and excessive jargon. - Explain technical terms
when addressing general audiences. - Use action-oriented CTAs with a
clear benefit.

------------------------------------------------------------------------

## 11. Technical implementation guidance

Suggested implementation stack (not mandatory): - Frontend: Next.js or
another maintainable React framework. - Styling: Tailwind CSS or CSS
variables/design tokens. - Content: headless CMS or a simple
admin-managed content model. - Database/authentication: managed
PostgreSQL and authentication service if community features are
enabled. - Hosting: a reliable managed hosting platform. - Analytics:
privacy-conscious analytics configured with appropriate consent and
disclosure.

Implementation requirements: - Centralize color, typography, spacing,
radius, and shadow tokens. - Build reusable components for navigation,
cards, tags, buttons, forms, and content sections. - Optimize images and
use responsive image sizes. - Lazy-load below-the-fold media. - Provide
metadata, Open Graph tags, sitemap, robots rules, and canonical URLs. -
Include basic spam protection and rate limits for public submissions. -
Use role-based admin permissions for moderation. - Keep secrets and API
keys out of client-side code. - Provide loading, empty, error, and
success states for dynamic content.

------------------------------------------------------------------------

## 12. SEO and content discoverability

-   Use one clear H1 per page.
-   Write unique page titles and meta descriptions.
-   Use descriptive, human-readable URLs.
-   Add structured data only where it accurately represents the page.
-   Create internal links between business areas, insights, and related
    ideas.
-   Make public SPACE IDEAS content indexable only if moderation,
    privacy, and user consent policies support public indexing.
-   Prevent private, draft, or user-restricted content from being
    indexed.

------------------------------------------------------------------------

## 13. Quality assurance checklist

### Brand and visual design

-   [ ] The site feels like a credible space innovation organization,
    not a game or sci-fi fan site.
-   [ ] Navy, blue, silver, and white are used consistently.
-   [ ] Typography hierarchy is clear in Korean and English.
-   [ ] Images have appropriate licenses and accurate captions.
-   [ ] Visual effects do not interfere with reading or performance.

### Information architecture

-   [ ] All eight primary navigation areas are represented.
-   [ ] The five business groups are easy to understand.
-   [ ] Detailed business purposes are organized without overwhelming
    the homepage.
-   [ ] Current activities and future concepts are clearly
    distinguished.

### SPACE IDEAS

-   [ ] Submission rules and privacy notice are visible before posting.
-   [ ] Public and anonymous display choices are explained accurately.
-   [ ] Reporting and moderation are available.
-   [ ] IP ownership and commercialization are not misrepresented.
-   [ ] Potentially patentable disclosure receives an appropriate
    warning.

### Responsive and accessibility

-   [ ] Mobile, tablet, desktop, and wide layouts are checked.
-   [ ] Keyboard navigation works.
-   [ ] Focus states are visible.
-   [ ] Contrast and text resizing are checked.
-   [ ] Reduced-motion preferences are respected.
-   [ ] Forms provide accessible validation and feedback.

### Trust and performance

-   [ ] No unsupported claims or invented proof points appear.
-   [ ] All contact and company information is verified.
-   [ ] Images and video are optimized.
-   [ ] Loading, empty, error, and success states are designed.
-   [ ] Privacy, terms, and community policies are linked in the footer.

------------------------------------------------------------------------

## 14. Final design direction

**HOOK INTERSTELLAR should look like a serious gateway to the emerging
space economy: visually ambitious, structurally clear, and open to
participation.**

The first impression should inspire exploration. The business pages
should establish credibility. The SPACE IDEAS area should make
participation feel safe, useful, and understandable.

The design succeeds when visitors can quickly answer three questions:

1.  What is HOOK INTERSTELLAR trying to build?
2.  Which business or knowledge areas does it actually work on?
3.  How can I participate, collaborate, or submit an idea?

**Design north star:** *Beyond the Horizon --- grounded in reality, open
to possibility.*
