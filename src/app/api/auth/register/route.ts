import { NextRequest, NextResponse } from "next/server";
import { updateDb } from "@/lib/db";
import { SESSION_COOKIE_NAME } from "@/lib/auth";
import { User } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = String(body.email || "").trim().toLowerCase();
    const password = String(body.password || "");
    const displayName = String(body.displayName || "").trim();
    const organization = body.organization
      ? String(body.organization).trim()
      : undefined;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "유효한 이메일 주소를 입력해 주세요." },
        { status: 400 }
      );
    }
    if (password.length < 4) {
      return NextResponse.json(
        { error: "비밀번호는 4자 이상이어야 합니다." },
        { status: 400 }
      );
    }
    if (displayName.length < 2) {
      return NextResponse.json(
        { error: "표시 이름을 2자 이상 입력해 주세요." },
        { status: 400 }
      );
    }

    const result = updateDb((db) => {
      const exists = db.users.some((u) => u.email.toLowerCase() === email);
      if (exists) {
        return { error: "이미 가입된 이메일 주소입니다." };
      }
      const newUser: User = {
        id: `user-${Date.now()}`,
        email,
        passwordHash: password,
        displayName,
        organization,
        role: "member",
        accountStatus: "active",
        createdAt: new Date().toISOString(),
      };
      db.users.push(newUser);
      return { user: newUser };
    });

    if ("error" in result) {
      return NextResponse.json({ error: result.error }, { status: 409 });
    }

    const res = NextResponse.json({
      user: {
        id: result.user.id,
        email: result.user.email,
        displayName: result.user.displayName,
        role: result.user.role,
      },
    });

    res.cookies.set(SESSION_COOKIE_NAME, result.user.id, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch {
    return NextResponse.json(
      { error: "회원가입 처리 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
