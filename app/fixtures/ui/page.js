import FixturesUiClient from "./FixturesUiClient";

export const metadata = {
  title: "Fixtures UI",
};

export default function FixturesUiPage() {
  return (
    <main className="container">
      <h1>Fixtures : UI</h1>

      {/* Fixture "LAYOUT_BREAK" (checklist des 64 checks). Element visible dont le
          rect.right depasse window.innerWidth, sans overflow:hidden sur un parent
          (.container n'en applique pas — voir app/globals.css). */}
      <div style={{ width: 3000, background: "#eef", padding: 8 }}>
        Bloc volontairement trop large qui deborde horizontalement de la fenetre.
      </div>

      {/* Fixture "TEXT_READABILITY" (checklist des 64 checks). Texte hors footer/mentions
          legales avec une taille de police sous 12px. */}
      <p style={{ fontSize: 10 }}>
        Texte de contenu volontairement trop petit pour etre lu confortablement sur mobile.
      </p>

      {/* Fixture "EMPTY_STATE_ERROR" (checklist des 64 checks). Liste vide d'au moins
          40x40px, sans aucun texte explicatif ("aucun resultat"...) autour. */}
      <ul
        style={{ minWidth: 200, minHeight: 60, border: "1px solid #ccc", listStyle: "none", margin: "16px 0", padding: 0 }}
      ></ul>

      {/* Fixture "PAYMENT_BUTTON_ERROR" (checklist des 64 checks). Bouton contenant un
          mot-cle paiement, disabled en dur. */}
      <button type="button" className="btn" disabled>
        Payer maintenant
      </button>

      {/* Fixture "INFINITE_LOADING" + "INSECURE_ENDPOINT" (passif) : voir FixturesUiClient.js
          (spinner declenche par clic, jamais resolu ; fetch same-origin /api/customers au montage). */}
      <FixturesUiClient />
    </main>
  );
}
