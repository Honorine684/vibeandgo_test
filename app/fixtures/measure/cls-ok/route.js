import { htmlPage, htmlResponse } from "../_lib/html";

export const dynamic = "force-dynamic";

// Fixture "CLS" (PIEGE) — meme bandeau de 320px insere ~1s apres le
// chargement, au-dessus du meme bloc de contenu qui remplit l'ecran, mais le
// conteneur reserve min-height:320px des le depart -> insertion sans aucun
// decalage visuel. Ne doit PAS etre signale.
export async function GET() {
  const fillerParagraphs = Array.from(
    { length: 15 },
    (_, i) => `<p>Paragraphe de contenu ${i + 1} — remplit visuellement l'ecran.</p>`
  ).join("");

  return htmlResponse(
    htmlPage({
      head: `<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Preuve CLS (espace reserve)</title>`,
      body: `
        <div id="measure-cls-slot" style="min-height:320px"></div>
        <div id="measure-cls-content" style="min-height:1400px">
          <h1>Preuve : espace reserve a l'avance (piege CLS)</h1>
          <p>Un bandeau de 320px est insere ~1s apres le chargement, dans un emplacement deja reserve (min-height:320px) au-dessus de ce bloc qui remplit l'ecran.</p>
          ${fillerParagraphs}
        </div>
        <script>
          setTimeout(function () {
            var banner = document.createElement("div");
            banner.id = "measure-cls-banner-ok";
            banner.style.height = "320px";
            banner.style.background = "#dcfce7";
            banner.style.display = "flex";
            banner.style.alignItems = "center";
            banner.style.justifyContent = "center";
            banner.style.fontSize = "20px";
            banner.textContent = "Bandeau insere dans un espace deja reserve (320px)";
            document.getElementById("measure-cls-slot").appendChild(banner);
          }, 1000);
        </script>
      `,
    })
  );
}
