// Helper partage par la famille de fixtures /fixtures/markup/*. Dossier prefixe
// par "_" -> exclu du routage par l'App Router (pas une route).
//
// Toutes les pages de cette famille sont des Route Handlers renvoyant du HTML
// brut (pas des page.js + metadata API de Next.js), pour un controle total et
// deterministe du <head> : propriete "un seul par page" comme le <title>, le
// nombre de <h1>, les balises canonical, etc. ne peuvent pas etre produites de
// facon fiable (absentes, dupliquees, vides) via l'API metadata de Next.js, qui
// fusionne/deduplique automatiquement avec le layout racine.
export function htmlPage({ lang = "fr", head = "", body = "" }) {
  const langAttr = lang === null ? "" : ` lang="${lang}"`;
  return `<!doctype html><html${langAttr}><head>${head}</head><body>${body}</body></html>`;
}

export function htmlResponse(html) {
  return new Response(html, {
    status: 200,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}
