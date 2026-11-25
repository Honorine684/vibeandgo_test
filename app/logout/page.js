// Fixture "Pages a ne jamais tester" : page /logout reelle (200), visible depuis une page
// normale (accueil). Ne doit jamais etre ouverte par un scan qui respecte l'exclusion de
// /logout. Pas de vraie session a terminer ici (pas de flux de login associe).
export default function LogoutPage() {
  return (
    <main className="container">
      <h1>Deconnexion</h1>
      <p>Vous avez ete deconnecte.</p>
    </main>
  );
}
