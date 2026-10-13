import { htmlPage, htmlResponse } from "./_lib/html";

export const dynamic = "force-dynamic";

// Hub de la famille "balisage de la page" — 15 types, un VRAI cas + piege
// quand c'est pertinent. Route Handler (HTML brut) comme toutes les pages de
// cette famille, pour un controle total du <head>. Regroupe les familles
// nombreuses (title/description/h1/viewport/canonical/hreflang) derriere une
// page de categorie intermediaire pour rester sous 20 liens par page ; les cas
// uniques restent lies directement.
export async function GET() {
  return htmlResponse(
    htmlPage({
      head: `<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Preuves balisage de la page</title>`,
      body: `
        <h1>Fixtures : balisage de la page (/fixtures/markup)</h1>
        <ul>
          <li><a href="/fixtures/markup/title">1. Balise title (3 cas)</a></li>
          <li><a href="/fixtures/markup/description">2. Meta description (2 cas)</a></li>
          <li><a href="/fixtures/markup/h1">3. Balise h1 (3 cas)</a></li>
          <li><a href="/fixtures/markup/og-incomplete">4. Open Graph incomplet</a></li>
          <li><a href="/fixtures/markup/viewport">5. Balise viewport (2 cas)</a></li>
          <li><a href="/fixtures/markup/lang-missing">6. html sans lang</a></li>
          <li><a href="/fixtures/markup/canonical">7. Balise canonical (7 cas)</a></li>
          <li><a href="/fixtures/markup/hreflang">8. hreflang (2 cas)</a></li>
          <li><a href="/fixtures/markup/links-empty">9. Liens vides</a></li>
          <li><a href="/fixtures/markup/inputs-labels">10. Champs sans label</a></li>
          <li><a href="/fixtures/markup/images-lazy">11. Lazy loading mal utilise</a></li>
          <li><a href="/fixtures/markup/contrast-alt">12. Contraste et alt</a></li>
          <li><a href="/fixtures/markup/password-autocomplete">13. Mot de passe autocomplete=on</a></li>
          <li><a href="/fixtures/markup/form-token">14. Formulaire sans jeton CSRF</a></li>
          <li><a href="/fixtures/markup/file-input">15. Input file sans accept</a></li>
        </ul>
      `,
    })
  );
}
