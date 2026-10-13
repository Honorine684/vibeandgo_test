// Fixture "h1 rendu apres un fetch de 1s" (PIEGE) — endpoint de donnees utilise
// par /fixtures/markup/h1-delayed. Retient la reponse ~1000ms cote serveur
// (meme pattern que /fixtures/preuves/slow-cwv : force-dynamic + no-store pour
// eviter que le CDN ne mette en cache une reponse instantanee).
export const dynamic = "force-dynamic";

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return Response.json(
    { title: "Titre charge apres 1 seconde" },
    { headers: { "cache-control": "no-store, no-cache, must-revalidate" } }
  );
}
