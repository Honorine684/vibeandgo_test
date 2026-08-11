export const metadata = {
  title: "Page introuvable",
};

export default function NotFound() {
  return (
    <main className="container">
      <h1>404 - Page introuvable</h1>
      <p>La page que vous cherchez n'existe pas.</p>
      <a href="/">Retour a l'accueil</a>
    </main>
  );
}
