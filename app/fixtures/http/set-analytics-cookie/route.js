import { NextResponse } from "next/server";

// Fixture "INSECURE_COOKIE" (PIEGE) — cookie ANALYTICS, pas un cookie de
// session, egalement sans HttpOnly/Secure. Ne doit PAS etre signale comme une
// session non securisee.
export const dynamic = "force-dynamic";

export async function GET() {
  const res = NextResponse.json({ ok: true });
  res.headers.set("Set-Cookie", "fx_analytics_id=anon-00000000; Path=/");
  return res;
}
