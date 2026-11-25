import { NextResponse } from "next/server";

// Fixture "Pages a ne jamais tester" : cible POST sous /checkout (chemin exclu), appelee
// par le vrai formulaire de CheckoutForm.js. Ne doit jamais etre atteinte si l'exclusion
// de /checkout fonctionne. Reponse factice, aucune donnee reellement traitee ou stockee.
export async function POST() {
  return NextResponse.json({ ok: true, paid: false });
}
