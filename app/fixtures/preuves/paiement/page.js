export const metadata = {
  title: "Preuve PAYMENT_BUTTON_ERROR",
};

// Fixture "PAYMENT_BUTTON_ERROR" — 3 VRAIS cas + 4 PIEGES. Prix affiche au
// format "49 €" (symbole APRES le montant).
export default function FixturesPreuvesPaiementPage() {
  return (
    <main className="container">
      <style>{`
        .preuves-commander {
          width: 160px;
          height: 44px;
          font-size: 15px;
        }
        @media (max-width: 480px) {
          .preuves-commander {
            width: 30px;
            height: 30px;
            font-size: 0;
            padding: 0;
            overflow: hidden;
          }
        }
      `}</style>

      <h1>Preuve : bouton de paiement (PAYMENT_BUTTON_ERROR)</h1>
      <p className="card">
        Formule unique : <strong>49 €</strong>
      </p>

      <h2>Cas VRAIS</h2>

      <section className="card">
        <h3>1. Bouton desactive, aucun champ a remplir sur la page</h3>
        <button type="button" className="btn" disabled>
          Payer
        </button>
      </section>

      <section className="card" style={{ position: "relative", overflow: "visible" }}>
        <h3>2. Bouton place hors de l&apos;ecran</h3>
        <p>Le bouton &quot;Acheter&quot; ci-dessous est positionne hors champ (left: -500px).</p>
        <button
          type="button"
          className="btn"
          style={{ position: "absolute", left: -500, top: 0 }}
        >
          Acheter
        </button>
      </section>

      <section className="card">
        <h3>3. Bouton minuscule (30x30px, mobile uniquement)</h3>
        <p>Sur desktop ce bouton fait 160x44px (normal) ; en dessous de 480px d&apos;ecran, il devient 30x30px.</p>
        <button type="button" className="btn preuves-commander">
          Commander
        </button>
      </section>

      <h2>Pieges (ne doivent PAS etre signales)</h2>

      <section className="card">
        <h3>Piege A — bouton de FAQ (pas un bouton de paiement)</h3>
        <button type="button" className="btn">
          Puis-je vendre dans plusieurs pays ?
        </button>
      </section>

      <section className="card">
        <h3>Piege B — carte contenant le mot &quot;Payroll&quot;</h3>
        <p>
          Notre module Payroll permet de gerer la paie de votre equipe directement depuis le
          tableau de bord.
        </p>
      </section>

      {/* Piege C : contenu de remplissage pour que le bouton suivant soit
          loin en dessous de la ligne de flottaison, atteignable uniquement
          en defilant — ne doit pas etre signale pour autant. */}
      {Array.from({ length: 18 }).map((_, i) => (
        <p key={i} className="card">
          Paragraphe de remplissage {i + 1} — ce contenu existe uniquement pour pousser le
          bouton de paiement normal plus bas dans la page, afin de verifier qu&apos;un bouton
          atteignable en defilant n&apos;est pas confondu avec un bouton reellement hors ecran.
        </p>
      ))}

      <section className="card">
        <h3>Piege C — bouton normal, tout en bas d&apos;une longue page</h3>
        <button type="button" className="btn">
          Payer maintenant
        </button>
      </section>

      {/*
        Piege D (bouton desactive DANS un formulaire avec des champs a remplir)
        deplace sur sa propre page, /fixtures/preuves/paiement-formulaire, pour
        que le scanner ne puisse pas confondre les deux cas "bouton Payer
        desactive" au niveau de la page.
      */}
      <p className="card">
        <a href="/fixtures/preuves/paiement-formulaire">
          Piege D (bouton desactive dans un formulaire) — page separee
        </a>
      </p>
    </main>
  );
}
