export const metadata = {
  title: "Preuve LAYOUT_BREAK",
};

// Fixture "LAYOUT_BREAK" — 1 VRAI cas de debordement horizontal + 3 PIEGES qui
// ressemblent a un debordement sans en causer un reellement (le scanner ne doit
// PAS les signaler).
export default function FixturesPreuvesLayoutPage() {
  return (
    <main className="container">
      <h1>Preuve : mise en page (LAYOUT_BREAK)</h1>

      {/*
        VRAI : tableau a largeur FIXE 620px, sans wrapper scrollable ni
        max-width:100%. Sur un ecran mobile de 390px, deborde horizontalement
        de 230px et elargit document.documentElement.scrollWidth.
      */}
      <h2>Cas VRAI</h2>
      <table id="prices" style={{ width: 620, borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ textAlign: "left", padding: 8, border: "1px solid #ddd" }}>Offre</th>
            <th style={{ textAlign: "left", padding: 8, border: "1px solid #ddd" }}>Description</th>
            <th style={{ textAlign: "left", padding: 8, border: "1px solid #ddd" }}>Prix</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: 8, border: "1px solid #ddd" }}>Starter</td>
            <td style={{ padding: 8, border: "1px solid #ddd" }}>Pour demarrer tranquillement</td>
            <td style={{ padding: 8, border: "1px solid #ddd" }}>0 €</td>
          </tr>
          <tr>
            <td style={{ padding: 8, border: "1px solid #ddd" }}>Pro</td>
            <td style={{ padding: 8, border: "1px solid #ddd" }}>Pour les equipes actives</td>
            <td style={{ padding: 8, border: "1px solid #ddd" }}>29 €</td>
          </tr>
        </tbody>
      </table>

      <h2>Pieges (ne doivent PAS etre signales)</h2>

      {/*
        PIEGE 1 : menu tiroir FERME. position:fixed (hors du flux normal) +
        translateX(-100%) -> visuellement et structurellement hors ecran,
        aucun debordement reel du document.
      */}
      <nav
        aria-label="Menu lateral (ferme)"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 280,
          height: "100vh",
          background: "#111827",
          color: "#fff",
          padding: 24,
          transform: "translateX(-100%)",
          zIndex: 50,
        }}
      >
        <p>Menu</p>
        <p>Compte</p>
        <p>Parametres</p>
      </nav>

      {/*
        PIEGE 2 : element large DANS un conteneur overflow-x:hidden. Le
        conteneur parent clippe le contenu -> jamais visible, jamais de
        scroll horizontal au niveau de la page.
      */}
      <div style={{ overflowX: "hidden", width: "100%", border: "1px solid #eee", marginTop: 24 }}>
        <div style={{ width: 900, padding: 12, background: "#f3f4f6" }}>
          Contenu large clippe par son conteneur parent (overflow-x: hidden) — ne doit jamais
          provoquer de scroll horizontal au niveau de la page.
        </div>
      </div>

      {/*
        PIEGE 3 : element large avec aria-hidden="true" (decoratif, exclu de
        l'arbre d'accessibilite — convention courante pour des elements
        purement visuels/presentationnels).
      */}
      <div
        aria-hidden="true"
        style={{ width: 900, height: 20, background: "#e5e7eb", marginTop: 24 }}
      />
    </main>
  );
}
