"use client";

import { useEffect, useState } from "react";
import { API_URL } from "../lib/api";

// Fixture de test scanner (pas un bug) : declenche au montage un fetch vers le
// backend qui ne resout qu'apres 90-180s (voir backend/server.js, /api/slow/stall).
// Tant que ce fetch est en vol, le navigateur ne considere jamais le reseau "au
// repos" (networkidle) -> un scanner qui attend cette stabilite avant de tester
// la page reste bloque sur cette seule page pendant toute la duree du delai.
// La page elle-meme (HTML initial) reste rapide : ce composant ne bloque rien
// au rendu, il tourne uniquement cote client, apres hydration.
export default function StallFetch() {
  const [status, setStatus] = useState("en-attente");

  useEffect(() => {
    let cancelled = false;
    const startedAt = Date.now();

    fetch(`${API_URL}/api/slow/stall`, { cache: "no-store" })
      .then(() => {
        if (!cancelled) setStatus(`resolu apres ${Math.round((Date.now() - startedAt) / 1000)}s`);
      })
      .catch(() => {
        if (!cancelled) setStatus("erreur reseau");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <p style={{ fontSize: 13, color: "#6b7280" }}>
      (fixture interne, ignorer) requete de stabilisation reseau : {status}
    </p>
  );
}
