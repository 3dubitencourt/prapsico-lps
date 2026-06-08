import { NextResponse } from "next/server";
import { getSettings, saveSettings, type Settings } from "@/lib/admin/settings";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const settings = await getSettings();
  return NextResponse.json(settings);
}

export async function POST(req: Request) {
  let patch: Partial<Settings> = {};
  try {
    patch = (await req.json()) as Partial<Settings>;
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }
  const next = await saveSettings(patch);
  return NextResponse.json(next);
}
