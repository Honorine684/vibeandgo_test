import { htmlPage, htmlResponse } from "../_lib/html";

export const dynamic = "force-dynamic";

// Fixture "canonical relative valide" (PIEGE) — href relatif, auto-reference,
// valide selon la spec. Ne doit PAS etre signale comme casse/incorrect.
export async function GET() {
  return htmlResponse(
    htmlPage({
      head: `<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Preuve canonical relative</title><link rel="canonical" href="/fixtures/markup/canonical-relative-ok">`,
      body: `<h1>Preuve : canonical relative valide (piege)</h1><p>Href relatif, auto-reference, valide.</p>`,
    })
  );
}
