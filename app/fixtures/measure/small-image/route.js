import { htmlPage, htmlResponse } from "../_lib/html";

export const dynamic = "force-dynamic";

// Fixture "petite image WebP" (PIEGE) — public/measure-small.webp, 142 octets.
// Ne doit PAS etre signalee.
export async function GET() {
  return htmlResponse(
    htmlPage({
      head: `<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Preuve petite image</title>`,
      body: `<h1>Preuve : petite image WebP (piege)</h1><img id="measure-small-image" src="/measure-small.webp" alt="Petite image" width="200" height="150">`,
    })
  );
}
