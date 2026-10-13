import { htmlPage, htmlResponse } from "../_lib/html";

export const dynamic = "force-dynamic";

// Fixture "page sans h1" (VRAI).
export async function GET() {
  return htmlResponse(
    htmlPage({
      head: `<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Preuve h1 absent</title>`,
      body: `<p style="font-size:24px;font-weight:700">Preuve : h1 absent</p><p>Cette page n'a aucune balise h1 (le titre visuel ci-dessus est un paragraphe stylise).</p>`,
    })
  );
}
