import { htmlPage, htmlResponse } from "../_lib/html";

export const dynamic = "force-dynamic";

// Fixture "canonical vers un autre domaine" (VRAI).
export async function GET() {
  return htmlResponse(
    htmlPage({
      head: `<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Preuve canonical autre domaine</title><link rel="canonical" href="https://example.com/">`,
      body: `<h1>Preuve : canonical vers un autre domaine</h1><p>La canonical pointe vers https://example.com/.</p>`,
    })
  );
}
