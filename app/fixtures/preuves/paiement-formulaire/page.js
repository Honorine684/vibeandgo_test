export const metadata = {
  title: "Preuve PAYMENT_BUTTON_ERROR (piege formulaire)",
};

// Fixture "PAYMENT_BUTTON_ERROR" — PIEGE isole (deplace depuis
// /fixtures/preuves/paiement) : un bouton "Payer" desactive, mais DANS un
// formulaire qui contient des champs a remplir. Ne doit PAS etre signale
// comme le VRAI cas de /fixtures/preuves/paiement (bouton desactive sur une
// page SANS aucun champ) — desactive-jusqu'a-validation est un comportement
// normal ici.
export default function FixturesPreuvesPaiementFormulairePage() {
  return (
    <main className="container">
      <h1>Preuve : bouton de paiement — piege formulaire (PAYMENT_BUTTON_ERROR)</h1>

      <section className="card">
        <h3>Piege — bouton desactive, mais dans un formulaire avec des champs a remplir</h3>
        <form>
          <div className="field">
            <label htmlFor="preuves-paiement-nom">Nom complet</label>
            <input id="preuves-paiement-nom" name="nom" type="text" required />
          </div>
          <div className="field">
            <label htmlFor="preuves-paiement-carte">Numero de carte</label>
            <input id="preuves-paiement-carte" name="carte" type="text" required />
          </div>
          <button type="submit" className="btn" disabled>
            Payer
          </button>
        </form>
      </section>
    </main>
  );
}
