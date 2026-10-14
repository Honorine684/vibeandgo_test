import { htmlPage, htmlResponse } from "../_lib/html";

export const dynamic = "force-dynamic";

// Fixture "LCP lent" (VRAI) — grande image d'en-tete (id: measure-lcp-image)
// servie par /fixtures/measure/lcp-image, retenue ~5s cote serveur.
export async function GET() {
  return htmlResponse(
    htmlPage({
      head: `<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Preuve LCP lent</title>`,
      body: `
        <h1>Preuve : LCP lent</h1>
        <p>L'image d'en-tete ci-dessous (id="measure-lcp-image") met ~5s a arriver.</p>
        <img id="measure-lcp-image" src="/fixtures/measure/lcp-image" alt="Image d'en-tete lente" width="1200" height="400">
      `,
    })
  );
}
