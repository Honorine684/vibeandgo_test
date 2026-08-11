import CheckoutForm from "./CheckoutForm";

// BUG (SEO): titre de page vide -> l'onglet du navigateur n'affiche aucun titre.
export const metadata = {
  title: { absolute: "" },
  description: "Finalisez votre commande VibeAndGo.",
};

export default function CheckoutPage() {
  return (
    <main className="container">
      <h1>Finaliser la commande</h1>
      <CheckoutForm />
    </main>
  );
}
