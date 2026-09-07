import FixturesInscriptionClient from "./FixturesInscriptionClient";

export const metadata = {
  title: "Fixture inscription",
};

// Fixture "EMAIL_CONFIRMATION_NOT_SENT" (checklist des 64 checks). Le check n'evalue
// que les URLs qui matchent /register|signup|inscription|.../i — d'ou cette route
// dediee (/fixtures/inscription) plutot que /fixtures/forms. Le formulaire affiche un
// message de succes EXPLICITE ("Inscription reussie", "Compte cree avec succes") sans
// jamais mentionner de verification / confirmation par email.
export default function FixturesInscriptionPage() {
  return (
    <main className="container">
      <h1>Fixture : inscription</h1>
      <FixturesInscriptionClient />
    </main>
  );
}
