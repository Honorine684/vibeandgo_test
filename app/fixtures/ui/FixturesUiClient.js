"use client";

import { useEffect } from "react";
import { API_URL } from "../../lib/api";

// Fixture "INSECURE_ENDPOINT" (checklist des 64 checks, observation passive). Appel
// reel, declenche automatiquement au montage (donc visible dans le trafic reseau
// pendant un crawl normal, sans interaction requise), vers /api/customers/export —
// voir backend/server.js — un chemin sensible (namespace "customers") accessible sans
// authentification et renvoyant de vraies donnees ({"customers": [...]}).
export default function FixturesUiClient() {
  useEffect(() => {
    fetch(`${API_URL}/api/customers/export`);
  }, []);

  return null;
}
