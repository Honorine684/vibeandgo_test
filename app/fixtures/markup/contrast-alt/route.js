import { htmlPage, htmlResponse } from "../_lib/html";

export const dynamic = "force-dynamic";

// Fixture "contraste et alt" — VRAI 1 : texte gris clair sur fond blanc
// (contraste insuffisant). VRAI 2 : img sans alt du tout. PIEGE : img
// alt="" explicite, decorative (pattern reconnu, ne doit PAS etre signale).
export async function GET() {
  return htmlResponse(
    htmlPage({
      head: `<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Preuve contraste et alt</title>`,
      body: `
        <h1>Preuve : contraste faible et images sans alt</h1>
        <section>
          <h2>Cas VRAI 1 — texte gris clair sur fond blanc</h2>
          <p id="markup-low-contrast" style="color:#e0e0e0;background:#ffffff">Ce texte a un contraste tres insuffisant sur ce fond.</p>
        </section>
        <section>
          <h2>Cas VRAI 2 — image sans attribut alt</h2>
          <img id="markup-img-no-alt" src="/fixtures-http-valid.png" width="120" height="80">
        </section>
        <section>
          <h2>Piege — image decorative, alt="" explicite</h2>
          <img id="markup-img-alt-empty" src="/fixtures-http-valid.png" alt="" width="120" height="80">
        </section>
      `,
    })
  );
}
