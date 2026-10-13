export const metadata = {
  title: "Preuve MIXED_CONTENT (image)",
};

// Fixture "MIXED_CONTENT" (VRAI, mineur) — page HTTPS chargeant une image en
// http:// (contenu passif). Meme ressource que le bug sitewide deja documente
// sur la page d'accueil (BUGS.md), isolee ici sur sa propre page.
export default function FixturesHttpMixedContentImagePage() {
  return (
    <main className="container">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <h1>Preuve : contenu mixte passif (MIXED_CONTENT, mineur)</h1>
      <p>Cette page charge une image en http:// sur une page servie en HTTPS.</p>
      <img src="http://www.w3.org/Icons/w3c_home" alt="Ressource chargee en http" />
    </main>
  );
}
