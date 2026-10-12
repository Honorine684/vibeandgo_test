export const metadata = {
  title: "Preuve XSS (formulaire)",
};

// Fixture "XSS_VULNERABILITY" (VRAI) — formulaire GET, champ name="q", dont la
// valeur est reinjectee SANS encodage via dangerouslySetInnerHTML. Isolee de
// /recherche (corrigee, voir BUGS.md) et de /spa (XSS deja existante).
export default function FixturesPreuvesReecherchePage({ searchParams }) {
  const q = searchParams?.q;

  return (
    <main className="container">
      <h1>Preuve : XSS via formulaire GET</h1>
      <form method="GET">
        <div className="field">
          <label htmlFor="preuves-recherche-q">Recherche</label>
          <input id="preuves-recherche-q" name="q" type="text" defaultValue={q ?? ""} />
        </div>
        <button type="submit" className="btn">
          Rechercher
        </button>
      </form>

      {q != null && (
        <div
          className="card"
          dangerouslySetInnerHTML={{ __html: `Resultats pour ${q}` }}
        />
      )}
    </main>
  );
}
