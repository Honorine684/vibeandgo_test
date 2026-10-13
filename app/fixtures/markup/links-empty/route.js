import { htmlPage, htmlResponse } from "../_lib/html";

export const dynamic = "force-dynamic";

// Fixture "liens vides" — VRAI : <a href> sans aucun texte visible ni
// aria-label. PIEGE : lien-icone sans texte mais avec aria-label (nom
// accessible present, ne doit PAS etre signale).
export async function GET() {
  return htmlResponse(
    htmlPage({
      head: `<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Preuve liens vides</title>`,
      body: `
        <h1>Preuve : liens vides</h1>
        <section>
          <h2>Cas VRAI</h2>
          <a id="markup-link-empty" href="/fixtures/markup"></a>
        </section>
        <section>
          <h2>Piege (ne doit PAS etre signale)</h2>
          <a id="markup-link-icon-labeled" href="/fixtures/markup" aria-label="Retour a l'accueil des fixtures">🔗</a>
        </section>
      `,
    })
  );
}
