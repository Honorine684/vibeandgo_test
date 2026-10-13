import { htmlPage, htmlResponse } from "../_lib/html";

export const dynamic = "force-dynamic";

export async function GET() {
  return htmlResponse(
    htmlPage({
      head: `<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Preuves title</title>`,
      body: `
        <h1>Preuves : balise title</h1>
        <ul>
          <li><a href="/fixtures/markup/title-missing">title absent (vrai)</a></li>
          <li><a href="/fixtures/markup/title-long">title de 80 caracteres (vrai)</a></li>
          <li><a href="/fixtures/markup/title-short">title de 30 caracteres (piege)</a></li>
        </ul>
      `,
    })
  );
}
