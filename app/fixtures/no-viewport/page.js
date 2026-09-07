// Fixture "SEO_MISSING_VIEWPORT" (checklist des 64 checks). Le viewport global du site
// est correct depuis le fix du 2026-08-13 (voir app/layout.js, BUGS.md "Bugs corriges").
// Cette route exporte son propre `viewport`, ce qui remplace celui du RootLayout pour
// cette page precise sans toucher au reste du site : largeur fixe 1024px au lieu de
// device-width, exactement l'ancien bug sitewide, isole ici.
export const viewport = {
  width: 1024,
};

export const metadata = {
  title: "Fixture viewport",
};

export default function NoViewportPage() {
  return (
    <main className="container">
      <h1>Fixture : viewport non responsive</h1>
      <p>Cette page force un viewport en largeur fixe (1024px) au lieu de device-width.</p>
    </main>
  );
}
