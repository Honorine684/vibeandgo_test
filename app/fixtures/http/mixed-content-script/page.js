export const metadata = {
  title: "Preuve MIXED_CONTENT (script)",
};

// Fixture "MIXED_CONTENT" (VRAI, majeur) — page HTTPS chargeant un <script> en
// http:// (contenu actif). Le navigateur bloque la requete independamment d'une
// eventuelle redirection vers https plus loin.
export default function FixturesHttpMixedContentScriptPage() {
  return (
    <main className="container">
      <h1>Preuve : contenu mixte actif (MIXED_CONTENT, majeur)</h1>
      <p>Cette page charge un script en http:// sur une page servie en HTTPS.</p>
      {/* eslint-disable-next-line @next/next/no-sync-scripts */}
      <script src="http://www.w3.org/Icons/w3c_home"></script>
    </main>
  );
}
