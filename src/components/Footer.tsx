import React from "react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#07182D] text-[#D9E6F2] border-t border-[#123454] mt-auto">
      <div className="container-shell py-10 lg:py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-[#123454]">
          {/* Col 1: Brand Identity */}
          <div className="md:col-span-6 space-y-3">
            <div>
              <p className="text-lg font-bold tracking-wider text-white">
                HOOK INTERSTELLAR
              </p>
              <p className="text-[11px] tracking-widest text-[#2998D6] font-semibold">
                BEYOND THE HORIZON · 새로운 우주 시대, 우리만의 항로를 개척하다
              </p>
            </div>
            <div className="text-xs text-[#D9E6F2]/70 space-y-1">
              <p>후크인터스텔라(주) · 대표자: 최규철 · 사업자등록번호: 186-87-03898</p>
              <p>서울특별시 강남구 삼성로103길 6 · 010-7710-3801 · ideajune@naver.com</p>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="md:col-span-3 space-y-2.5">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-white">
              주요 메뉴
            </h2>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  ABOUT (회사 소개)
                </Link>
              </li>
              <li>
                <Link href="/business" className="hover:text-white transition-colors">
                  BUSINESS & TECH (사업·기술)
                </Link>
              </li>
              <li>
                <Link href="/projects/space-stowaway" className="hover:text-white transition-colors">
                  우주밀항 프로젝트
                </Link>
              </li>
              <li>
                <Link href="/insights" className="hover:text-white transition-colors">
                  INSIGHTS (아티클)
                </Link>
              </li>
              <li>
                <Link href="/space-ideas" className="hover:text-white transition-colors">
                  SPACE IDEAS (아이디어 광장)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Policy & Contact */}
          <div className="md:col-span-3 space-y-2.5">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-white">
              문의 및 약관
            </h2>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  문의 및 파트너십 제안
                </Link>
              </li>
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
                  커뮤니티 운영원칙
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#D9E6F2]/60">
          <div className="flex items-center gap-3">
            <p>© {new Date().getFullYear()} 후크인터스텔라(주). All rights reserved.</p>
            <Link href="/admin" className="hover:text-white transition-colors">
              관리자
            </Link>
          </div>
          <p>현재 운영 중인 사업과 연구·구상 단계 과제를 상태 배지로 구분해 표기합니다.</p>
        </div>
      </div>
    </footer>
  );
}
