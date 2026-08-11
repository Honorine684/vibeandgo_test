"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function RedirectClient() {
  const searchParams = useSearchParams();
  const to = searchParams.get("to");

  useEffect(() => {
    // BUG (SECURITE): redirection ouverte (open redirect). Le parametre "to" est utilise
    // tel quel, sans aucune validation de domaine (liste blanche) ni verification que
    // l'URL est relative. Exemple : /redirect?to=https://evil.example.com
    if (to) {
      window.location.href = to;
    }
  }, [to]);

  return <p>Redirection en cours vers {to}...</p>;
}
