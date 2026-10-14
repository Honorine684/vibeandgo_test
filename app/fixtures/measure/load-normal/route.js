import { htmlPage, htmlResponse } from "../_lib/html";

export const dynamic = "force-dynamic";

// Fixture "page normale" (PIEGE) — aucune retenue, tout charge vite. Ne doit
// PAS etre signalee comme lente.
export async function GET() {
  return htmlResponse(
    htmlPage({
      head: `<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Preuve page normale</title>`,
      body: `<h1>Preuve : page normale (piege)</h1><p>Cette page ne retient rien, elle charge normalement.</p>`,
    })
  );
}
