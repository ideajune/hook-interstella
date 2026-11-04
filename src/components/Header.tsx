"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Shield, UserCheck, LogOut, Sparkles } from "lucide-react";

interface HeaderUser {
  id: string;
  displayName: string;
  role: string;
  email: string;
}

const NAV_ITEMS = [
  { label: "ABOUT", href: "/about" },
  { label: "BUSINESS", href: "/business" },
  { label: "TECHNOLOGY", href: "/technology" },
  { label: "ECOSYSTEM", href: "/ecosystem" },
  { label: "INSIGHTS", href: "/insights" },
  { label: "SPACE IDEAS", href: "/space-ideas", accent: true },
  { label: "PARTNERSHIP", href: "/partnership" },
  { label: "CONTACT", href: "/contact", isCta: true },
];

export function Header({ initialUser }: { initialUser: HeaderUser | null }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<HeaderUser | null>(initialUser);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => (r.ok ? r.json() : { user: null }))
      .then((d) => setUser(d.user ?? null))
      .catch(() => {});
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    router.refresh();
  };

  const isStaff = user?.role === "admin";

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-200 border-b ${
        scrolled
          ? "bg-[#07182D]/95 backdrop-blur-md border-[#123454] text-white shadow-sm"
          : "bg-[#07182D] border-[#123454] text-white"
      }`}
    >
      <div className="container-shell flex items-center justify-between h-20">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex flex-col group focus:outline-none"
          aria-label="HOOK INTERSTELLAR 홈으로 이동"
        >
          <span className="text-lg sm:text-xl font-bold tracking-wider text-white group-hover:text-[#2998D6] transition-colors">
            HOOK INTERSTELLAR
          </span>
          <span className="text-[11px] text-[#D9E6F2]/80 tracking-widest font-medium">
            BEYOND THE HORIZON
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          aria-label="주요 메뉴"
          className="hidden xl:flex items-center gap-1"
        >
          {NAV_ITEMS.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            if (item.isCta) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`ml-2 px-4 py-2.5 rounded-lg text-xs font-semibold tracking-wider transition-colors min-h-[44px] inline-flex items-center ${
                    isActive
                      ? "bg-[#2998D6] text-white ring-2 ring-white"
                      : "bg-[#147FC5] hover:bg-[#2998D6] text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`relative px-3 py-2.5 text-xs font-semibold tracking-wider transition-colors min-h-[44px] inline-flex items-center gap-1 rounded-md ${
                  isActive
                    ? "text-white bg-[#123454]"
                    : item.accent
                    ? "text-[#D9E6F2] hover:text-white hover:bg-[#0B2340]"
                    : "text-[#D9E6F2]/85 hover:text-white hover:bg-[#0B2340]"
                }`}
              >
                {item.accent && (
                  <Sparkles
                    className="w-3.5 h-3.5 text-[#2998D6]"
                    aria-hidden="true"
                  />
                )}
                <span>{item.label}</span>
                {isActive && (
                  <span
                    className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#2998D6] rounded-full"
                    aria-hidden="true"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Auth & Admin Controls (Desktop) */}
        <div className="hidden xl:flex items-center gap-2 border-l border-[#123454] pl-4">
          {isStaff && (
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-semibold bg-[#123454] text-[#D9E6F2] hover:text-white hover:bg-[#147FC5] transition-colors min-h-[40px]"
            >
              <Shield className="w-3.5 h-3.5 text-[#2998D6]" aria-hidden="true" />
              <span>ADMIN</span>
            </Link>
          )}
          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#D9E6F2] inline-flex items-center gap-1 px-2 py-1 rounded bg-[#0B2340] border border-[#123454]">
                <UserCheck className="w-3.5 h-3.5 text-[#2998D6]" aria-hidden="true" />
                <span className="max-w-[110px] truncate">{user.displayName}</span>
              </span>
              <button
                type="button"
                onClick={handleLogout}
                className="p-2 text-xs text-[#D9E6F2]/80 hover:text-white rounded-md hover:bg-[#123454] min-h-[40px] min-w-[40px] inline-flex items-center justify-center"
                title="로그아웃"
                aria-label="로그아웃"
              >
                <LogOut className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="px-3 py-2 rounded-md text-xs font-semibold text-[#D9E6F2] hover:text-white border border-[#123454] hover:border-[#2998D6] transition-colors min-h-[40px] inline-flex items-center"
            >
              로그인 / 회원가입
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="xl:hidden p-2.5 rounded-lg text-[#D9E6F2] hover:text-white hover:bg-[#123454] min-w-[44px] min-h-[44px] inline-flex items-center justify-center"
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "메뉴 닫기" : "메뉴 열기"}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="xl:hidden bg-[#07182D] border-t border-[#123454] px-5 pt-4 pb-6 space-y-3">
          <nav aria-label="모바일 메뉴" className="grid grid-cols-1 gap-1.5">
            {NAV_ITEMS.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-3 rounded-lg text-sm font-semibold flex items-center justify-between min-h-[44px] ${
                    isActive
                      ? "bg-[#147FC5] text-white"
                      : "text-[#D9E6F2] hover:bg-[#0B2340] hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {item.accent && <Sparkles className="w-4 h-4 text-[#2998D6]" />}
                    {item.label}
                  </span>
                  {isActive && <span className="text-xs">현재 페이지</span>}
                </Link>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-[#123454] flex flex-wrap items-center justify-between gap-2">
            {user ? (
              <>
                <div className="text-xs text-[#D9E6F2]">
                  접속 계정:{" "}
                  <strong className="text-white">{user.displayName}</strong> (
                  {user.role === "admin" ? "총괄 관리자" : "일반 회원"})
                </div>
                <div className="flex items-center gap-2">
                  {isStaff && (
                    <Link
                      href="/admin"
                      className="px-3 py-2 rounded-md text-xs font-semibold bg-[#123454] text-white"
                    >
                      관리자 콘솔
                    </Link>
                  )}
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="px-3 py-2 rounded-md text-xs font-semibold border border-[#123454] text-[#D9E6F2]"
                  >
                    로그아웃
                  </button>
                </div>
              </>
            ) : (
              <Link
                href="/login"
                className="w-full text-center py-2.5 rounded-lg text-sm font-semibold bg-[#123454] text-white hover:bg-[#147FC5]"
              >
                로그인 / 회원가입
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
