import { htmlPage, htmlResponse } from "../_lib/html";

export const dynamic = "force-dynamic";

// Fixture "Open Graph incomplet" (VRAI) — og:title present, og:image absent.
export async function GET() {
  return htmlResponse(
    htmlPage({
      head: `<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Preuve OG incomplet</title><meta property="og:title" content="Preuve OG incomplet">`,
      body: `<h1>Preuve : Open Graph incomplet</h1><p>og:title est present, og:image est absent.</p>`,
    })
  );
}
