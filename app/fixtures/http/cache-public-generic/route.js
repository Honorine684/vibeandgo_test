import { NextResponse } from "next/server";

// Fixture "API_CACHE_PUBLIC" (PIEGE) — meme en-tete Cache-Control: public, mais
// sur des donnees generiques/publiques (aucune donnee personnelle). Ne doit PAS
// etre signale.
export const dynamic = "force-dynamic";

export async function GET() {
  const res = NextResponse.json({
    articles: [
      { id: 1, title: "Comment bien demarrer" },
      { id: 2, title: "Nouveautes du produit" },
    ],
  });
  res.headers.set("Cache-Control", "public, max-age=3600");
  return res;
}
