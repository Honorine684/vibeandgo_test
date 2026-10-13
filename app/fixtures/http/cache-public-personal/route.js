import { NextResponse } from "next/server";

// Fixture "API_CACHE_PUBLIC" (VRAI) — donnees personnelles fictives (email,
// telephone) servies avec Cache-Control: public -> un cache partage (CDN, proxy)
// peut stocker et reservir ces donnees a d'autres utilisateurs.
export const dynamic = "force-dynamic";

export async function GET() {
  const res = NextResponse.json({
    user: { email: "alice@example.test", phone: "+33600000001" },
  });
  res.headers.set("Cache-Control", "public, max-age=3600");
  return res;
}
