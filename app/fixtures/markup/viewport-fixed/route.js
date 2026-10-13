import { htmlPage, htmlResponse } from "../_lib/html";

export const dynamic = "force-dynamic";

// Fixture "viewport width=1024" (VRAI, non responsive).
export async function GET() {
  return htmlResponse(
    htmlPage({
      head: `<meta charset="utf-8"><meta name="viewport" content="width=1024"><title>Preuve viewport fixe</title>`,
      body: `<h1>Preuve : viewport fixe (width=1024)</h1><p>Cette page a un viewport non responsive.</p>`,
    })
  );
}
