export const metadata = {
  title: "Page introuvable",
};

// Fixture P2.1 (pas un bug) : cette 404 a un vrai titre <title> et du texte
// visible, mais volontairement pas de <h1> — sert a tester que le scanner ne
// remonte plus de findings SEO/a11y ("pas de <h1>"...) sur une page qui n'existe
// pas (voir le lien mort /promo-2024 dans le footer, app/layout.js).
export default function NotFound() {
  return (
    <main className="container">
      <p style={{ fontSize: 28, fontWeight: 700, margin: "0 0 8px" }}>404 - Page introuvable</p>
      <p>La page que vous cherchez n'existe pas.</p>
      <a href="/">Retour a l'accueil</a>
    </main>
  );
}
