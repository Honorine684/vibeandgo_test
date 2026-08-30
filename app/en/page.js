export const metadata = {
  title: "Home",
  description: "English version of the VibeAndGo demo site.",
};

// Fixture P3/C1 (checkHreflang) : version anglaise reelle du site, liee depuis le
// selecteur de langue du footer (app/layout.js), volontairement sans aucune balise
// <link rel="alternate" hreflang="..."> ici ni sur "/" - voir BUGS.md, fixtures P3.
export default function EnglishHomePage() {
  return (
    <main className="container">
      <h1>Welcome to VibeAndGo</h1>
      <p>
        This is the English version of the demo site, used to check whether a scanner
        flags a missing hreflang setup when a site clearly offers more than one
        language version without announcing it properly.
      </p>
      <p>
        <a href="/">Voir la version francaise</a>
      </p>
    </main>
  );
}
