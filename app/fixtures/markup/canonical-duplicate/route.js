import { htmlPage, htmlResponse } from "../_lib/html";

export const dynamic = "force-dynamic";

// Fixture "deux balises canonical" (VRAI) — pointant vers 2 URLs differentes,
// ambiguite sur laquelle est l'autoritaire.
export async function GET() {
  return htmlResponse(
    htmlPage({
      head: `<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Preuve canonical dupliquee</title><link rel="canonical" href="https://vibeandgotest.vercel.app/fixtures/markup/canonical-duplicate"><link rel="canonical" href="https://vibeandgotest.vercel.app/fixtures/markup">`,
      body: `<h1>Preuve : deux balises canonical</h1><p>Deux link rel=canonical pointant vers des URLs differentes.</p>`,
    })
  );
}
