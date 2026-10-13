export const metadata = {
  title: "Preuve XSS (dediee)",
};

// Fixture "XSS_VULNERABILITY" (VRAI) — champ de recherche avec libelle visible,
// valeur reinjectee SANS echappement (dangerouslySetInnerHTML). Page dediee,
// distincte de /fixtures/preuves/recherche et /fixtures/preuves/search (deja
// existantes, conservees telles quelles). /recherche (le vrai site, corrige)
// reste le piege de reference : ne doit pas ressortir.
export default function FixturesPreuvesXssPage({ searchParams }) {
  const q = searchParams?.q;

  return (
    <main className="container">
      <h1>Preuve : XSS (champ de recherche dedie)</h1>
      <form method="GET">
        <div className="field">
          <label htmlFor="preuves-xss-q">Recherche</label>
          <input id="preuves-xss-q" name="q" type="text" defaultValue={q ?? ""} />
        </div>
        <button type="submit" className="btn">
          Rechercher
        </button>
      </form>

      {/* VRAI : valeur du champ "q" reinjectee sans encodage. */}
      {q != null && (
        <div
          className="card"
          dangerouslySetInnerHTML={{ __html: `Resultats pour ${q}` }}
        />
      )}
    </main>
  );
}
