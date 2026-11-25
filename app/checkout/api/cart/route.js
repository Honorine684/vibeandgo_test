import { NextResponse } from "next/server";

// Fixture "Pages a ne jamais tester" : cible DELETE sous /checkout (chemin exclu), appelee
// depuis le bouton "Supprimer mon panier" present sur une page NORMALE (accueil). Teste le
// blocage d'un envoi vers un chemin exclu declenche depuis une page autorisee.
export async function DELETE() {
  return NextResponse.json({ ok: true, cleared: true });
}
