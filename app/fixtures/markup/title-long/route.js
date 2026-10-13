import { htmlPage, htmlResponse } from "../_lib/html";

export const dynamic = "force-dynamic";

// Fixture "title de 80 caracteres" (VRAI, trop long) — exactement 80 caracteres.
const TITLE = "Guide complet pour configurer et optimiser votre espace de travail professionnel";

export async function GET() {
  return htmlResponse(
    htmlPage({
      head: `<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${TITLE}</title>`,
      body: `<h1>Preuve : title de 80 caracteres</h1><p>Longueur exacte du title : ${TITLE.length} caracteres.</p>`,
    })
  );
}
