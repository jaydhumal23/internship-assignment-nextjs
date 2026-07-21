import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  createAdminToken,
  getAdminSessionCookieOptions,
  verifyAdminCredentials,
} from "@/lib/admin-auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, password } = body;

    const isValidCredentials = await verifyAdminCredentials(username, password);

    if (isValidCredentials) {
      const token = await createAdminToken(username);
      const response = NextResponse.json({ success: true });

      response.cookies.set(ADMIN_SESSION_COOKIE, token, getAdminSessionCookieOptions());

      return response;
    }

    return NextResponse.json(
      { error: "Invalid username or password" },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
