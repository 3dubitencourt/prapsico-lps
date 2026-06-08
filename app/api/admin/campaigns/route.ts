import { NextResponse } from "next/server";
import { getCampaigns } from "@/lib/admin/meta";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const datePreset = searchParams.get("preset") || "maximum";
  try {
    const result = await getCampaigns(datePreset);
    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(
      { configured: true, error: (err as Error).message },
      { status: 502 },
    );
  }
}
