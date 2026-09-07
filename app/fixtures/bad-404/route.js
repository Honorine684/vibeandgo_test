// Fixture "PAGE_404_QUALITY" (checklist des 64 checks). Une vraie 404 "pourrie" :
// statut HTTP 404, corps minimal (<20 mots), AUCUN layout partage — pas de header,
// pas de <nav>, pas de footer, pas de lien retour vers l'accueil. C'est l'anti-pattern
// que le check existe pour attraper (impasse non stylee / 404 par defaut du serveur).
//
// Implemente en Route Handler et pas en page.js : un Route Handler renvoie une Response
// brute et n'est jamais enveloppe par app/layout.js. La vraie 404 globale du site
// (app/not-found.js) reste inchangee — elle est une BONNE page 404 (layout complet,
// texte, lien home) et le check a raison de ne pas la flagger (fixture P2.1 intacte).
export function GET() {
  return new Response(
    "<!doctype html><html><head><title>404</title></head><body><h1>404</h1><p>Page introuvable.</p></body></html>",
    { status: 404, headers: { "content-type": "text/html; charset=utf-8" } }
  );
}
