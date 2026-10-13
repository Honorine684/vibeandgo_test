import { htmlPage, htmlResponse } from "../_lib/html";

export const dynamic = "force-dynamic";

export async function GET() {
  return htmlResponse(
    htmlPage({
      head: `<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Preuves description</title>`,
      body: `
        <h1>Preuves : meta description</h1>
        <ul>
          <li><a href="/fixtures/markup/description-missing">description absente (vrai)</a></li>
          <li><a href="/fixtures/markup/description-long">description de 200 caracteres (vrai)</a></li>
        </ul>
      `,
    })
  );
}
