import { htmlPage, htmlResponse } from "../_lib/html";

export const dynamic = "force-dynamic";

// Fixture "premier affichage lent" (VRAI) — retient TOUTE la reponse ~4s cote
// serveur avant d'envoyer le moindre octet (meme technique que
// /fixtures/preuves/slow-cwv) : aucun shell/layout ne peut peindre avant,
// donc FCP > 4s de facon deterministe.
export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 4000));
  return htmlResponse(
    htmlPage({
      head: `<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Preuve premier affichage lent</title>`,
      body: `<h1>Preuve : premier affichage retenu ~4s cote serveur</h1>`,
    })
  );
}
