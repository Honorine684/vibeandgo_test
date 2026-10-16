"use client";

import { useEffect, useRef, useState } from "react";
import SpaClient from "./SpaClient";

// Fixture P3/C2 (pas un bug) : mini routeur 100% client (pushState + etat local), sans
// route Next.js correspondante pour /spa/tableau, /spa/reglages, /spa/facture - donc un
// GET direct sur ces URLs renvoie la 404 Next standard, mais un clic sur un des liens
// ci-dessous change bien l'URL et le contenu affiche sans rechargement de page. Sert a
// exercer le fallback "goto d'abord, navigation client si 404" du scanner apres la
// fusion C2 des boucles de crawl. Voir BUGS.md, fixtures P3-C2.
//
// /spa/contact + /spa/contact-sur (ajoutees) : meme principe de routage, mais le but
// cette fois est la sonde XSS elle-meme, pas la decouverte. La sonde rechargeait chaque
// page par son adresse et tombait donc sur la 404 de ces sous-routes sans jamais tester
// de formulaire interne ; le correctif lui fait refaire le chemin du visiteur (page
// parente /spa, clic, arrivee sur la vue). /spa/contact reinjecte la saisie via
// innerHTML (XSS reel, sans rechargement) ; /spa/contact-sur est le jumeau negatif
// (textContent, echappe) pour verifier qu'aucun faux positif n'est invente.
const VIEWS = {
  "/spa": "home",
  "/spa/tableau": "tableau",
  "/spa/reglages": "reglages",
  "/spa/facture": "facture",
  "/spa/contact": "contact",
  "/spa/contact-sur": "contact-sur",
};

function navigate(path, setPath) {
  window.history.pushState(null, "", path);
  setPath(path);
}

export default function SpaApp() {
  // Etat initialise a "/spa" : cote serveur (SSR) window n'existe pas et cette page n'est
  // de toute facon jamais rendue par le serveur sous une autre URL que /spa (les sous-
  // routes ne repondent qu'au clic, jamais a un chargement direct). Les liens de nav
  // ci-dessous restent donc toujours presents dans le HTML initial, quelle que soit la vue.
  const [path, setPath] = useState("/spa");
  const [contactMessage, setContactMessage] = useState("");
  const [contactSureMessage, setContactSureMessage] = useState("");
  const contactOutputRef = useRef(null);
  const contactSureOutputRef = useRef(null);

  useEffect(() => {
    function onPopState() {
      setPath(window.location.pathname);
    }
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const view = VIEWS[path] || "home";

  // VRAI (XSS) : reaffichage cote client, sans rechargement, via innerHTML -> la saisie
  // est injectee telle quelle, non echappee.
  function handleContactSubmit(e) {
    e.preventDefault();
    if (contactOutputRef.current) {
      contactOutputRef.current.innerHTML = contactMessage;
    }
  }

  // PIEGE (jumeau negatif) : meme flux, mais textContent echappe correctement la
  // saisie -> ne doit produire aucun constat XSS.
  function handleContactSureSubmit(e) {
    e.preventDefault();
    if (contactSureOutputRef.current) {
      contactSureOutputRef.current.textContent = contactSureMessage;
    }
  }

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
        <a href="/spa/contact" onClick={(e) => { e.preventDefault(); navigate("/spa/contact", setPath); }}>
          Contact
        </a>
        <a href="/spa/contact-sur" onClick={(e) => { e.preventDefault(); navigate("/spa/contact-sur", setPath); }}>
          Contact (sur)
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
            {/*
              Volontairement AUCUN bouton d'envoi sur ce formulaire : sert de reference
              pour /spa/contact (bouton present) - la sonde XSS doit sauter ce formulaire
              ("sans cible"), pas le tester.
            */}
          </form>
        </section>
      )}

      {view === "contact" && (
        <section>
          <h1>Contact</h1>
          <form className="card" onSubmit={handleContactSubmit}>
            <div className="field">
              <label htmlFor="spa-contact-message">Votre message</label>
              <input
                id="spa-contact-message"
                name="message"
                type="text"
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
              />
            </div>
            <button type="submit" className="btn">
              Envoyer
            </button>
          </form>
          <div id="spa-contact-output" ref={contactOutputRef} className="card" />
        </section>
      )}

      {view === "contact-sur" && (
        <section>
          <h1>Contact (version sure)</h1>
          <form className="card" onSubmit={handleContactSureSubmit}>
            <div className="field">
              <label htmlFor="spa-contact-sur-message">Votre message</label>
              <input
                id="spa-contact-sur-message"
                name="message"
                type="text"
                value={contactSureMessage}
                onChange={(e) => setContactSureMessage(e.target.value)}
              />
            </div>
            <button type="submit" className="btn">
              Envoyer
            </button>
          </form>
          <div id="spa-contact-sur-output" ref={contactSureOutputRef} className="card" />
        </section>
      )}
    </div>
  );
}
