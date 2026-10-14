import { htmlPage, htmlResponse } from "../_lib/html";

export const dynamic = "force-dynamic";

// Fixture "cibles tactiles" — VRAI : bouton 30x30 sur mobile (<=480px).
// PIEGES : bouton 48x48 (taille correcte) ; lien inline dans un paragraphe de
// texte (taille normale pour un lien de prose, ne doit pas etre juge comme un
// "bouton" trop petit).
export async function GET() {
  return htmlResponse(
    htmlPage({
      head: `<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Preuve cibles tactiles</title>
        <style>
          .measure-btn-30 { width: 160px; height: 44px; }
          @media (max-width: 480px) {
            .measure-btn-30 { width: 30px; height: 30px; font-size: 0; padding: 0; overflow: hidden; }
          }
        </style>`,
      body: `
        <h1>Preuve : cibles tactiles</h1>
        <section>
          <h2>Cas VRAI — bouton 30x30 sur mobile (normal 160x44 sur desktop)</h2>
          <button id="measure-btn-30" class="measure-btn-30" type="button">Commander</button>
        </section>
        <section>
          <h2>Piege — bouton 48x48 (taille correcte)</h2>
          <button id="measure-btn-48" type="button" style="width:48px;height:48px">OK</button>
        </section>
        <section>
          <h2>Piege — lien inline dans un paragraphe</h2>
          <p>Ceci est un paragraphe de texte courant avec un <a id="measure-link-inline" href="/fixtures/measure">lien inline</a> au milieu de la phrase, comme dans une prose normale.</p>
        </section>
      `,
    })
  );
}
