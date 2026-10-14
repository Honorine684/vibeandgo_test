import { htmlPage, htmlResponse } from "../_lib/html";

export const dynamic = "force-dynamic";

// Fixture "CLS" (PIEGE) — meme bandeau insere ~1s apres le chargement, mais
// dans un conteneur dont la hauteur est reservee a l'avance -> aucun decalage
// visuel. Ne doit PAS etre signale.
export async function GET() {
  return htmlResponse(
    htmlPage({
      head: `<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Preuve CLS (espace reserve)</title>`,
      body: `
        <div id="measure-cls-slot" style="min-height:56px"></div>
        <h1>Preuve : espace reserve a l'avance (piege CLS)</h1>
        <p>Un bandeau est insere ~1s apres le chargement, dans un emplacement deja reserve (min-height).</p>
        <script>
          setTimeout(function () {
            var banner = document.createElement("div");
            banner.id = "measure-cls-banner-ok";
            banner.textContent = "Bandeau insere dans un espace deja reserve";
            banner.style.background = "#dcfce7";
            banner.style.padding = "16px";
            document.getElementById("measure-cls-slot").appendChild(banner);
          }, 1000);
        </script>
      `,
    })
  );
}
