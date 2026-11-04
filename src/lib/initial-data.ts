import { DatabaseSchema } from "./types";

export const INITIAL_DB: DatabaseSchema = {
  users: [
    {
      id: "user-admin",
      email: "admin@hookinterstellar.local",
      passwordHash: "admin1234",
      displayName: "총괄 관리자",
      organization: "후크인터스텔라(주)",
      role: "admin",
      accountStatus: "active",
      createdAt: "2026-10-08T09:00:00Z",
    },
    {
      id: "user-member-1",
      email: "researcher@example.com",
      passwordHash: "member1234",
      displayName: "김서연 연구원",
      organization: "성층권 대기과학 연구모임",
      role: "member",
      accountStatus: "active",
      createdAt: "2026-10-20T11:30:00Z",
    },
    {
      id: "user-member-2",
      email: "pioneer@example.com",
      passwordHash: "member1234",
      displayName: "이준호 엔지니어",
      organization: "극한환경 장비 개발팀",
      role: "member",
      accountStatus: "active",
      createdAt: "2026-10-25T15:10:00Z",
    },
  ],

  businessGroups: [
    {
      id: "bg-1",
      slug: "space-technology",
      codeRange: "제1조 ~ 제7조",
      titleEn: "Space Technology",
      titleKo: "우주 기술 및 운송·관측 연구",
      summary:
        "고고도 풍선 기반 운송체, 소형 발사체, 탑재체 운용 및 우주항법·추진 기술 등 효율적인 우주 접근 경로를 연구·개발합니다.",
      description:
        "기존의 거대하고 고비용 중심인 우주 개발 방식에서 벗어나, 고고도 성층권 풍선 실험과 소형 탑재체 운용 등 현실적이고 기민한 방식으로 고고도 및 우주 환경 접근 기술을 탐구합니다. 단순 하드웨어 제조를 넘어 실험·관측·측정 데이터를 확보하는 연구 기반을 지향합니다.",
      customerProblem:
        "초기 우주·고고도 환경 실험은 막대한 발사 비용과 긴 대기 시간, 복잡한 규제로 인해 중소 연구팀이나 교육·기술 기업이 접근하기 어렵습니다.",
      proposedValue:
        "고고도 풍선 및 경량 탑재체 플랫폼 연구를 통해 성층권 및 근우주 환경 실험의 진입 장벽을 낮추고, 단계적인 항법·추진 기술 연구를 수행합니다.",
      collaborationAreas: [
        "고고도 과학 풍선 및 성층권 실험 탑재체 공동 시험",
        "초소형 센서·통신·관측 장비의 고고도 환경 검증",
        "우주항법 알고리즘 및 차세대 추진 기초 연구 협력",
      ],
      primaryStatus: "연구 주제",
      displayOrder: 1,
    },
    {
      id: "bg-2",
      slug: "space-survival",
      codeRange: "제8조 ~ 제15조",
      titleEn: "Space Survival",
      titleKo: "우주 생존 기술 및 극한환경 솔루션",
      summary:
        "특수보호복, 우주식품·비상식량, 폐쇄형 생태계 제어, 생체시료 보관 및 극한환경 생존훈련 등 인간의 생존을 지키는 기술을 다룹니다.",
      description:
        "우주는 낭만적인 탐험의 대상이기에 앞서 진공, 극저온, 방사선이 존재하는 극한의 환경입니다. HOOK INTERSTELLAR는 지상 재난·극한환경에서도 즉시 활용 가능한 보호장비, 장기보존 비상식량, 폐쇄형 농·축산 모듈 및 생존 교육 체계를 연구하고 기획합니다.",
      customerProblem:
        "우주 및 지상의 재난·극한 환경에서는 제한된 자원과 고립된 조건 속에서 인체를 보호하고 식량·생태계를 유지할 고신뢰성 생존 기술이 필수적입니다.",
      proposedValue:
        "지상 아웃도어·재난 대응과 미래 우주 거주 환경을 연결하는 Dual-Use(양용) 생존 용품, 비상식량, 폐쇄형 생태계 제어 개념 및 생존 훈련 프로그램을 기획합니다.",
      collaborationAreas: [
        "기능성 단열·방호 소재 및 특수보호장비 시제품 공동 기획",
        "장기보존 식품·비상식량 영양 설계 및 패키징 협력",
        "밀폐형 식물재배(스마트팜) 및 생태계 제어 모듈 연구",
      ],
      primaryStatus: "연구 주제",
      displayOrder: 2,
    },
    {
      id: "bg-3",
      slug: "education-community",
      codeRange: "제16조 ~ 제24조",
      titleEn: "Talent, Education & Community",
      titleKo: "인재 양성, 콘텐츠 및 커뮤니티 플랫폼",
      summary:
        "과학·기술 교육과 출판, 온라인 플랫폼, 생존장비 커머스, 전시·행사 및 공유주거 커뮤니티를 통해 우주 개척 생태계의 인재와 대중을 연결합니다.",
      description:
        "우주 시대의 도전은 소수의 전문가만으로 완성되지 않습니다. 출판과 디지털 콘텐츠로 비전을 확산하고, 온라인 플랫폼과 오프라인 코리빙·훈련 공간 구상을 통해 연구자·창작자·도전자가 교류하는 기반을 만듭니다.",
      customerProblem:
        "우주산업과 과학기술에 관심 있는 대중, 학생, 신진 연구자들이 지식을 나누고 실제 프로젝트나 커뮤니티에 참여할 수 있는 개방형 접점이 부족합니다.",
      proposedValue:
        "출판·콘텐츠 기획과 온라인 아이디어 플랫폼(SPACE IDEAS)을 운영하고, 체험형 과학·생존 교육 및 공유형 연구·생활 공간 모델을 단계적으로 구축합니다.",
      collaborationAreas: [
        "우주·과학기술 도서 출판 및 디지털 교육 콘텐츠 공동 제작",
        "우주생존 체험 교육 커리큘럼 및 과학 전시·포럼 기획",
        "휴대용 생존장비·아웃도어 과학 굿즈 기획 및 유통",
      ],
      primaryStatus: "운영 중",
      displayOrder: 3,
    },
    {
      id: "bg-4",
      slug: "revenue-ip",
      codeRange: "제25조 ~ 제28조",
      titleEn: "Revenue & IP Development",
      titleKo: "R&D 사업화, 컨설팅 및 지식재산권(IP)",
      summary:
        "우주·과학기술 컨설팅, 연구개발 프로젝트 기획·관리, 지식재산권(IP) 개발·라이선싱 및 국내외 산학연 기술협력을 추진합니다.",
      description:
        "지속 가능한 연구와 탐사를 위해서는 명확한 수익 모델과 지식재산 전략이 필요합니다. 연구개발 과정에서 도출되는 기술·디자인·브랜드 IP를 체계화하고, 국내외 기업·연구소와의 공동 R&D 및 기술 사업화를 지원합니다.",
      customerProblem:
        "우주 및 첨단 과학기술 분야의 초기 연구 성과가 실제 산업 현장의 제품이나 라이선스 수익 모델로 연결되지 못하고 단절되는 경우가 많습니다.",
      proposedValue:
        "R&D 기획 단계부터 지상 산업 적용 가능성(스핀오프)과 IP 라이선스 구조를 설계하고, 산학연 파트너 간 공동 연구개발 매칭을 지원합니다.",
      collaborationAreas: [
        "우주·극한환경 기술의 지상 산업 스핀오프(Spin-off) 기획 컨설팅",
        "기능성 소재·장비·콘텐츠 지식재산권(IP) 공동 출원 및 라이선싱",
        "국내외 대학·연구소·기업 간 공동 R&D 컨소시엄 구성",
      ],
      primaryStatus: "협력 모집 중",
      displayOrder: 4,
    },
    {
      id: "bg-5",
      slug: "global-network",
      codeRange: "제29조 ~ 제31조",
      titleEn: "Global Network",
      titleKo: "글로벌 네트워크, 교역 및 전략적 투자",
      summary:
        "국내외 우주·과학기술 스타트업 투자, 부품·장비 수출입 및 미래 신규 우주 비즈니스 확장을 위한 글로벌 연합 체계를 지향합니다.",
      description:
        "단일 조직이 모든 우주 기술을 독점하기보다, 각자의 전문성을 가진 국내외 기술 기업·스타트업과 연대하여 유연한 연합 생태계를 구축하고자 합니다. 글로벌 부품·장비 교역과 전략적 투자, 그리고 미래 우주 시대의 새로운 사업 기회를 포착합니다.",
      customerProblem:
        "개별 스타트업이나 소규모 기술 기업이 독자적으로 글로벌 공급망을 확보하고 복합적인 우주·극한환경 시장을 개척하기에는 자원과 네트워크의 한계가 큽니다.",
      proposedValue:
        "유망 기술 팀과의 전략적 협력·투자 검토 및 글로벌 기술·부품 교역 네트워크를 통해 상호 보완적인 우주산업 밸류체인을 구축합니다.",
      collaborationAreas: [
        "국내외 우주·극한환경·생명과학 초기 스타트업 발굴 및 협력",
        "연구용 장비·센서·특수 소재의 글로벌 소싱 및 수출입 협력",
        "미래 우주 경제 관련 신규 융합 비즈니스 모델 공동 발굴",
      ],
      primaryStatus: "구상 단계",
      displayOrder: 5,
    },
  ],

  businessActivities: [
    // Group 1: Space Technology (1~7)
    {
      id: "ba-1",
      codeNumber: 1,
      groupSlug: "space-technology",
      title: "우주산업, 우주기술 및 우주탐사 관련 연구개발업",
      description:
        "민간 주도의 우주 접근성 확대를 위한 기초 우주기술 및 탐사 임무 개념을 연구합니다.",
      activityStatus: "연구 주제",
      updatedAt: "2026-10-08",
    },
    {
      id: "ba-2",
      codeNumber: 2,
      groupSlug: "space-technology",
      title: "우주선, 발사체, 우주운송체 및 관련 장비의 연구개발업",
      description:
        "소형·경량 발사체 및 우주운송체 구성을 위한 구조·장비 개념 설계를 다룹니다.",
      activityStatus: "구상 단계",
      updatedAt: "2026-10-08",
    },
    {
      id: "ba-3",
      codeNumber: 3,
      groupSlug: "space-technology",
      title: "고고도 풍선 및 풍선 이용 발사체 등 고고도 운송체의 연구개발 및 실험사업",
      description:
        "성층권 고고도 풍선을 활용한 저비용 근우주 도달 실험 및 공중 발사 개념을 중점 연구 주제로 탐구합니다.",
      activityStatus: "연구 주제",
      updatedAt: "2026-10-08",
    },
    {
      id: "ba-4",
      codeNumber: 4,
      groupSlug: "space-technology",
      title: "우주 및 고고도 환경용 탑재체의 연구개발, 제작 및 운용사업",
      description:
        "고고도 및 극한 대기 환경에서 작동하는 센서, 카메라, 통신 모듈 등 경량 탑재체 구성을 연구합니다.",
      activityStatus: "연구 주제",
      updatedAt: "2026-10-08",
    },
    {
      id: "ba-5",
      codeNumber: 5,
      groupSlug: "space-technology",
      title: "우주 및 고고도 환경에서의 실험·관측·측정 사업",
      description:
        "성층권 및 고고도 환경에서 기상, 방사선, 대기 데이터를 관측·측정하는 실험 과제를 기획합니다.",
      activityStatus: "협력 모집 중",
      updatedAt: "2026-10-08",
    },
    {
      id: "ba-6",
      codeNumber: 6,
      groupSlug: "space-technology",
      title: "우주운송 및 우주화물 관련 사업",
      description:
        "장기적 관점에서 소형 과학 화물 및 연구 시료의 고고도·궤도 수송 서비스 모델을 구상합니다.",
      activityStatus: "구상 단계",
      updatedAt: "2026-10-08",
    },
    {
      id: "ba-7",
      codeNumber: 7,
      groupSlug: "space-technology",
      title: "우주항법 및 우주추진 기술의 연구·개발업",
      description:
        "독립적인 궤도·자세 제어 항법 알고리즘 및 고효율 소형 추진 시스템 기초 기술을 연구합니다.",
      activityStatus: "연구 주제",
      updatedAt: "2026-10-08",
    },

    // Group 2: Space Survival (8~15)
    {
      id: "ba-8",
      codeNumber: 8,
      groupSlug: "space-survival",
      title: "생체시료 및 생명과학 관련 연구개발 및 보관·운송사업",
      description:
        "극한 환경에서의 생체시료 안정성 유지 및 저온·특수 보관·운송 프로토콜을 연구합니다.",
      activityStatus: "구상 단계",
      updatedAt: "2026-10-08",
    },
    {
      id: "ba-9",
      codeNumber: 9,
      groupSlug: "space-survival",
      title: "우주 및 고고도 환경을 활용한 생명과학·생명공학 관련 연구개발사업",
      description:
        "미세중력·고방사선·저압 환경이 생체 및 미생물·식물에 미치는 영향을 분석하는 연구 주제를 다룹니다.",
      activityStatus: "연구 주제",
      updatedAt: "2026-10-08",
    },
    {
      id: "ba-10",
      codeNumber: 10,
      groupSlug: "space-survival",
      title: "우주생존기술 및 극한환경용 장비·기기·부품의 개발·제조·판매업",
      description:
        "극저온·저압·고립 환경에서 작동 신뢰성을 확보하는 생존 장비 및 부품 사양을 연구합니다.",
      activityStatus: "연구 주제",
      updatedAt: "2026-10-08",
    },
    {
      id: "ba-11",
      codeNumber: 11,
      groupSlug: "space-survival",
      title: "우주생존용품 및 재난·재해 대응 용품의 개발·제조·판매업",
      description:
        "우주 생존 기술 개념을 지상 재난·재해 대비 비상 생존 키트에 적용하는 제품을 기획합니다.",
      activityStatus: "개발 중",
      updatedAt: "2026-10-08",
    },
    {
      id: "ba-12",
      codeNumber: 12,
      groupSlug: "space-survival",
      title: "특수보호복 및 기능성 보호장비의 개발·제조·판매업",
      description:
        "단열·방풍·방호 성능을 강화한 기능성 보호 의류 및 극한환경 착용 장비를 연구·기획합니다.",
      activityStatus: "연구 주제",
      updatedAt: "2026-10-08",
    },
    {
      id: "ba-13",
      codeNumber: 13,
      groupSlug: "space-survival",
      title: "우주식품·비상식량 및 장기보존 식품 관련 제품의 개발·제조·판매업",
      description:
        "최소 부피로 고열량·균형 영양을 제공하고 장기 보관이 가능한 비상식량·우주식품 포맷을 연구합니다.",
      activityStatus: "연구 주제",
      updatedAt: "2026-10-08",
    },
    {
      id: "ba-14",
      codeNumber: 14,
      groupSlug: "space-survival",
      title: "폐쇄형 생태계 제어 장치 및 모듈형 농·축산 기기의 기획·제조·판매업",
      description:
        "외부 자원 공급이 제한된 공간에서 물·공기·작물을 순환 재배하는 폐쇄형 스마트 농장 모듈을 연구합니다.",
      activityStatus: "연구 주제",
      updatedAt: "2026-10-08",
    },
    {
      id: "ba-15",
      codeNumber: 15,
      groupSlug: "space-survival",
      title: "우주생존훈련 및 극한환경 생존교육 사업",
      description:
        "고립·재난·극한 환경에서의 위기 대처 능력과 팀워크를 기르는 생존 교육 커리큘럼을 기획합니다.",
      activityStatus: "구상 단계",
      updatedAt: "2026-10-08",
    },

    // Group 3: Talent, Education & Community (16~24)
    {
      id: "ba-16",
      codeNumber: 16,
      groupSlug: "education-community",
      title: "과학·기술·공학 관련 교육 및 체험 사업",
      description:
        "고고도 과학 실험, 우주 생존 원리 등을 주제로 한 참여형 STEM 교육 및 체험 프로그램을 기획합니다.",
      activityStatus: "구상 단계",
      updatedAt: "2026-10-08",
    },
    {
      id: "ba-17",
      codeNumber: 17,
      groupSlug: "education-community",
      title: "공유주거 등 주거공간 및 생활공간의 임대·관리·운영사업",
      description:
        "우주·과학기술 연구자와 창작자들이 함께 거주하며 교류하는 커뮤니티형 베이스캠프 공간을 구상합니다.",
      activityStatus: "구상 단계",
      updatedAt: "2026-10-08",
    },
    {
      id: "ba-18",
      codeNumber: 18,
      groupSlug: "education-community",
      title: "우주생존훈련실의 개발·운영 및 임대사업",
      description:
        "극한환경 시뮬레이션 및 생존 실습을 수행할 수 있는 전용 훈련 공간 모델과 외부 개방·임대 방안을 구상합니다.",
      activityStatus: "구상 단계",
      updatedAt: "2026-10-08",
    },
    {
      id: "ba-19",
      codeNumber: 19,
      groupSlug: "education-community",
      title: "우주 및 과학기술 관련 콘텐츠의 기획·제작·유통사업",
      description:
        "우주산업 트렌드, 과학기술 칼럼, 연구 리포트 등 대중과 전문가를 잇는 디지털 콘텐츠를 제작합니다.",
      activityStatus: "운영 중",
      updatedAt: "2026-10-08",
    },
    {
      id: "ba-20",
      codeNumber: 20,
      groupSlug: "education-community",
      title: "출판업 및 전자출판업",
      description:
        "우주 비전과 과학기술 문화를 담은 도서 및 전자책을 기획·출판합니다.",
      activityStatus: "운영 중",
      updatedAt: "2026-10-08",
    },
    {
      id: "ba-21",
      codeNumber: 21,
      groupSlug: "education-community",
      title: "인터넷 및 온라인 플랫폼 운영사업",
      description:
        "공식 웹사이트 및 대중 참여형 우주 아이디어 플랫폼(SPACE IDEAS)을 운영하여 오픈 이노베이션을 촉진합니다.",
      activityStatus: "운영 중",
      updatedAt: "2026-10-08",
    },
    {
      id: "ba-22",
      codeNumber: 22,
      groupSlug: "education-community",
      title: "전자상거래 및 통신판매업",
      description:
        "출판물, 과학기술 키트, 생존·아웃도어 용품 등을 온라인으로 유통하기 위한 커머스 기반을 준비합니다.",
      activityStatus: "개발 중",
      updatedAt: "2026-10-08",
    },
    {
      id: "ba-23",
      codeNumber: 23,
      groupSlug: "education-community",
      title: "과학기술 관련 상품, 휴대용 생존장비 및 아웃도어 용품의 기획·제조·판매·유통사업",
      description:
        "일상과 아웃도어, 비상 상황에서 실용적으로 사용할 수 있는 휴대용 생존장비 및 과학 굿즈를 기획합니다.",
      activityStatus: "개발 중",
      updatedAt: "2026-10-08",
    },
    {
      id: "ba-24",
      codeNumber: 24,
      groupSlug: "education-community",
      title: "우주 및 과학기술 관련 전시·행사·박람회 기획 및 운영사업",
      description:
        "우주 아이디어 포럼, 과학기술 세미나, 테마 전시 등 오프라인 교류 행사를 기획합니다.",
      activityStatus: "구상 단계",
      updatedAt: "2026-10-08",
    },

    // Group 4: Revenue & IP Development (25~28)
    {
      id: "ba-25",
      codeNumber: 25,
      groupSlug: "revenue-ip",
      title: "과학기술 및 우주산업 관련 컨설팅업",
      description:
        "우주·극한환경 관련 신규 사업 기획, 기술 동향 분석 및 전략 수립 자문을 제공합니다.",
      activityStatus: "협력 모집 중",
      updatedAt: "2026-10-08",
    },
    {
      id: "ba-26",
      codeNumber: 26,
      groupSlug: "revenue-ip",
      title: "연구개발 프로젝트의 기획·관리 및 사업화 지원사업",
      description:
        "다학제 연구 과제의 기획부터 시제품 검증, 스핀오프 사업화 전략까지 프로젝트 관리를 지원합니다.",
      activityStatus: "협력 모집 중",
      updatedAt: "2026-10-08",
    },
    {
      id: "ba-27",
      codeNumber: 27,
      groupSlug: "revenue-ip",
      title: "지식재산권의 개발·취득·관리·양도 및 라이선스 사업",
      description:
        "연구 과정에서 확보되는 기술 특허, 디자인, 브랜드 및 출판·콘텐츠 IP를 관리하고 라이선스 모델을 구축합니다.",
      activityStatus: "연구 주제",
      updatedAt: "2026-10-08",
    },
    {
      id: "ba-28",
      codeNumber: 28,
      groupSlug: "revenue-ip",
      title: "국내외 기업·기관·연구소와의 공동 연구개발 및 기술협력사업",
      description:
        "민간 기업, 대학, 연구기관과 상호 강점을 결합한 공동 R&D 및 기술 교류 프로젝트를 추진합니다.",
      activityStatus: "협력 모집 중",
      updatedAt: "2026-10-08",
    },

    // Group 5: Global Network (29~31)
    {
      id: "ba-29",
      codeNumber: 29,
      groupSlug: "global-network",
      title: "국내외 우주산업 및 과학기술 관련 기업에 대한 투자",
      description:
        "도전적인 기술력을 보유한 국내외 초기 우주·과학기술 스타트업과의 전략적 투자 및 연대를 구상합니다.",
      activityStatus: "구상 단계",
      updatedAt: "2026-10-08",
    },
    {
      id: "ba-30",
      codeNumber: 30,
      groupSlug: "global-network",
      title: "위 각 호와 관련된 수출입업",
      description:
        "연구 장비, 센서 부품, 생존 용품 및 기술 성과의 국경 간 교역과 글로벌 소싱을 다룹니다.",
      activityStatus: "구상 단계",
      updatedAt: "2026-10-08",
    },
    {
      id: "ba-31",
      codeNumber: 31,
      groupSlug: "global-network",
      title: "위 각 호에 부대하거나 관련되는 일체의 사업",
      description:
        "급변하는 우주 경제 환경에서 새롭게 등장하는 융합 비즈니스 기회를 유연하게 포착하기 위한 기반 조항입니다.",
      activityStatus: "운영 중",
      updatedAt: "2026-10-08",
    },
  ],

  technologyTopics: [
    {
      id: "tech-1",
      slug: "high-altitude-balloon-platform",
      domain: "우주 기술",
      title: "고고도 성층권 풍선 실험 및 관측 플랫폼",
      summary:
        "고도 20~35km 성층권 영역을 활용하여 우주 유사 환경(저압·극저온·고방사선)에서 센서와 부품을 검증하는 플랫폼 연구입니다.",
      problemStatement:
        "위성 발사나 사운딩 로켓을 통한 궤도 시험은 비용과 준비 기간이 막대하여 초기 부품·생체시료·센서의 반복 검증이 어렵습니다.",
      relevance:
        "성층권 풍선은 대기의 99% 상층부에 도달하면서도 회수 가능한 비행 특성을 지녀, 고고도 관측 및 소형 탑재체 사전 검증에 효과적인 징검다리 역할을 합니다.",
      status: "연구 주제",
      limitations:
        "공역 비행 승인, 기상 및 편서풍에 따른 낙하 구역 예측, 회수 안전성 확보 및 장시간 체공 제어가 선결 과제입니다.",
      collaborationNeeds:
        "기상 관측 센서 연구팀, 초경량 통신·비콘 모듈 개발사, 성층권 비행 허가 및 회수 운용 전문 파트너",
      conceptNote: "Concept & Research Topic — 현재 기초 설계 및 실험 프로토콜 정의 단계입니다.",
      publishedAt: "2026-10-15",
    },
    {
      id: "tech-2",
      slug: "rockoon-and-micro-propulsion",
      domain: "우주 운송 및 추진",
      title: "풍선 기반 공중 발사(Rockoon) 개념 및 소형 추진 연구",
      summary:
        "성층권까지 상승한 플랫폼에서 소형 발사체를 점화하여 대기 저항과 1단 추진제 소모를 줄이는 대안적 우주 접근 방식을 탐구합니다.",
      problemStatement:
        "지상 발사는 두꺼운 하층 대기의 공기 저항과 중력 손실을 이겨내기 위해 거대한 1단 로켓과 막대한 연료를 필요로 합니다.",
      relevance:
        "고고도에서의 발사 개념과 고효율 소형 추진·항법 기술 연구는 초소형 과학 탑재체의 독자적 우주 접근 가능성을 넓힙니다.",
      status: "구상 단계",
      limitations:
        "고고도 극저온 상태에서의 점화 신뢰성, 흔들리는 플랫폼에서의 정밀 자세 제어(항법), 관련 항공·우주 안전 규제 준수가 필수적입니다.",
      collaborationNeeds:
        "소형 하이브리드/고체 추진 연구실, 관성항법(INS) 및 자세제어 알고리즘 연구자",
      conceptNote: "Concept Stage — 장기 기술 로드맵 상의 개념 연구 과제입니다.",
      publishedAt: "2026-10-16",
    },
    {
      id: "tech-3",
      slug: "closed-loop-life-support",
      domain: "우주 생존 기술",
      title: "폐쇄형 생태계 제어(CELSS) 및 모듈형 재배 시스템",
      summary:
        "외부 보급이 제한된 고립 환경에서 공기·물·영양분을 순환시키며 식량을 자급하는 모듈형 농·생태 제어 기술을 연구합니다.",
      problemStatement:
        "장기 우주 체류나 극지·재난 고립 시설에서는 지속적인 식량 및 산소 보급 비용이 기하급수적으로 증가합니다.",
      relevance:
        "폐쇄형 환경 제어 기술은 미래 우주 거주지의 핵심 기반일 뿐 아니라, 기후 위기 시대의 극한지역 스마트팜 기술로 즉시 활용 가능합니다.",
      status: "연구 주제",
      limitations:
        "좁은 공간 내 에너지 소비 최적화, 미생물 오염 통제, 센서 고장 시 생태계 붕괴를 막는 다중 안전장치 설계가 요구됩니다.",
      collaborationNeeds:
        "스마트팜 환경제어 기업, 식물생리학 연구팀, 저전력 LED 광원 및 수처리 모듈 엔지니어",
      conceptNote: "Research Topic — 지상 모듈형 밀폐 재배 실험 환경 구상 단계입니다.",
      publishedAt: "2026-10-18",
    },
    {
      id: "tech-4",
      slug: "space-food-and-biospecimen",
      domain: "우주식품 및 생명과학",
      title: "장기보존 특수 영양식 및 극한환경 생체시료 보존 연구",
      summary:
        "장기간 변질 없이 에너지와 심리적 안정을 제공하는 비상·우주식품과, 고방사선·온도 변화로부터 생체시료를 보호하는 보관 기술을 다룹니다.",
      problemStatement:
        "극한 임무 환경에서는 조리 설비와 보관 공간이 극도로 제한되며, 영양 불균형과 미각 피로가 대원의 생리·심리적 저하를 유발합니다.",
      relevance:
        "고밀도·장기보존 식품 기술은 해양·산악·재난 구호 식량 시장과 직결되며, 생체시료 보존 기술은 바이오 물류 고도화에 기여합니다.",
      status: "연구 주제",
      limitations:
        "동결건조·레토르트 공정에서의 영양소 파괴 최소화, 고차단성 친환경 패키징 소재 검증 및 식품 안전 인허가 절차가 필요합니다.",
      collaborationNeeds:
        "식품공학 연구소, 특수 패키징 소재 기업, 저온 바이오 물류 및 콜드체인 전문 기업",
      conceptNote: "Research & Prototyping — 지상 비상식량 겸용 포맷 기획 중입니다.",
      publishedAt: "2026-10-20",
    },
    {
      id: "tech-5",
      slug: "extreme-environment-protective-gear",
      domain: "극한환경 장비",
      title: "초경량 단열·방호 소재 및 극한환경 보호장비",
      summary:
        "급격한 온도차와 외부 충격, 유해 환경으로부터 인체와 정밀 기기를 보호하는 특수보호복 및 휴대용 생존장비를 기획합니다.",
      problemStatement:
        "기존 극한환경 보호장비는 부피가 크고 무거워 작업자의 기동성을 제한하며, 일상·재난 대비용으로 보급하기에 단가가 높습니다.",
      relevance:
        "에어로젤 응용 단열재, 다층 방호 직물 등 극한환경 소재 기술은 산업 안전복, 고산·극지 아웃도어, 재난 구조 장비로 폭넓게 확장됩니다.",
      status: "개발 중",
      limitations:
        "내구성과 경량성의 균형, 극저온 굴곡 피로도 시험, 실제 사용 환경에서의 통기성 및 인체공학적 착용감 개선이 필요합니다.",
      collaborationNeeds:
        "기능성 섬유·신소재 기업, 산업안전 보호구 제조사, 극지·고산 필드 테스터",
      conceptNote: "In Development — 휴대용 생존·보온 장비 라인업 기획 및 소재 검토 단계입니다.",
      publishedAt: "2026-10-22",
    },
    {
      id: "tech-6",
      slug: "space-habitat-and-training-simulation",
      domain: "미래 우주 연구 주제",
      title: "고립 환경 생존 시뮬레이션 및 코리빙 연구 베이스캠프",
      summary:
        "제한된 공간에서의 인간 행동·협업 프로토콜을 연구하는 우주생존훈련실과 다학제 연구자들의 공유주거(Co-living) 모델을 탐구합니다.",
      problemStatement:
        "우주 및 극한 원정 임무의 실패 원인 중 상당수는 기술 결함보다 고립 스트레스, 의사소통 문제, 비상 상황 대응 훈련 부족에서 비롯됩니다.",
      relevance:
        "표준화된 생존 훈련 프로그램과 물리적 시뮬레이션 공간은 연구자 훈련은 물론 기업 리더십·재난 안전 교육 인프라로 활용될 수 있습니다.",
      status: "구상 단계",
      limitations:
        "물리적 공간 확보 및 시설 안전 기준 충족, 심리·생리 모니터링 윤리 기준 수립, 검증된 훈련 매뉴얼 개발이 선행되어야 합니다.",
      collaborationNeeds:
        "공간 건축·모듈러 하우징 디자이너, 재난안전 교육 전문가, 산업·우주심리학 연구자",
      conceptNote: "Concept Stage — 공간 기획 및 교육 프로그램 아키텍처 설계 단계입니다.",
      publishedAt: "2026-10-25",
    },
  ],

  articles: [
    {
      id: "art-1",
      slug: "why-31-business-purposes-for-space-era",
      title: "후크인터스텔라(주)의 5대 핵심 영역: 우주 시대를 향한 단계적 로드맵",
      excerpt:
        "우주 접근 기술, 극한 생존, 인재·커뮤니티, 수익·IP 개발, 글로벌 네트워크로 이어지는 5대 비즈니스 영역과 단계별 추진 원칙을 소개합니다.",
      body: `## 5대 핵심 사업 영역과 단계별 추진 로드맵

우주산업은 긴 호흡과 높은 기술적 신뢰를 요구하는 분야입니다. 후크인터스텔라(주)는 각 사업과 연구 주제가 어떤 문제의식과 장기적 방향성 아래 준비되고 있는지 투명하게 공개합니다.

### 핵심 원칙: 비전은 담대하게, 현재 상태는 정직하게

우리는 모든 과제가 당장 상용 서비스 중인 것처럼 과장하지 않으며, 현재 실제 운영 중인 영역과 연구·구상 단계의 과제를 명확히 구분합니다.

1. **Space Technology**: 고고도 풍선 실험 및 경량 탑재체, 항법·추진 등 우주 접근 기술에 관한 **연구 주제 및 구상 영역**입니다.
2. **Space Survival**: 특수보호장비, 비상식량, 폐쇄형 생태계 등 우주와 지상 재난 환경 모두에 필요한 **극한 생존 기술 영역**입니다.
3. **Talent, Education & Community**: 현재 **운영 중**인 출판·콘텐츠·온라인 플랫폼(SPACE IDEAS)을 중심으로 인재와 대중이 만나는 생태계 영역입니다.
4. **Revenue & IP Development**: 컨설팅, 공동 R&D 기획, 지식재산권(IP) 라이선싱을 통해 지속 가능한 연구 기반을 만드는 **협력 모집 영역**입니다.
5. **Global Network**: 향후 국내외 기술 기업 투자 및 글로벌 교역을 지향하는 **장기 확장 영역**입니다.

후크인터스텔라(주)는 콘텐츠와 커뮤니티, 기초 생존·고고도 실험 기획에서 출발하여 검증된 파트너들과 함께 한 걸음씩 항로를 넓혀 나가겠습니다.`,
      category: "Space Industry",
      authorName: "HOOK INTERSTELLAR Editorial",
      authorRole: "Strategy & Communications",
      status: "published",
      publishedAt: "2026-10-12",
      updatedAt: "2026-11-01",
    },
    {
      id: "art-2",
      slug: "stratospheric-balloon-as-near-space-testbed",
      title: "성층권 고고도 풍선이 ‘근우주(Near-Space) 테스트베드’로 주목받는 이유",
      excerpt:
        "고도 30km 상공의 성층권 환경은 대기 압력이 지상의 약 1%에 불과하고 영하 50°C 이하의 극저온을 보입니다. 소규모 연구팀을 위한 고고도 실증 환경을 살펴봅니다.",
      body: `## 궤도 발사 이전에 필요한 현실적인 실증 단계

초소형 위성(CubeSat)이나 우주용 센서, 생체시료 보관 용기를 개발할 때 연구팀이 겪는 가장 큰 장벽은 '실제 극한 환경에서의 반복 테스트'입니다. 지상 진공 챔버 실험과 실제 로켓 발사 사이에는 큰 비용적·시간적 간극이 존재합니다.

### 고고도 성층권(고도 20~35km) 환경의 특징

* **저압 환경**: 해수면 대기압의 약 1~3% 수준으로 진공에 가까운 저압 조건 형성
* **극저온 열환경**: 영하 40°C ~ 영하 60°C의 저온 및 강한 태양 복사열 동시 노출
* **회수 및 재시험 가능성**: 낙하산과 GPS/통신 비콘을 통해 탑재체를 회수하여 정밀 분석 가능

### 필요한 선결 과제와 협력 포인트

고고도 풍선 실험을 안전하게 수행하기 위해서는 항공 안전 법규에 따른 비행 승인, 정밀한 풍향·낙하 궤적 시뮬레이션, 그리고 극저온에서도 방전되지 않는 배터리 단열 설계가 필수적입니다. HOOK INTERSTELLAR는 대학 연구실 및 센서 개발 기업과 함께 안전한 고고도 관측·측정 실험 프로토콜을 연구하고 있습니다.`,
      category: "Research & Technology",
      authorName: "기술연구기획팀",
      authorRole: "Space Technology Research",
      status: "published",
      publishedAt: "2026-10-20",
      updatedAt: "2026-10-20",
    },
    {
      id: "art-3",
      slug: "dual-use-survival-tech-earth-and-space",
      title: "우주 생존 기술과 지상 재난 대응의 교차점: Dual-Use 생존 솔루션",
      excerpt:
        "우주라는 극한의 고립 환경을 위해 고민한 식량, 보온, 폐쇄형 순환 기술은 지구의 기후 재난과 극지·아웃도어 현장에서 어떤 가치를 만들어낼 수 있을까요?",
      body: `## 가장 혹독한 환경을 기준으로 설계된 기술의 가치

우주 공간과 미래 행성 기지는 물 한 방울, 산소 한 모금, 열에너지 하나까지 철저히 통제하고 재활용해야 하는 극한의 무인도와 같습니다. 이러한 환경에서 생존하기 위해 연구되는 기술들은 지구상의 재난·구호 현장에서도 그대로 핵심 솔루션이 됩니다.

### 3대 핵심 교차 영역

1. **초경량 단열 및 보호장비**: 극저온 환경에서 체온 손실을 막는 박막 단열 소재는 동절기 재난 대피용 보온 장비 및 고산·극지 작업복에 적용될 수 있습니다.
2. **장기보존 비상식량**: 조리 기구 없이도 최소 부피로 필수 열량과 영양을 공급하고 극한 스트레스 상황에서 심리적 안정감을 주는 식품 설계는 재난 비축 식량의 품질을 높입니다.
3. **모듈형 폐쇄 생태계**: 외부 전력과 용수 공급이 불안정한 지역에서 작동하는 소형 모듈형 식물 재배기는 도서·산간 및 극지 기지의 신선 채소 공급원이 됩니다.

HOOK INTERSTELLAR는 먼 미래의 우주 개척에만 머무르지 않고, 오늘날 지상에서 즉시 검증하고 가치를 창출할 수 있는 생존 기술의 사업화 경로를 함께 모색합니다.`,
      category: "Reports",
      authorName: "생존기술기획팀",
      authorRole: "Space Survival Division",
      status: "published",
      publishedAt: "2026-10-28",
      updatedAt: "2026-10-28",
    },
    {
      id: "art-4",
      slug: "open-innovation-and-ip-protection-in-space-ideas",
      title: "SPACE IDEAS 커뮤니티 운영 원칙: 열린 토론과 지식재산권(IP) 보호의 균형",
      excerpt:
        "누구나 우주에 관한 질문과 아이디어를 나눌 수 있되, 제안자의 권리를 존중하고 특허 신규성 상실 위험을 사전에 안내하는 플랫폼 가이드를 소개합니다.",
      body: `## 왜 우주산업에 대중과 연구자의 열린 광장이 필요한가

우주 시대의 의제는 로켓 공학에만 국한되지 않습니다. 우주에서의 식생활, 주거 공간의 심리적 설계, 우주 쓰레기 문제, 새로운 교육 콘텐츠까지 다양한 분야의 시각이 만날 때 독창적인 해법이 탄생합니다.

### 안전한 참여를 위한 4가지 약속

1. **소유권 불이전 원칙**: SPACE IDEAS에 공개 게시물을 작성하더라도 해당 아이디어의 지식재산권이 HOOK INTERSTELLAR로 자동 이전되지 않습니다.
2. **별도 계약에 기반한 사업화**: 회사가 특정 아이디어를 검토하거나 공동개발·사업화하고자 할 경우, 작성자의 명시적 동의와 별도의 서면 계약을 전제로 진행합니다.
3. **특허 출원 전 공개 주의 안내**: 특허법상 공개된 게시판에 기술적구성을 상세히 공지할 경우 신규성 상실 사유가 될 수 있으므로, 특허 출원을 고려 중인 핵심 기술은 공개 게시 전 변리사 등 전문가 검토를 거치도록 안내합니다.
4. **건강한 커뮤니티 모더레이션**: 타인의 권리 침해, 개인정보 노출, 스팸 및 비방 게시물은 신고 및 관리자 검토 절차를 통해 체계적으로 관리됩니다.`,
      category: "Education",
      authorName: "커뮤니티 운영팀",
      authorRole: "Platform Operations",
      status: "published",
      publishedAt: "2026-11-02",
      updatedAt: "2026-11-02",
    },
  ],

  ideas: [
    {
      id: "idea-1",
      postType: "idea",
      authorId: "user-member-1",
      authorName: "김서연 연구원",
      displayMode: "public",
      category: "우주 기술",
      title: "성층권 고고도 풍선 회수율 향상을 위한 이중 비콘 및 활공 낙하산 개념 제안",
      description:
        "고고도 풍선 실험 후 탑재체가 해상이나 험준한 산악 지형에 낙하할 경우 회수가 어려운 문제를 줄이기 위해, 고도 5km 이하에서 GPS 기반 소형 패러포일(활공형 낙하산)로 지정 회수 지점 근처로 유도하는 경량 모듈 아이디어를 제안합니다. 기존 단순 원형 낙하산 대비 풍향 오차를 얼마나 줄일 수 있을지 함께 논의해보고 싶습니다.",
      moderationStatus: "published",
      termsVersion: "v1.0 (2026-10-08)",
      privacyNoticeVersion: "v1.0 (2026-10-08)",
      followUpConsent: true,
      createdAt: "2026-10-26T10:15:00Z",
      updatedAt: "2026-10-26T14:00:00Z",
      publishedAt: "2026-10-26T14:00:00Z",
    },
    {
      id: "idea-2",
      postType: "idea",
      authorId: "user-member-2",
      authorName: "이준호 엔지니어",
      displayMode: "public",
      category: "우주식품·생존",
      title: "재난 대피소 및 장기 항해용 발열 일체형 한식 동결건조 전투/우주식량 패키징",
      description:
        "전기와 불을 사용할 수 없는 극한 환경이나 재난 고립 상황에서 소량의 물만으로 안전하게 온기를 확보하고, 한국인에게 익숙한 국밥·비빔밥 형태의 균형 영양식을 섭취할 수 있는 저부피 다층 파우치 개념입니다. 발열 반응 시 발생하는 수증기 배출 안전 구조와 쓰레기 부피 최소화 방안에 대한 의견이 궁금합니다.",
      moderationStatus: "published",
      termsVersion: "v1.0 (2026-10-08)",
      privacyNoticeVersion: "v1.0 (2026-10-08)",
      followUpConsent: true,
      createdAt: "2026-10-29T09:40:00Z",
      updatedAt: "2026-10-29T13:20:00Z",
      publishedAt: "2026-10-29T13:20:00Z",
    },
    {
      id: "idea-3",
      postType: "discussion",
      authorId: "user-admin",
      authorName: "총괄 관리자",
      displayMode: "public",
      category: "우주 주거·생활",
      title: "[정기 토론 #1] 6개월 이상 고립된 극한 거주 공간에서 가장 중요한 심리적·공간적 요소는 무엇일까요?",
      description:
        "우주 정거장, 남극 월동 기지, 혹은 폐쇄형 생존 훈련 시설처럼 제한된 공간에서 동료들과 장기간 생활할 때 개인 프라이버시 구역, 식물 재배(녹색 공간), 조명 주기(일주기 리듬), 식사 시간 중 어떤 요소가 팀 생존과 사기에 가장 결정적인 영향을 미친다고 생각하시나요? 여러분의 경험이나 아이디어를 자유롭게 남겨주세요.",
      moderationStatus: "published",
      termsVersion: "v1.0 (2026-10-08)",
      privacyNoticeVersion: "v1.0 (2026-10-08)",
      followUpConsent: false,
      createdAt: "2026-11-01T09:00:00Z",
      updatedAt: "2026-11-01T09:00:00Z",
      publishedAt: "2026-11-01T09:00:00Z",
    },
    {
      id: "idea-4",
      postType: "idea",
      authorId: "user-member-1",
      authorName: "김서연 연구원",
      displayMode: "anonymous",
      category: "교육·콘텐츠",
      title: "고등학생·대학생 팀이 직접 캔위성(CanSat)과 생체 씨앗을 성층권에 보내는 오픈 실험 키트",
      description:
        "표준화된 300g 이하 규격의 탑재체 박스를 학교 동아리에 보급하고, 여러 팀의 실험 모듈을 하나의 고고도 풍선에 합승(Rideshare)시켜 성층권 실험 데이터를 수집·비교하는 교육 프로그램 아이디어입니다.",
      moderationStatus: "published",
      termsVersion: "v1.0 (2026-10-08)",
      privacyNoticeVersion: "v1.0 (2026-10-08)",
      followUpConsent: true,
      createdAt: "2026-11-02T16:20:00Z",
      updatedAt: "2026-11-02T18:00:00Z",
      publishedAt: "2026-11-02T18:00:00Z",
    },
    {
      id: "idea-5",
      postType: "idea",
      authorId: "user-member-2",
      authorName: "이준호 엔지니어",
      displayMode: "public",
      category: "우주 자원·에너지",
      title: "[승인 대기 예시] 극저온 음영 지역 탐사용 고밀도 열배터리 단열 케이스 아이디어",
      description:
        "달 극지방이나 성층권 야간 비행 시 리튬이온 배터리의 급격한 전압 강하를 방지하기 위한 상변화물질(PCM) 및 다층 박막 단열 결합 케이스 개념입니다. (관리자 모더레이션 큐 테스트용 대기 게시물)",
      moderationStatus: "pending",
      termsVersion: "v1.0 (2026-10-08)",
      privacyNoticeVersion: "v1.0 (2026-10-08)",
      followUpConsent: true,
      createdAt: "2026-11-04T08:00:00Z",
      updatedAt: "2026-11-04T08:00:00Z",
    },
  ],

  comments: [
    {
      id: "cmt-1",
      ideaId: "idea-1",
      authorId: "user-member-2",
      authorName: "이준호 엔지니어",
      displayMode: "public",
      body: "패러포일 제어 서보 모터가 성층권 통과 시 영하 50도 이하에서 결빙되지 않도록 보온 하우징과 저전력 히터 설계가 병행되면 실현 가능성이 훨씬 높아질 것 같습니다.",
      moderationStatus: "published",
      createdAt: "2026-10-27T11:20:00Z",
      updatedAt: "2026-10-27T11:20:00Z",
    },
    {
      id: "cmt-2",
      ideaId: "idea-3",
      authorId: "user-member-1",
      authorName: "김서연 연구원",
      displayMode: "public",
      body: "남극 기지 사례 연구를 보면 일주기 리듬을 맞춰주는 태양광 스펙트럼 조명과, 직접 흙이나 식물을 만지며 돌보는 작은 온실 모듈이 대원들의 우울감 예방에 큰 도움이 되었다고 합니다.",
      moderationStatus: "published",
      createdAt: "2026-11-01T14:05:00Z",
      updatedAt: "2026-11-01T14:05:00Z",
    },
  ],

  reports: [],

  inquiries: [
    {
      id: "inq-1",
      channel: "partnership",
      inquiryType: "공동 연구개발 (Joint R&D)",
      organization: "한국극한소재연구랩 (예시 문의)",
      contactName: "박민수 책임연구원",
      email: "mspark@example-lab.kr",
      phone: "010-0000-0000",
      subject: "초경량 단열 섬유 시제품의 고고도 저온 환경 노출 시험 협력 문의",
      message:
        "당사에서 연구 중인 에어로젤 코팅 직물 샘플을 고고도 성층권 실험 탑재체에 부착하여 극저온 단열 특성을 측정하는 공동 실험이 가능한지 논의하고 싶습니다.",
      privacyConsentVersion: "v1.0 (2026-10-08)",
      status: "in_review",
      assignedTo: "기술협력팀",
      createdAt: "2026-11-01T10:30:00Z",
      updatedAt: "2026-11-02T09:00:00Z",
    },
  ],

  moderationActions: [
    {
      id: "mod-act-1",
      moderatorId: "user-admin",
      moderatorName: "총괄 관리자",
      targetType: "idea",
      targetId: "idea-1",
      action: "published",
      reason: "커뮤니티 운영원칙 및 IP 고지 준수 확인 후 공개 승인",
      createdAt: "2026-10-26T14:00:00Z",
    },
  ],
};
