import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const cookieStore = req.cookies;
  const session = cookieStore.get("admin_session");

  if (session && session.value === "true") {
    return NextResponse.json({ isAuthenticated: true });
  }

  return NextResponse.json({ isAuthenticated: false });
}
