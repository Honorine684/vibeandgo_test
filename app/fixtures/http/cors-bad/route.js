import { NextResponse } from "next/server";

// Fixture "CORS_MISCONFIGURED" (VRAI) — combinaison invalide : Origin "*" avec
// credentials autorises. N'importe quel site peut faire une requete authentifiee
// et lire la reponse.
export const dynamic = "force-dynamic";

export async function GET() {
  const res = NextResponse.json({ ok: true, scope: "fixture CORS (vrai)" });
  res.headers.set("Access-Control-Allow-Origin", "*");
  res.headers.set("Access-Control-Allow-Credentials", "true");
  return res;
}
