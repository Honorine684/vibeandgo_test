import { htmlPage, htmlResponse } from "./_lib/html";

export const dynamic = "force-dynamic";

// Hub de la famille "mesures" (performance/metriques). 8 types, un VRAI cas +
// piege quand pertinent. Route Handlers (HTML brut) comme les familles
// /fixtures/markup et /fixtures/http precedentes.
export async function GET() {
  return htmlResponse(
    htmlPage({
      head: `<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Preuves mesures</title>`,
      body: `
        <h1>Fixtures : mesures (/fixtures/measure)</h1>
        <ul>
          <li><a href="/fixtures/measure/tap-targets">1. Cibles tactiles (3 cas)</a></li>
          <li><a href="/fixtures/measure/font-sizes">2. Taille de texte (2 cas)</a></li>
          <li><a href="/fixtures/measure/lcp-slow">3. LCP lent (~5s, image id=measure-lcp-image)</a></li>
          <li><a href="/fixtures/measure/cls-bad">4. CLS — bandeau sans espace reserve (vrai)</a></li>
          <li><a href="/fixtures/measure/cls-ok">4. CLS — bandeau avec espace reserve (piege)</a></li>
          <li><a href="/fixtures/measure/fcp-slow">5. Premier affichage lent (~4s)</a></li>
          <li><a href="/fixtures/measure/load-slow">6. Chargement complet lent (~7s)</a></li>
          <li><a href="/fixtures/measure/load-normal">6. Page normale (piege)</a></li>
          <li><a href="/fixtures/measure/large-image">7. Image PNG lourde (&gt;500 Ko)</a></li>
          <li><a href="/fixtures/measure/small-image">7. Petite image WebP (piege)</a></li>
          <li><a href="/fixtures/measure/large-js">8. Fichier JavaScript de plus de 1 Mo</a></li>
        </ul>
      `,
    })
  );
}
