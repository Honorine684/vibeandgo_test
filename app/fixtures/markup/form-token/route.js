import { htmlPage, htmlResponse } from "../_lib/html";

export const dynamic = "force-dynamic";

// Fixture "jeton CSRF de formulaire" — VRAI : form method=post sans aucun
// champ cache de jeton. PIEGE : meme formulaire avec un champ cache de jeton
// present.
export async function POST() {
  return Response.json({ ok: true });
}

export async function GET() {
  return htmlResponse(
    htmlPage({
      head: `<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Preuve jeton formulaire</title>`,
      body: `
        <h1>Preuve : formulaire POST sans jeton CSRF</h1>
        <section>
          <h2>Cas VRAI — aucun champ cache de jeton</h2>
          <form id="markup-form-no-token" method="post" action="/fixtures/markup/form-token">
            <label for="markup-notoken-email">Email</label>
            <input id="markup-notoken-email" name="email" type="email">
            <button type="submit">Envoyer</button>
          </form>
        </section>
        <section>
          <h2>Piege — champ cache de jeton present</h2>
          <form id="markup-form-with-token" method="post" action="/fixtures/markup/form-token">
            <label for="markup-token-email">Email</label>
            <input id="markup-token-email" name="email" type="email">
            <input type="hidden" name="csrf_token" value="fake-csrf-token-00000000">
            <button type="submit">Envoyer</button>
          </form>
        </section>
      `,
    })
  );
}
