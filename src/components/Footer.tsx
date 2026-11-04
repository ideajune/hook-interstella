import React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#07182D] text-[#D9E6F2] border-t border-[#123454] mt-auto">
      <div className="container-shell py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#123454]">
          {/* Col 1: Brand Identity */}
          <div className="lg:col-span-4 space-y-4">
            <div>
              <p className="text-xl font-bold tracking-wider text-white">
                HOOK INTERSTELLAR
              </p>
              <p className="text-xs tracking-widest text-[#2998D6] font-semibold mt-0.5">
                BEYOND THE HORIZON
              </p>
            </div>
            <p className="text-sm text-[#D9E6F2]/85 leading-relaxed">
              새로운 우주 시대, 우리만의 항로를 개척하다.
              <br />
              우주 기술, 극한 생존 솔루션, 인재·교육 커뮤니티, 지식재산(IP)과
              글로벌 네트워크를 연결하는 우주산업 혁신 플랫폼입니다.
            </p>
            <div className="text-xs text-[#D9E6F2]/70 space-y-1 pt-2">
              <p>운영 법인: 후크인터스텔라(주)</p>
              <p>주소: 서울특별시 강남구 삼성로103길 6</p>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="lg:col-span-3 space-y-3">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-white">
              플랫폼 메뉴
            </h2>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  ABOUT (회사 소개 및 비전)
                </Link>
              </li>
              <li>
                <Link href="/business" className="hover:text-white transition-colors">
                  BUSINESS (5대 핵심 사업 영역)
                </Link>
              </li>
              <li>
                <Link href="/technology" className="hover:text-white transition-colors">
                  TECHNOLOGY (기술 및 연구 주제)
                </Link>
              </li>
              <li>
                <Link href="/ecosystem" className="hover:text-white transition-colors">
                  ECOSYSTEM (인재·교육·협력 생태계)
                </Link>
              </li>
              <li>
                <Link href="/insights" className="hover:text-white transition-colors">
                  INSIGHTS (리포트 및 아티클)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Participation */}
          <div className="lg:col-span-3 space-y-3">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-white">
              참여 및 협력
            </h2>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/space-ideas" className="hover:text-white transition-colors">
                  SPACE IDEAS (우주 아이디어 광장)
                </Link>
              </li>
              <li>
                <Link href="/space-ideas/submit" className="hover:text-white transition-colors">
                  아이디어 및 질문 등록하기
                </Link>
              </li>
              <li>
                <Link href="/partnership" className="hover:text-white transition-colors">
                  PARTNERSHIP (기술·사업 협력 제안)
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  CONTACT (일반 문의)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal & Policy */}
          <div className="lg:col-span-2 space-y-3">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-white">
              정책 및 고지
            </h2>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  개인정보처리방침
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  이용약관
                </Link>
              </li>
              <li>
                <Link href="/community-rules" className="hover:text-white transition-colors">
                  커뮤니티 및 IP 운영원칙
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Fact & Trust Notice */}
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-[#D9E6F2]/70">
          <div className="flex flex-wrap items-center gap-3">
            <p>
              © {new Date().getFullYear()} 후크인터스텔라(주) (HOOK INTERSTELLAR). All rights reserved.
            </p>
            <Link
              href="/admin"
              className="text-[#D9E6F2]/40 hover:text-[#D9E6F2]/80 transition-colors"
            >
              관리자
            </Link>
          </div>
          <p className="max-w-2xl leading-relaxed">
            본 웹사이트에 안내된 세부 사업 및 미래 연구 주제는 현재 상용 운영 중인 사업과 연구·구상 단계의 과제를 명확히 구분하여 표기합니다.
          </p>
        </div>
      </div>
    </footer>
  );
}
