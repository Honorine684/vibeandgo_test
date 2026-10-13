import { htmlPage, htmlResponse } from "../_lib/html";

export const dynamic = "force-dynamic";

// Fixture "champs sans label" — 2 VRAIS (aucun label du tout ; placeholder
// seul) + 1 PIEGE (aria-label, nom accessible present).
export async function GET() {
  return htmlResponse(
    htmlPage({
      head: `<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Preuve champs sans label</title>`,
      body: `
        <h1>Preuve : champs sans label accessible</h1>
        <form>
          <section>
            <h2>Cas VRAI 1 — aucun label, aucun aria-label, aucun placeholder</h2>
            <input id="markup-input-nolabel" name="nolabel" type="text">
          </section>
          <section>
            <h2>Cas VRAI 2 — placeholder seul (pas un substitut de label)</h2>
            <input id="markup-input-placeholder" name="placeholder" type="text" placeholder="Votre nom">
          </section>
          <section>
            <h2>Piege — aria-label (nom accessible present, ne doit PAS etre signale)</h2>
            <input id="markup-input-arialabel" name="arialabel" type="text" aria-label="Votre nom">
          </section>
        </form>
      `,
    })
  );
}
