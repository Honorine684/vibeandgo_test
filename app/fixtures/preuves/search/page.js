export const metadata = {
  title: "Preuve XSS (parametre URL)",
};

// Fixture "XSS_VULNERABILITY" (VRAI) — reflexion directe du parametre d'URL
// ?query= sans encodage, sans passer par un formulaire. Sert a verifier la
// detection par sondage de parametre, distincte du cas formulaire de
// /fixtures/preuves/recherche.
export default function FixturesPreuvesSearchPage({ searchParams }) {
  const query = searchParams?.query;

  return (
    <main className="container">
      <h1>Preuve : XSS via parametre d&apos;URL</h1>
      <p>Exemple : /fixtures/preuves/search?query=valeur</p>

      {query != null && (
        <div
          className="card"
          dangerouslySetInnerHTML={{ __html: `Resultats pour ${query}` }}
        />
      )}
    </main>
  );
}
