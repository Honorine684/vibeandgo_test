// Fixtures "PERFORMANCE" (MAJOR, >6s) + "LCP_POOR" (>4000ms) + "FCP_SLOW" (>3000ms)
// — checklist des 64 checks.
//
// Version precedente : async Server Component avec `await sleep(7000)`. Probleme : Next.js
// App Router stream le shell du RootLayout (html/head/header/nav) AVANT le contenu de la
// page, donc FCP se declenchait tot sur la nav peinte -> seul le PERFORMANCE generique
// (load event) depassait son seuil, pas FCP/LCP.
//
// Ici : Route Handler qui retient TOUTE la reponse ~6,5s avant d'envoyer le moindre octet.
// Aucun layout, aucun streaming -> le TTFB est le plancher : FCP, LCP ET load se
// declenchent tous apres ~6,5s, de facon deterministe (6500 > 6000 > 4000 > 3000).
// Sans ca, Next.js evalue le Route Handler GET au build (cache statique) : le sleep
// ne tourne qu'une fois pendant `next build` et la reponse deployee est instantanee.
export const dynamic = "force-dynamic";

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 6500));
  return new Response(
    "<!doctype html><html lang=\"fr\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"><meta name=\"description\" content=\"Fixture de test : la reponse serveur est volontairement retenue environ 6,5 secondes avant l'envoi du HTML.\"><title>Fixture perf lente</title></head><body><h1>Fixture : reponse serveur retenue ~6,5s</h1><p>Le serveur attend avant d'envoyer le HTML.</p></body></html>",
    {
      status: 200,
      headers: {
        "content-type": "text/html; charset=utf-8",
        // Sans ca le CDN Vercel cache la reponse 200 et ressert le corps sans jamais
        // repasser par la fonction (donc sans le hold de 6,5s).
        "cache-control": "no-store, no-cache, must-revalidate",
      },
    }
  );
}
