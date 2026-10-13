import { htmlPage, htmlResponse } from "../_lib/html";

export const dynamic = "force-dynamic";

export async function GET() {
  return htmlResponse(
    htmlPage({
      head: `<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Preuves canonical</title>`,
      body: `
        <h1>Preuves : balise canonical</h1>
        <ul>
          <li><a href="/fixtures/markup/canonical-missing">canonical absente (vrai)</a></li>
          <li><a href="/fixtures/markup/canonical-empty">canonical vide (vrai)</a></li>
          <li><a href="/fixtures/markup/canonical-duplicate">deux balises canonical (vrai)</a></li>
          <li><a href="/fixtures/markup/canonical-404">canonical vers une page 404 (vrai)</a></li>
          <li><a href="/fixtures/markup/canonical-redirect">canonical vers une page qui redirige (vrai)</a></li>
          <li><a href="/fixtures/markup/canonical-cross-domain">canonical vers un autre domaine (vrai)</a></li>
          <li><a href="/fixtures/markup/canonical-relative-ok">canonical relative valide (piege)</a></li>
        </ul>
      `,
    })
  );
}
