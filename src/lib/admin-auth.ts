import { SignJWT, jwtVerify } from "jose";

export const ADMIN_SESSION_COOKIE = "admin_jwt";
export const ADMIN_SESSION_MAX_AGE_SECONDS = 60 * 60 * 24;

type AdminAuthConfig = {
  username: string;
  password: string;
  jwtSecret: string;
};

function getAdminAuthConfig(): AdminAuthConfig {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;
  const jwtSecret = process.env.ADMIN_JWT_SECRET;

  if (!username || !password || !jwtSecret) {
    throw new Error("Missing admin auth environment variables.");
  }

  return { username, password, jwtSecret };
}

function getJwtSecretKey() {
  return new TextEncoder().encode(getAdminAuthConfig().jwtSecret);
}

export function getAdminSessionCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: ADMIN_SESSION_MAX_AGE_SECONDS,
  };
}

export async function verifyAdminCredentials(username: string, password: string) {
  const { username: expectedUsername, password: expectedPassword } = getAdminAuthConfig();

  if (username !== expectedUsername) {
    return false;
  }

  return password === expectedPassword;
}

export async function createAdminToken(username: string) {
  return new SignJWT({ username, role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${ADMIN_SESSION_MAX_AGE_SECONDS}s`)
    .sign(getJwtSecretKey());
}

export async function verifyAdminToken(token: string | undefined) {
  if (!token) {
    return null;
  }

  const jwtSecret = process.env.ADMIN_JWT_SECRET;
  if (!jwtSecret) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(jwtSecret));

    if (payload.role !== "admin" || typeof payload.username !== "string") {
      return null;
    }

    return { username: payload.username };
  } catch {
    return null;
  }
}