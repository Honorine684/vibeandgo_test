import SpaClient from "./SpaClient";

export const metadata = {
  title: "Espace SPA (fixture scanner)",
};

// Fixture P3 (pas un bug) : point d'entree server-rendered pour une future section 100%
// CSR (voir C2, /spa/tableau /spa/reglages /spa/facture a venir). Sert des maintenant
// (C1) a tester deux checks par page plutot qu'une seule fois sur baseUrl : les en-tetes
// de securite (voir middleware.js, headers presents ici mais pas sur "/") et le XSS
// reflechi sur un formulaire distinct de l'accueil (voir SpaClient.js). Voir BUGS.md,
// section fixtures P3.
export default function SpaPage() {
  return (
    <main className="container">
      <h1>Espace SPA</h1>
      <p>Sous-page dediee aux fixtures de crawl par appareil/chemin (voir BUGS.md, section P3).</p>
      <SpaClient />
    </main>
  );
}
