import InsecureEndpointClient from "./InsecureEndpointClient";

export const metadata = {
  title: "Preuve INSECURE_ENDPOINT",
};

export default function FixturesHttpInsecureEndpointPage() {
  return (
    <main className="container">
      <h1>Preuve : endpoint non authentifie (INSECURE_ENDPOINT)</h1>
      <p>
        Cette page appelle <code>/fixtures/http/users</code> au chargement —
        l&apos;endpoint renvoie des utilisateurs fictifs (email, role) sans aucune
        authentification.
      </p>
      <InsecureEndpointClient />
    </main>
  );
}
