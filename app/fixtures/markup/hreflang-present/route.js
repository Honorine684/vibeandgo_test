import { htmlPage, htmlResponse } from "../_lib/html";

export const dynamic = "force-dynamic";

// Fixture "liens FR|EN avec hreflang" (PIEGE) — ne doit PAS etre signale.
export async function GET() {
  return htmlResponse(
    htmlPage({
      head: `<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Preuve hreflang present</title><link rel="alternate" hreflang="fr" href="https://vibeandgotest.vercel.app/fixtures/markup/hreflang-missing"><link rel="alternate" hreflang="en" href="https://vibeandgotest.vercel.app/fixtures/markup/hreflang-present"><link rel="alternate" hreflang="x-default" href="https://vibeandgotest.vercel.app/fixtures/markup/hreflang-missing">`,
      body: `<h1>Preuve : liens FR | EN avec hreflang (piege)</h1><p><a href="/fixtures/markup/hreflang-missing">FR</a> | <a href="/fixtures/markup/hreflang-present">EN</a></p>`,
    })
  );
}
