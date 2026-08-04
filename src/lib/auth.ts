import "server-only";

import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { adminUsers } from "@/db/schema";
import { eq } from "drizzle-orm";

const cookieName = "bb_admin_session";
const sessionTtlSeconds = 60 * 60 * 8;

type SessionPayload = {
  email: string;
  name: string;
  role: string;
  exp: number;
};

function secret() {
  const value = process.env.AUTH_SECRET;
  if (!value || value.length < 32) {
    throw new Error("AUTH_SECRET must be set to a strong value of at least 32 characters.");
  }
  return value;
}

function base64Url(input: Buffer | string) {
  return Buffer.from(input).toString("base64url");
}

function sign(data: string) {
  return createHmac("sha256", secret()).update(data).digest("base64url");
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

export function createSessionToken(payload: Omit<SessionPayload, "exp">) {
  const body: SessionPayload = {
    ...payload,
    exp: Math.floor(Date.now() / 1000) + sessionTtlSeconds,
  };
  const encoded = base64Url(JSON.stringify(body));
  return `${encoded}.${sign(encoded)}`;
}

export function verifySessionToken(token: string | undefined): SessionPayload | null {
  if (!token) return null;
  const [encoded, signature] = token.split(".");
  if (!encoded || !signature || !safeEqual(sign(encoded), signature)) return null;

  try {
    const payload = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8")) as SessionPayload;
    if (!payload.email || !payload.exp || payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  return verifySessionToken(cookieStore.get(cookieName)?.value);
}

export async function requireAdmin() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
  return session;
}

export async function setAdminSession(payload: Omit<SessionPayload, "exp">) {
  const cookieStore = await cookies();
  cookieStore.set(cookieName, createSessionToken(payload), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: sessionTtlSeconds,
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(cookieName);
}

export async function ensureConfiguredAdmin(email: string) {
  const configuredEmail = process.env.ADMIN_EMAIL?.toLowerCase();
  if (!configuredEmail || configuredEmail !== email.toLowerCase()) return null;

  const existing = await db.select().from(adminUsers).where(eq(adminUsers.email, configuredEmail)).limit(1);
  if (existing[0]) return existing[0];

  const [created] = await db
    .insert(adminUsers)
    .values({
      name: "Brian M. Burudi Admin",
      email: configuredEmail,
      role: "admin",
    })
    .returning();

  return created;
}

export function isConfiguredPassword(password: string) {
  const configured = process.env.ADMIN_PASSWORD;
  if (!configured || configured.length < 8) return false;
  return safeEqual(configured, password);
}
