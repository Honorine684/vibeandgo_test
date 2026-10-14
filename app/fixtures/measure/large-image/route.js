import { htmlPage, htmlResponse } from "../_lib/html";

export const dynamic = "force-dynamic";

// Fixture "image lourde" (VRAI) — public/measure-large.png, ~1,03 Mo (PNG de
// bruit aleatoire, incompressible, > 500 Ko).
export async function GET() {
  return htmlResponse(
    htmlPage({
      head: `<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Preuve image lourde</title>`,
      body: `<h1>Preuve : image PNG de plus de 500 Ko</h1><img id="measure-large-image" src="/measure-large.png" alt="Image lourde" width="600" height="600">`,
    })
  );
}
