import { htmlPage, htmlResponse } from "../_lib/html";

export const dynamic = "force-dynamic";

// Fixture "chargement complet lent" (VRAI) — le HTML arrive instantanement
// (premier affichage rapide), mais une sous-ressource (petite image 1x1, non
// visible significativement) retenue ~7s cote serveur retarde l'evenement
// "load" de la page d'environ 7s.
export async function GET() {
  return htmlResponse(
    htmlPage({
      head: `<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Preuve chargement complet lent</title>`,
      body: `
        <h1>Preuve : page qui met ~7s a charger completement</h1>
        <p>Le HTML de cette page arrive vite ; une sous-ressource retarde l'evenement "load" d'environ 7s.</p>
        <img src="/fixtures/measure/load-slow-resource" alt="" width="1" height="1" style="position:absolute;opacity:0">
      `,
    })
  );
}
