import { htmlPage, htmlResponse } from "../_lib/html";

export const dynamic = "force-dynamic";

// Fixture "title absent" (VRAI) — aucune balise <title> dans le <head>.
export async function GET() {
  return htmlResponse(
    htmlPage({
      head: `<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">`,
      body: `<h1>Preuve : title absent</h1><p>Cette page n'a aucune balise title.</p>`,
    })
  );
}
