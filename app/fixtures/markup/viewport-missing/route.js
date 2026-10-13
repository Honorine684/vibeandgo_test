import { htmlPage, htmlResponse } from "../_lib/html";

export const dynamic = "force-dynamic";

// Fixture "viewport absent" (VRAI) — aucune balise meta viewport.
export async function GET() {
  return htmlResponse(
    htmlPage({
      head: `<meta charset="utf-8"><title>Preuve viewport absent</title>`,
      body: `<h1>Preuve : viewport absent</h1><p>Cette page n'a aucune balise meta viewport.</p>`,
    })
  );
}
