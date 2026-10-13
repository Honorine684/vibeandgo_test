import { htmlPage, htmlResponse } from "../_lib/html";

export const dynamic = "force-dynamic";

// Fixture "meta description de 200 caracteres" (VRAI, trop longue) — exactement
// 200 caracteres.
const DESCRIPTION =
  "Decouvrez notre plateforme complete de gestion de projets, concue pour les equipes modernes qui veulent livrer plus vite, mieux collaborer et garder une visibilite totale sur chaque etape du travail !";

export async function GET() {
  return htmlResponse(
    htmlPage({
      head: `<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Preuve description longue</title><meta name="description" content="${DESCRIPTION}">`,
      body: `<h1>Preuve : meta description de 200 caracteres</h1><p>Longueur exacte : ${DESCRIPTION.length} caracteres.</p>`,
    })
  );
}
