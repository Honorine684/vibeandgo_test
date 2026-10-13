import { htmlPage, htmlResponse } from "../_lib/html";

export const dynamic = "force-dynamic";

// Fixture "meta description absente" (VRAI).
export async function GET() {
  return htmlResponse(
    htmlPage({
      head: `<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Preuve description absente</title>`,
      body: `<h1>Preuve : meta description absente</h1><p>Cette page n'a aucune balise meta description.</p>`,
    })
  );
}
