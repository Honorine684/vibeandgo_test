import { NextResponse } from "next/server";

// Fixture "INSECURE_COOKIE" (VRAI) — cookie de SESSION pose sans HttpOnly ni
// Secure. Nom choisi pour etre reconnaissable comme cookie de session.
export const dynamic = "force-dynamic";

export async function GET() {
  const res = NextResponse.json({ ok: true });
  res.headers.set("Set-Cookie", "fx_session_id=fake-session-00000000; Path=/");
  return res;
}
