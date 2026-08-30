export const metadata = {
  title: "A propos",
  description: "A propos de VibeAndGo, site de demonstration QA.",
  // Fixture P3/C1 (checkCanonical) : balise canonical pointant vers une URL qui n'existe
  // pas (404) - sert a declencher le check canonical, qui ne tourne aujourd'hui jamais sur
  // le chemin MPA. Voir BUGS.md, section fixtures P3.
  alternates: {
    canonical: "/a-propos-2019",
  },
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
