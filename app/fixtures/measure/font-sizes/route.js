import { htmlPage, htmlResponse } from "../_lib/html";

export const dynamic = "force-dynamic";

// Fixture "taille de texte" — VRAI : texte 10px. PIEGE : texte 16px (lisible).
export async function GET() {
  return htmlResponse(
    htmlPage({
      head: `<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Preuve taille de texte</title>`,
      body: `
        <h1>Preuve : taille de texte</h1>
        <section>
          <h2>Cas VRAI — texte 10px</h2>
          <p id="measure-text-10" style="font-size:10px">Ce texte fait 10 pixels de hauteur de police, illisible sur mobile.</p>
        </section>
        <section>
          <h2>Piege — texte 16px</h2>
          <p id="measure-text-16" style="font-size:16px">Ce texte fait 16 pixels de hauteur de police, une taille confortable.</p>
        </section>
      `,
    })
  );
}
