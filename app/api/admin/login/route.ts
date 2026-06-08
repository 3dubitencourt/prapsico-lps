import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  getAdminPassword,
  makeSessionToken,
} from "@/lib/admin/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  let password = "";
  try {
    const body = (await req.json()) as { password?: string };
    password = (body.password ?? "").trim();
  } catch {
    /* corpo inválido */
  }

  if (!password || password !== getAdminPassword()) {
    return NextResponse.json({ error: "Senha incorreta." }, { status: 401 });
  }

  const token = await makeSessionToken(password);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 dias
  });
  return res;
}
