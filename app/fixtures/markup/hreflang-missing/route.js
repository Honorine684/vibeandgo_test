import { htmlPage, htmlResponse } from "../_lib/html";

export const dynamic = "force-dynamic";

// Fixture "liens FR|EN sans hreflang" (VRAI).
export async function GET() {
  return htmlResponse(
    htmlPage({
      head: `<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Preuve hreflang absent</title>`,
      body: `<h1>Preuve : liens FR | EN sans hreflang</h1><p><a href="/fixtures/markup/hreflang-missing">FR</a> | <a href="/fixtures/markup/hreflang-present">EN</a></p>`,
    })
  );
}
