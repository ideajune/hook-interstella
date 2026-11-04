import { NextResponse } from "next/server";
import { readDb } from "@/lib/db";

export async function GET() {
  const db = readDb();
  const groups = [...db.businessGroups].sort(
    (a, b) => a.displayOrder - b.displayOrder
  );
  const activities = [...db.businessActivities].sort(
    (a, b) => a.codeNumber - b.codeNumber
  );
  return NextResponse.json({ groups, activities });
}
