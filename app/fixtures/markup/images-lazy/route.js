import { htmlPage, htmlResponse } from "../_lib/html";

export const dynamic = "force-dynamic";

// Fixture "lazy loading" — VRAI 1 : image visible immediatement en haut de
// page avec loading="lazy" (devrait etre eager). VRAI 2 : 10 images en bas de
// page SANS lazy (devraient l'etre, sous la ligne de flottaison). PIEGE : 1
// image en bas de page AVEC lazy (usage correct, ne doit PAS etre signale).
export async function GET() {
  const fillerParagraphs = Array.from(
    { length: 20 },
    (_, i) =>
      `<p>Paragraphe de remplissage ${i + 1} — pousse le contenu suivant hors ecran.</p>`
  ).join("");

  const tenImagesNoLazy = Array.from(
    { length: 10 },
    (_, i) =>
      `<img id="markup-img-bottom-${i + 1}" src="/fixtures-http-valid.png" alt="Image bas de page ${i + 1}" width="60" height="40">`
  ).join("");

  return htmlResponse(
    htmlPage({
      head: `<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Preuve lazy loading</title>`,
      body: `
        <h1>Preuve : lazy loading mal utilise</h1>
        <section>
          <h2>Cas VRAI 1 — image visible en haut de page, loading="lazy"</h2>
          <img id="markup-img-top-lazy" src="/fixtures-http-valid.png" alt="Image visible immediatement" loading="lazy" width="120" height="80">
        </section>
        ${fillerParagraphs}
        <section>
          <h2>Cas VRAI 2 — 10 images en bas de page, sans lazy</h2>
          ${tenImagesNoLazy}
        </section>
        <section>
          <h2>Piege — image en bas de page, AVEC lazy (usage correct)</h2>
          <img id="markup-img-bottom-lazy-ok" src="/fixtures-http-valid.png" alt="Image bas de page, lazy correct" loading="lazy" width="60" height="40">
        </section>
      `,
    })
  );
}
