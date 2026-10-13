import { htmlPage, htmlResponse } from "../_lib/html";

export const dynamic = "force-dynamic";

export async function GET() {
  return htmlResponse(
    htmlPage({
      head: `<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Preuves hreflang</title>`,
      body: `
        <h1>Preuves : hreflang</h1>
        <ul>
          <li><a href="/fixtures/markup/hreflang-missing">liens FR | EN sans hreflang (vrai)</a></li>
          <li><a href="/fixtures/markup/hreflang-present">liens FR | EN avec hreflang (piege)</a></li>
        </ul>
      `,
    })
  );
}
