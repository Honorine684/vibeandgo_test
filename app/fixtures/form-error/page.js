import FixturesFormErrorClient from "./FixturesFormErrorClient";

export const metadata = {
  title: "Fixture formulaire sans bouton",
};

// Fixture "FORM_ERROR" (checklist des 64 checks), isolee sur sa propre page pour ne
// pas bloquer la routine de test des formulaires sur les autres fixtures form
// (notamment DUPLICATE_SUBMIT sur /fixtures/forms). Un champ requis, aucun bouton
// submit visible nulle part -> impossible de valider autrement qu'avec Entree.
export default function FixturesFormErrorPage() {
  return (
    <main className="container">
      <h1>Fixture : formulaire sans bouton d&apos;envoi</h1>
      <FixturesFormErrorClient />
    </main>
  );
}
