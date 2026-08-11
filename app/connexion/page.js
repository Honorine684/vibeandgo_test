import ConnexionForm from "./ConnexionForm";

// BUG (SEO): meta description vide sur cette page (surcharge volontaire du champ herite du layout).
export const metadata = {
  title: "Connexion",
  description: "",
};

export default function ConnexionPage() {
  return (
    <main className="container">
      <h1>Connexion</h1>
      <ConnexionForm />
    </main>
  );
}
