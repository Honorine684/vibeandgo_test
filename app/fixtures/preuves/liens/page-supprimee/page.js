export const metadata = {
  title: "Page introuvable (test)",
};

// Fixture "BROKEN_LINK" (VRAI, cas "soft 404") : statut HTTP 200 reel, mais le
// contenu affiche "Page introuvable" — comme /produit/999 (voir BUGS.md),
// mais isole ici, dediee a cette preuve.
export default function PreuvesLiensPageSupprimeePage() {
  return (
    <main className="container">
      <h1>Page introuvable</h1>
      <p>Le contenu que vous recherchez a ete supprime ou n&apos;existe plus.</p>
    </main>
  );
}
