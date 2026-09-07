"use client";

import { useEffect, useState } from "react";

// Fixture "INSECURE_ENDPOINT" (passif) : appel reel, au montage, vers la route API
// SAME-ORIGIN /api/customers (voir app/api/customers/route.js) — chemin sensible,
// donnees client sans auth. URL relative => same-origin, captable par le check passif.
//
// Fixture "INFINITE_LOADING" : bouton qui, une fois clique, affiche un spinner visible
// (classe "loading spinner", role=progressbar, 32x32px) qui n'est JAMAIS retire et
// n'affiche jamais d'erreur. Chemin post-action, comme /checkout.
export default function FixturesUiClient() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/customers");
  }, []);

  return (
    <div style={{ marginTop: 24 }}>
      <button
        type="button"
        className="btn"
        onClick={() => setLoading(true)}
        disabled={loading}
      >
        Charger les donnees
      </button>

      {loading && (
        <div
          className="loading spinner"
          role="progressbar"
          aria-label="Chargement en cours"
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
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}
    </div>
  );
}
