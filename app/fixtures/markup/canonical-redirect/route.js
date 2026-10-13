import { htmlPage, htmlResponse } from "../_lib/html";

export const dynamic = "force-dynamic";

// Fixture "canonical vers une page qui redirige" (VRAI) — cible
// /fixtures/markup/redirect-target, qui renvoie un 302.
export async function GET() {
  return htmlResponse(
    htmlPage({
      head: `<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Preuve canonical redirection</title><link rel="canonical" href="https://vibeandgotest.vercel.app/fixtures/markup/redirect-target">`,
      body: `<h1>Preuve : canonical vers une page qui redirige</h1><p>La canonical pointe vers une URL qui renvoie un 302.</p>`,
    })
  );
}
