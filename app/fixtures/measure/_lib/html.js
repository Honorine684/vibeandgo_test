// Helper partage par la famille /fixtures/measure/*. Dossier prefixe par "_"
// -> exclu du routage par l'App Router.
export function htmlPage({ lang = "fr", head = "", body = "" }) {
  const langAttr = lang === null ? "" : ` lang="${lang}"`;
  return `<!doctype html><html${langAttr}><head>${head}</head><body>${body}</body></html>`;
}

export function htmlResponse(html) {
  return new Response(html, {
    status: 200,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store, no-cache, must-revalidate",
    },
  });
}
