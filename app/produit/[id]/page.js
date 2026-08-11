const PRODUCTS = {
  "1": { nom: "Chaise scandinave", prix: "89,00 EUR" },
  "2": { nom: "Table basse", prix: "129,00 EUR" },
};

export const metadata = {
  title: "Produit",
};

// BUG (SEO): "soft 404". Pour un identifiant de produit inconnu, la page affiche un message
// "Produit introuvable" mais renvoie un statut HTTP 200 (elle n'appelle jamais notFound()),
// au lieu de retourner un vrai code 404.
export default function ProduitPage({ params }) {
  const product = PRODUCTS[params.id];

  if (!product) {
    return (
      <main className="container">
        <h1>Produit introuvable</h1>
        <p>Ce produit n'existe pas ou n'est plus disponible.</p>
      </main>
    );
  }

  return (
    <main className="container">
      <h1>{product.nom}</h1>
      <p>{product.prix}</p>
    </main>
  );
}
