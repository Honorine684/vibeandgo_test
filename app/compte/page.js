// Fixture "AUTH_REQUIRED" — voir middleware.js a la racine. Cette page n'est jamais
// rendue pour un visiteur anonyme : le middleware redirige vers /connexion avant meme
// que ce composant ne s'execute (aucun cookie "vg_admin_session" n'est jamais pose sur
// le site). Le contenu ci-dessous n'existe que pour que la route soit valide.
export default function ComptePage() {
  return (
    <main className="container">
      <h1>Mon compte</h1>
      <p>Si vous voyez cette page, le gate d'authentification a echoue.</p>
    </main>
  );
}
