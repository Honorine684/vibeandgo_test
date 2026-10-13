import { htmlPage, htmlResponse } from "../_lib/html";

export const dynamic = "force-dynamic";

// Fixture "canonical absente" (VRAI).
export async function GET() {
  return htmlResponse(
    htmlPage({
      head: `<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Preuve canonical absente</title>`,
      body: `<h1>Preuve : canonical absente</h1><p>Aucune balise link rel=canonical.</p>`,
    })
  );
}
