import { htmlPage, htmlResponse } from "../_lib/html";

export const dynamic = "force-dynamic";

// Fixture "CLS" (VRAI) — bandeau (id: measure-cls-banner) insere en haut de
// page ~1s apres le chargement, dans un conteneur SANS hauteur reservee ->
// pousse tout le contenu existant vers le bas (vrai decalage visuel).
export async function GET() {
  return htmlResponse(
    htmlPage({
      head: `<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Preuve CLS (sans espace reserve)</title>`,
      body: `
        <div id="measure-cls-slot"></div>
        <h1>Preuve : decalage de mise en page (CLS)</h1>
        <p>Un bandeau est insere ~1s apres le chargement, sans espace reserve.</p>
        <script>
          setTimeout(function () {
            var banner = document.createElement("div");
            banner.id = "measure-cls-banner";
            banner.textContent = "Bandeau insere apres coup, sans espace reserve";
            banner.style.background = "#fde68a";
            banner.style.padding = "16px";
            document.getElementById("measure-cls-slot").appendChild(banner);
          }, 1000);
        </script>
      `,
    })
  );
}
