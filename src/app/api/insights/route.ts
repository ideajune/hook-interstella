import { NextResponse } from "next/server";
import { readDb } from "@/lib/db";

export async function GET() {
  const db = readDb();
  const articles = db.articles.filter((a) => a.status === "published");
  return NextResponse.json({ articles });
}
