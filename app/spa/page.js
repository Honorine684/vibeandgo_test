import SpaApp from "./SpaApp";

export const metadata = {
  title: "Espace SPA (fixture scanner)",
};

// Fixture P3 (pas un bug) : point d'entree server-rendered pour une zone 100% CSR (voir
// SpaApp.js, fixtures P3-C2). Sert aussi (C1) a tester deux checks par page plutot qu'une
// seule fois sur baseUrl : les en-tetes de securite (voir middleware.js) et le XSS
// reflechi sur un formulaire distinct de l'accueil (voir SpaClient.js). Voir BUGS.md,
// section fixtures P3.
export default function SpaPage() {
  return (
    <main className="container">
      <SpaApp />
    </main>
  );
}
