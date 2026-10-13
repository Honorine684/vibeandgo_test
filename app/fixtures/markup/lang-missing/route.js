import { htmlPage, htmlResponse } from "../_lib/html";

export const dynamic = "force-dynamic";

// Fixture "html sans lang" (VRAI).
export async function GET() {
  return htmlResponse(
    htmlPage({
      lang: null,
      head: `<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Preuve lang absent</title>`,
      body: `<h1>Preuve : html sans lang</h1><p>La balise html n'a aucun attribut lang.</p>`,
    })
  );
}
