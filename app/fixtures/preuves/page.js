export const metadata = {
  title: "Preuves scanner (6 types)",
};

// Hub de fixtures "preuves" — un VRAI cas + des PIEGES par type de bug, pour
// valider que le scanner detecte vraiment ce qu'il pretend detecter, sans faux
// positif sur les cas qui ressemblent au bug sans en etre un. Ne touche a AUCUNE
// fixture existante (slow/*, spa/*, ai-generic-look*, forms, ui, etc.).
//
// Budget crawl : cette page = 1 clic depuis l'accueil (lien ajoute uniquement
// sur app/page.js, pas dans le layout partage). Chaque sous-page ci-dessous =
// 2 clics depuis l'accueil. Les cibles de liens cassés/PDF sur /liens sont a
// 3 clics mais sont des pages terminales (aucun lien sortant), pas des pages
// de preuve a part entiere.
export default function FixturesPreuvesPage() {
  return (
    <main className="container">
      <h1>Fixtures : preuves (6 types de bugs)</h1>
      <p>
        Chaque page ci-dessous contient un cas VRAI (a detecter) et des pieges
        (a ne PAS signaler).
      </p>

      <ul>
        <li>
          <a href="/fixtures/preuves/layout">Mise en page (LAYOUT_BREAK)</a>
        </li>
        <li>
          <a href="/fixtures/preuves/js-error">Erreur JavaScript (JS_ERROR)</a>
        </li>
        <li>
          <a href="/fixtures/preuves/liens">Lien casse (BROKEN_LINK)</a>
        </li>
        <li>
          <a href="/fixtures/preuves/paiement">Bouton de paiement (PAYMENT_BUTTON_ERROR)</a>
        </li>
        <li>
          <a href="/fixtures/preuves/paiement-formulaire">
            Bouton de paiement — piege formulaire (PAYMENT_BUTTON_ERROR)
          </a>
        </li>
        <li>
          <a href="/fixtures/preuves/secret">Donnee sensible (SENSITIVE_DATA_EXPOSED)</a>
        </li>
        <li>
          <a href="/fixtures/preuves/recherche">XSS via formulaire GET (XSS_VULNERABILITY)</a>
        </li>
        <li>
          <a href="/fixtures/preuves/recherche-sure">XSS — piege (recherche correctement encodee)</a>
        </li>
        <li>
          <a href="/fixtures/preuves/search?query=test">XSS via parametre d&apos;URL (XSS_VULNERABILITY)</a>
        </li>
      </ul>
    </main>
  );
}
