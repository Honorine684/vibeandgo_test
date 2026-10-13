import { htmlPage, htmlResponse } from "../_lib/html";

export const dynamic = "force-dynamic";

export async function GET() {
  return htmlResponse(
    htmlPage({
      head: `<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Preuves h1</title>`,
      body: `
        <h1>Preuves : balise h1</h1>
        <ul>
          <li><a href="/fixtures/markup/h1-missing">page sans h1 (vrai)</a></li>
          <li><a href="/fixtures/markup/h1-duplicate">page avec 2 h1 (vrai)</a></li>
          <li><a href="/fixtures/markup/h1-delayed">1 h1 rendu apres un fetch de 1s (piege)</a></li>
        </ul>
      `,
    })
  );
}
