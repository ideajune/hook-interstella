import { cookies } from "next/headers";
import { readDb } from "./db";
import { User, UserRole } from "./types";

export const SESSION_COOKIE_NAME = "hook_session_user_id";

export async function getCurrentUser(): Promise<User | null> {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    if (!userId) return null;
    const db = readDb();
    const user = db.users.find((u) => u.id === userId && u.accountStatus === "active");
    return user ?? null;
  } catch {
    return null;
  }
}

export function hasRole(user: User | null, allowedRoles: UserRole[]): boolean {
  if (!user || user.accountStatus !== "active") return false;
  return allowedRoles.includes(user.role);
}
