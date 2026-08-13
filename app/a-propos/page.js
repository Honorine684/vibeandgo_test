export const metadata = {
  title: "A propos",
  description: "A propos de VibeAndGo, site de demonstration QA.",
};

// FIX (FIABILITE): cette page n'existait pas, le lien depuis l'accueil menait a une 404.
export default function AProposPage() {
  return (
    <main className="container">
      <h1>A propos de VibeAndGo</h1>
      <p>
        VibeAndGo est un site de demonstration utilise pour valider des outils de scan
        QA et securite automatises. La plupart des pages de ce site contiennent des bugs
        injectes volontairement — voir BUGS.md dans le depot pour la liste complete.
      </p>
    </main>
  );
}
