import { htmlPage, htmlResponse } from "../_lib/html";

export const dynamic = "force-dynamic";

// Fixture "title de 30 caracteres" (PIEGE — longueur raisonnable, ne doit PAS
// etre signale comme trop long/court).
const TITLE = "Guide de demarrage rapide ici.";

export async function GET() {
  return htmlResponse(
    htmlPage({
      head: `<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${TITLE}</title>`,
      body: `<h1>Preuve : title de 30 caracteres (piege)</h1><p>Longueur exacte du title : ${TITLE.length} caracteres.</p>`,
    })
  );
}
