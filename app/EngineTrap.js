"use client";

import { useEffect } from "react";

// Fixture P2.2 (pas un bug) : reproduit un plantage specifique a un moteur pour
// tester qu'un appareil qui crawle beaucoup moins de pages que les autres est
// marque "incomplet" plutot que fusionne en silence avec les appareils qui ont
// reussi. Detecte le vrai WebKit/Safari (Chrome et Firefox ont tous les deux
// "Safari" dans leur user-agent, d'ou l'exclusion explicite) et appelle une API
// Chrome-only sans garde, absente sur WebKit -> exception non rattrapee au
// montage. Sans error.js/global-error.js dans ce depot, Next.js remplace alors
// toute la page (header/nav compris) par son fallback d'erreur generique : plus
// aucun lien a suivre pour le crawler sur cet appareil, page apres page.
export default function EngineTrap() {
  useEffect(() => {
    const ua = navigator.userAgent;
    const isRealSafari = /^((?!chrome|android|crios|fxios).)*safari/i.test(ua);
    if (isRealSafari) {
      window.chrome.loadTimes();
    }
  }, []);

  return null;
}
