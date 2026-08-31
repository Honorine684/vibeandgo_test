"use client";

import { useEffect, useState } from "react";
import SpaClient from "./SpaClient";

// Fixture P3/C2 (pas un bug) : mini routeur 100% client (pushState + etat local), sans
// route Next.js correspondante pour /spa/tableau, /spa/reglages, /spa/facture - donc un
// GET direct sur ces URLs renvoie la 404 Next standard, mais un clic sur un des liens
// ci-dessous change bien l'URL et le contenu affiche sans rechargement de page. Sert a
// exercer le fallback "goto d'abord, navigation client si 404" du scanner apres la
// fusion C2 des boucles de crawl. Voir BUGS.md, fixtures P3-C2.
const VIEWS = {
  "/spa": "home",
  "/spa/tableau": "tableau",
  "/spa/reglages": "reglages",
  "/spa/facture": "facture",
};

function navigate(path, setPath) {
  window.history.pushState(null, "", path);
  setPath(path);
}

export default function SpaApp() {
  // Etat initialise a "/spa" : cote serveur (SSR) window n'existe pas et cette page n'est
  // de toute facon jamais rendue par le serveur sous une autre URL que /spa (les 3 sous-
  // routes ne repondent qu'au clic, jamais a un chargement direct). Les liens de nav
  // ci-dessous restent donc toujours presents dans le HTML initial, quelle que soit la vue.
  const [path, setPath] = useState("/spa");

  useEffect(() => {
    function onPopState() {
      setPath(window.location.pathname);
    }
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const view = VIEWS[path] || "home";

  return (
    <div>
      <nav style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
        <a href="/spa" onClick={(e) => { e.preventDefault(); navigate("/spa", setPath); }}>
          Accueil SPA
        </a>
        <a href="/spa/tableau" onClick={(e) => { e.preventDefault(); navigate("/spa/tableau", setPath); }}>
          Tableau de bord
        </a>
        <a href="/spa/reglages" onClick={(e) => { e.preventDefault(); navigate("/spa/reglages", setPath); }}>
          Reglages
        </a>
        <a href="/spa/facture" onClick={(e) => { e.preventDefault(); navigate("/spa/facture", setPath); }}>
          Facture
        </a>
      </nav>

      {view === "home" && (
        <section>
          <h1>Espace SPA</h1>
          <p>Sous-page dediee aux fixtures de crawl par appareil/chemin (voir BUGS.md, section P3).</p>
          <SpaClient />
        </section>
      )}

      {view === "tableau" && (
        <section>
          <h1>Tableau de bord</h1>
          <p>Vue geree entierement par le routeur client : aucune page Next.js ne repond a /spa/tableau en direct.</p>
        </section>
      )}

      {view === "reglages" && (
        <section>
          <h1>Reglages</h1>
          <p>Vue geree entierement par le routeur client : aucune page Next.js ne repond a /spa/reglages en direct.</p>
        </section>
      )}

      {view === "facture" && (
        <section>
          <h1>Facture</h1>
          <form className="card">
            <div className="field">
              <label htmlFor="spa-facture-adresse">Adresse de facturation</label>
              <input id="spa-facture-adresse" name="adresse" />
            </div>
            <div className="field">
              {/*
                Fixture P3/C2 (checkFormLabels sur une sous-route CSR) : champ sans
                <label>, sans aria-label, sans aria-labelledby - sert a verifier que le
                finding est bien attribue a /spa/facture (l'URL atteinte via le routeur
                client), pas a /spa. Voir BUGS.md, fixtures P3-C2.
              */}
              <input id="spa-facture-ref" name="reference" placeholder="Reference de facture" />
            </div>
          </form>
        </section>
      )}
    </div>
  );
}
