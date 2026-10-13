import { htmlPage, htmlResponse } from "../_lib/html";

export const dynamic = "force-dynamic";

export async function GET() {
  return htmlResponse(
    htmlPage({
      head: `<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Preuves viewport</title>`,
      body: `
        <h1>Preuves : balise viewport</h1>
        <ul>
          <li><a href="/fixtures/markup/viewport-missing">viewport absent (vrai)</a></li>
          <li><a href="/fixtures/markup/viewport-fixed">viewport width=1024 (vrai, non responsive)</a></li>
        </ul>
      `,
    })
  );
}
