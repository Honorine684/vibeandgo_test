import { htmlPage, htmlResponse } from "../_lib/html";

export const dynamic = "force-dynamic";

// Fixture "canonical vers une page 404" (VRAI) — cible inexistante, aucune
// route ne correspond -> vrai 404.
export async function GET() {
  return htmlResponse(
    htmlPage({
      head: `<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Preuve canonical 404</title><link rel="canonical" href="https://vibeandgotest.vercel.app/fixtures/markup/canonical-404-cible-inexistante">`,
      body: `<h1>Preuve : canonical vers une page 404</h1><p>La canonical pointe vers une URL qui renvoie 404.</p>`,
    })
  );
}
