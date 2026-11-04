import { NextRequest, NextResponse } from "next/server";
import { readDb } from "@/lib/db";
import { SESSION_COOKIE_NAME } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");

    const db = readDb();
    const user = db.users.find(
      (u) => u.email.toLowerCase() === email && u.passwordHash === password
    );

    if (!user) {
      return NextResponse.json(
        { error: "이메일 또는 비밀번호가 올바르지 않습니다." },
        { status: 401 }
      );
    }

    if (user.accountStatus !== "active") {
      return NextResponse.json(
        { error: "정지된 계정입니다. 관리자에게 문의해 주세요." },
        { status: 403 }
      );
    }

    const res = NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        displayName: user.displayName,
        role: user.role,
      },
    });

    res.cookies.set(SESSION_COOKIE_NAME, user.id, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch {
    return NextResponse.json(
      { error: "로그인 처리 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
