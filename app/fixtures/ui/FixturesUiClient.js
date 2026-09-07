"use client";

import { useEffect, useState } from "react";

// Fixture "INSECURE_ENDPOINT" (passif) : appel reel, au montage, vers la route API
// SAME-ORIGIN /api/customers (voir app/api/customers/route.js) — chemin sensible,
// donnees client sans auth. URL relative => same-origin, captable par le check passif.
//
// Fixture "INFINITE_LOADING" : le declencheur est un VRAI <form> avec un <button
// type="submit"> (le seul pattern prouve, cf. /checkout — le scanner exerce les
// soumissions de formulaire, pas les <button type="button"> isoles). A la soumission,
// un spinner visible (classe "loading spinner loader", role=progressbar, 32x32px)
// s'affiche et n'est JAMAIS retire, sans jamais afficher d'erreur ni de succes.
export default function FixturesUiClient() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/customers");
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true); // jamais remis a false : etat de chargement infini
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 24 }}>
      <button type="submit" className="btn" disabled={loading}>
        Charger les donnees
      </button>

      {loading && (
        <div
          className="loading spinner"
          role="progressbar"
          aria-label="Chargement en cours"
          aria-busy="true"
          style={{ marginTop: 16 }}
        >
          <span
            className="loader"
            style={{
              display: "inline-block",
              width: 32,
              height: 32,
              border: "4px solid #ccc",
              borderTopColor: "#111827",
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
            }}
          />
          <span style={{ marginLeft: 12 }}>Chargement en cours…</span>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}
    </form>
  );
}
