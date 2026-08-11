"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

const PRODUCTS = ["Chaise scandinave", "Table basse", "Lampe de bureau", "Canape 3 places", "Bureau compact"];

export default function RechercheClient() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [category, setCategory] = useState("tous");
  const [page, setPage] = useState(1);

  const results = query
    ? PRODUCTS.filter((p) => p.toLowerCase().includes(query.toLowerCase()))
    : PRODUCTS;

  // BUG (FONCTIONNEL/FIABILITE): en selectionnant la categorie "Inexistant", la recherche
  // renvoie une erreur / page blanche (acces non protege a categoryResults[0] alors que le
  // tableau est vide pour cette categorie).
  let categoryBlock = null;
  if (category !== "tous") {
    const categoryResults = PRODUCTS.filter((p) => p.toLowerCase().includes(category));
    categoryBlock = (
      <p>
        Meilleure correspondance pour "{category}" : {categoryResults[0].toUpperCase()}
      </p>
    );
  }

  // Recherches recentes : toujours vide.
  const recentSearches = [];

  return (
    <div>
      {/*
        BUG (SECURITE - XSS): le parametre de recherche "q" est reinjecte tel quel dans le DOM
        via dangerouslySetInnerHTML, sans aucun echappement. Essayer par exemple :
        /recherche?q=<img src=x onerror=alert(1)>
      */}
      <div
        dangerouslySetInnerHTML={{
          __html: `Resultats pour : ${query}`,
        }}
      />

      <div className="field" style={{ maxWidth: 260 }}>
        <label htmlFor="category">Filtrer par categorie</label>
        <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="tous">Tous</option>
          <option value="meuble">Meubles</option>
          <option value="inexistant">Inexistant</option>
        </select>
      </div>
      {categoryBlock}

      <section className="card">
        <h2>Produits</h2>
        {results.length === 0 ? (
          <p>Aucun produit trouve pour cette recherche.</p>
        ) : (
          <ul>
            {results.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        )}

        <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 12 }}>
          {/* BUG (ACCESSIBILITE): cibles tactiles trop petites (16x16px, sous les 24px recommandes). */}
          {/* BUG (FONCTIONNEL): pagination cassee, ces boutons ne modifient jamais la page affichee. */}
          <button
            type="button"
            onClick={() => {}}
            style={{ width: 16, height: 16, padding: 0, fontSize: 10, lineHeight: "16px" }}
          >
            ‹
          </button>
          <span>Page {page}</span>
          <button
            type="button"
            onClick={() => {}}
            style={{ width: 16, height: 16, padding: 0, fontSize: 10, lineHeight: "16px" }}
          >
            ›
          </button>
        </div>
      </section>

      <section className="card">
        <h2>Recherches recentes</h2>
        {/* BUG (FONCTIONNEL): liste vide sans aucun message explicatif pour l'utilisateur. */}
        <ul>
          {recentSearches.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
