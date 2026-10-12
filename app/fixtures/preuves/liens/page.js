export const metadata = {
  title: "Preuve BROKEN_LINK",
};

// Fixture "BROKEN_LINK" — 2 VRAIS cas (404 reel + soft-404 a 200) + 1 PIEGE
// (lien vers un vrai PDF existant, qui ne doit PAS etre signale).
export default function FixturesPreuvesLiensPage() {
  return (
    <main className="container">
      <h1>Preuve : lien casse (BROKEN_LINK)</h1>

      <h2>Cas VRAIS</h2>
      <ul>
        <li>
          {/* VRAI : cible inexistante -> vrai 404 Next.js (aucune route correspondante). */}
          <a href="/fixtures/preuves/liens/ancienne-offre">Ancienne offre</a>
        </li>
        <li>
          {/* VRAI : cible repond 200 mais affiche "Page introuvable" (soft 404). */}
          <a href="/fixtures/preuves/liens/page-supprimee">Page supprimee</a>
        </li>
      </ul>

      <h2>Piege (ne doit PAS etre signale)</h2>
      <ul>
        <li>
          {/* PIEGE : vrai fichier PDF existant, Content-Type application/pdf, statut 200. */}
          <a href="/preuves-guide.pdf">Telecharger le guide</a>
        </li>
      </ul>
    </main>
  );
}
