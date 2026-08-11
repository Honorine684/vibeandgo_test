import { Suspense } from "react";
import RechercheClient from "./RechercheClient";

export const metadata = {
  title: "Recherche",
  description: "Recherchez un produit VibeAndGo.",
};

// BUG (SEO): cette page ne contient aucune balise <h1> (seulement des <h2>).
export default function RecherchePage() {
  return (
    <main className="container">
      <p style={{ fontSize: 22, fontWeight: 700 }}>Rechercher un produit</p>
      <Suspense fallback={null}>
        <RechercheClient />
      </Suspense>
    </main>
  );
}
