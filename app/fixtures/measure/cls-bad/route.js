import { htmlPage, htmlResponse } from "../_lib/html";

export const dynamic = "force-dynamic";

// Fixture "CLS" (VRAI) — bandeau de 320px (id: measure-cls-banner) insere
// ~1s apres le chargement, AU-DESSUS d'un bloc de contenu qui remplit/depasse
// l'ecran (min-height:1400px, texte reel visible). Le conteneur n'a AUCUNE
// hauteur reservee au depart -> le bloc de contenu entier, largement visible
// a l'ecran, est repousse de 320px vers le bas : impact de decalage maximal
// (grande fraction de l'ecran deplacee x grande distance).
export async function GET() {
  const fillerParagraphs = Array.from(
    { length: 15 },
    (_, i) => `<p>Paragraphe de contenu ${i + 1} — remplit visuellement l'ecran pour que le decalage soit mesurable.</p>`
  ).join("");

  return htmlResponse(
    htmlPage({
      head: `<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Preuve CLS (sans espace reserve)</title>`,
      body: `
        <div id="measure-cls-slot"></div>
        <div id="measure-cls-content" style="min-height:1400px">
          <h1>Preuve : decalage de mise en page (CLS)</h1>
          <p>Un bandeau de 320px est insere ~1s apres le chargement, sans espace reserve, au-dessus de ce bloc qui remplit l'ecran.</p>
          ${fillerParagraphs}
        </div>
        <script>
          setTimeout(function () {
            var banner = document.createElement("div");
            banner.id = "measure-cls-banner";
            banner.style.height = "320px";
            banner.style.background = "#fde68a";
            banner.style.display = "flex";
            banner.style.alignItems = "center";
            banner.style.justifyContent = "center";
            banner.style.fontSize = "20px";
            banner.textContent = "Bandeau insere apres coup, sans espace reserve (320px)";
            document.getElementById("measure-cls-slot").appendChild(banner);
          }, 1000);
        </script>
      `,
    })
  );
}
