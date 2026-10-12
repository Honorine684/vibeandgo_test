export const metadata = {
  title: "Preuve XSS (piege)",
};

// Fixture "XSS_VULNERABILITY" (PIEGE) — meme UI que /fixtures/preuves/recherche,
// mais la valeur est rendue via l'interpolation JSX classique {q}, qui echappe
// automatiquement le HTML. Ne doit PAS etre signalee.
export default function FixturesPreuvesReechercheSurePage({ searchParams }) {
  const q = searchParams?.q;

  return (
    <main className="container">
      <h1>Preuve : recherche correctement encodee (piege XSS)</h1>
      <form method="GET">
        <div className="field">
          <label htmlFor="preuves-recherche-sure-q">Recherche</label>
          <input id="preuves-recherche-sure-q" name="q" type="text" defaultValue={q ?? ""} />
        </div>
        <button type="submit" className="btn">
          Rechercher
        </button>
      </form>

      {q != null && <p className="card">Resultats pour {q}</p>}
    </main>
  );
}
