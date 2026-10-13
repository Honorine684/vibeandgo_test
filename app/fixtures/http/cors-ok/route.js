import { NextResponse } from "next/server";

// Fixture "CORS_MISCONFIGURED" (PIEGE) — "*" seul, sans credentials : combinaison
// valide pour une reponse publique. Ne doit PAS etre signale.
export const dynamic = "force-dynamic";

export async function GET() {
  const res = NextResponse.json({ ok: true, scope: "fixture CORS (piege)" });
  res.headers.set("Access-Control-Allow-Origin", "*");
  return res;
}
