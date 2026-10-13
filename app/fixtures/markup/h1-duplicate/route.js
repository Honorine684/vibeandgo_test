import { htmlPage, htmlResponse } from "../_lib/html";

export const dynamic = "force-dynamic";

// Fixture "page avec 2 h1" (VRAI).
export async function GET() {
  return htmlResponse(
    htmlPage({
      head: `<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Preuve 2 h1</title>`,
      body: `<h1>Preuve : deux balises h1</h1><p>Il y a une seconde balise h1 plus bas sur cette page.</p><h1>Seconde balise h1</h1>`,
    })
  );
}
