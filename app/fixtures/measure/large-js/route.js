import { htmlPage, htmlResponse } from "../_lib/html";

export const dynamic = "force-dynamic";

// Fixture "fichier JS lourd" (VRAI) — reutilise /heavy-fixture.js (deja
// existant, 1 100 156 octets, fixture /fixtures/heavy-js) sans le dupliquer ni
// toucher la fixture existante : juste un nouveau consommateur du meme
// fichier public.
export async function GET() {
  return htmlResponse(
    htmlPage({
      head: `<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Preuve JS lourd</title>`,
      body: `<h1>Preuve : fichier JavaScript de plus de 1 Mo</h1><script src="/heavy-fixture.js" defer></script>`,
    })
  );
}
