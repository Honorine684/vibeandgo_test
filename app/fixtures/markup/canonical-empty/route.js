import { htmlPage, htmlResponse } from "../_lib/html";

export const dynamic = "force-dynamic";

// Fixture "canonical vide" (VRAI) — href="".
export async function GET() {
  return htmlResponse(
    htmlPage({
      head: `<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Preuve canonical vide</title><link rel="canonical" href="">`,
      body: `<h1>Preuve : canonical vide</h1><p>link rel=canonical avec href="".</p>`,
    })
  );
}
